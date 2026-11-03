'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { PartyNetworkHost } from './network';
import {
  backToHub,
  createRoom,
  dispatchFromHost,
  handleClientMessage,
  selectGame,
  tickRoom,
} from './room';
import { playSoundEvent } from './sound';
import type { GameId, RoomState, SoundEvent } from './types';

const BACKUP_KEY = (code: string) => `party-hub-host-backup-${code}`;
const LAST_ROOM_KEY = 'party-hub-host-last-room';
const BACKUP_MAX_AGE_MS = 15 * 60 * 1000;

/** Zwraca kod ostatnio prowadzonego pokoju, jeśli jego kopia jest świeża (odświeżenie ekranu Hosta). */
export function loadLastRoomCode(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const code = localStorage.getItem(LAST_ROOM_KEY);
    if (!code) return null;
    const raw = localStorage.getItem(BACKUP_KEY(code));
    if (!raw) return null;
    const room = JSON.parse(raw) as RoomState;
    if (Date.now() - room.updatedAt > BACKUP_MAX_AGE_MS) return null;
    return code;
  } catch {
    return null;
  }
}

export function forgetRoom(code: string) {
  try {
    localStorage.removeItem(BACKUP_KEY(code));
    localStorage.removeItem(LAST_ROOM_KEY);
  } catch {
    // ignore
  }
}

function loadBackup(code: string): RoomState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(BACKUP_KEY(code));
    if (!raw) return null;
    const room = JSON.parse(raw) as RoomState;
    if (room?.id !== code) return null;
    if (Date.now() - (room.updatedAt || 0) > BACKUP_MAX_AGE_MS) return null;
    const filteredPlayers = Array.isArray(room.players)
      ? room.players.filter((p) => p.id !== 'host-tv')
      : [];
    return { ...room, players: filteredPlayers };
  } catch {
    return null;
  }
}

/**
 * Hook Hosta: trzyma autorytatywny stan pokoju, obsługuje sieć,
 * zegar gier, dźwięki oraz kopię zapasową w localStorage.
 */
export function useRoomHost(roomCode: string) {
  const [room, setRoom] = useState<RoomState>(
    () => loadBackup(roomCode) ?? createRoom(roomCode)
  );
  const [shake, setShake] = useState(false);
  const roomRef = useRef(room);
  const netRef = useRef<PartyNetworkHost | null>(null);
  const shakeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const publish = useCallback((next: RoomState) => {
    roomRef.current = next;
    setRoom(next);
    netRef.current?.broadcast(next);
    try {
      localStorage.setItem(BACKUP_KEY(next.id), JSON.stringify(next));
      localStorage.setItem(LAST_ROOM_KEY, next.id);
    } catch {
      // ignore quota errors
    }
  }, []);

  useEffect(() => {
    if (room.id !== roomCode) {
      const fresh = loadBackup(roomCode) ?? createRoom(roomCode);
      roomRef.current = fresh;
      setRoom(fresh);
    }
  }, [roomCode, room.id]);

  const apply = useCallback(
    (fn: (room: RoomState, emit: (s: SoundEvent) => void) => RoomState) => {
      const sounds: SoundEvent[] = [];
      const result = fn(roomRef.current, (s) => sounds.push(s));
      if (result !== roomRef.current) {
        publish({ ...result, updatedAt: Date.now() });
      }
      if (sounds.length > 0) {
        sounds.forEach(playSoundEvent);
        if (sounds.includes('BUZZER')) {
          setShake(true);
          if (shakeTimer.current) clearTimeout(shakeTimer.current);
          shakeTimer.current = setTimeout(() => setShake(false), 700);
        }
      }
    },
    [publish]
  );

  // Sieć + zegar
  useEffect(() => {
    const net = new PartyNetworkHost(
      roomCode,
      (msg) => apply((r, emit) => handleClientMessage(r, msg, emit)),
      () => netRef.current?.broadcast(roomRef.current)
    );
    netRef.current = net;
    net.broadcast(roomRef.current);

    const interval = setInterval(() => {
      apply((r, emit) => tickRoom(r, emit));
    }, 1000);

    return () => {
      clearInterval(interval);
      net.destroy();
      netRef.current = null;
    };
  }, [roomCode, apply]);

  const choose = useCallback(
    (gameId: GameId) => apply((r) => selectGame(r, gameId)),
    [apply]
  );
  const returnToHub = useCallback(() => apply((r) => backToHub(r)), [apply]);
  const dispatchGame = useCallback(
    (action: unknown) => apply((r, emit) => dispatchFromHost(r, action, emit)),
    [apply]
  );

  return { room, shake, selectGame: choose, backToHub: returnToHub, dispatchGame };
}
