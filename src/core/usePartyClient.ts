'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { PartyNetworkClient } from './network';
import type { GameId, HostMessage, RoomState } from './types';

interface Options {
  roomCode: string;
  playerId: string;
  name: string;
  avatar: string;
  ready: boolean;
  enabled: boolean;
}

const HEARTBEAT_MS = 4000;
const LINK_TIMEOUT_MS = 10000;

/**
 * Hook telefonu gracza: łączy się z pokojem, co 4 s wysyła HELLO (heartbeat + ponowna
 * rejestracja po restarcie Hosta) i udostępnia aktualny stan pokoju.
 */
export function usePartyClient({
  roomCode,
  playerId,
  name,
  avatar,
  ready,
  enabled,
}: Options) {
  const [room, setRoom] = useState<RoomState | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef<PartyNetworkClient | null>(null);
  const lastRecvRef = useRef(0);
  const lastUpdateRef = useRef(0);
  const lastHelloRef = useRef(0);
  const profileRef = useRef({ playerId, name, avatar, ready });
  profileRef.current = { playerId, name, avatar, ready };

  const sendHello = useCallback(() => {
    if (!profileRef.current.playerId || !profileRef.current.name.trim()) return;
    lastHelloRef.current = Date.now();
    clientRef.current?.send({ type: 'HELLO', payload: { ...profileRef.current } });
  }, []);

  useEffect(() => {
    if (!enabled || !roomCode || !playerId) return;

    lastRecvRef.current = 0;
    lastUpdateRef.current = 0;
    lastHelloRef.current = 0;
    setRoom(null);
    setIsConnected(false);

    const client = new PartyNetworkClient(
      roomCode,
      (msg: HostMessage) => {
        if (msg.type !== 'ROOM_SYNC') return;
        const incoming = msg.payload.room;
        if (!incoming || incoming.updatedAt < lastUpdateRef.current) return;

        lastRecvRef.current = Date.now();
        setIsConnected(true);

        if (incoming.updatedAt > lastUpdateRef.current || lastUpdateRef.current === 0) {
          lastUpdateRef.current = incoming.updatedAt;
          setRoom(incoming);
        }

        // Jeśli Host jeszcze nie ma nas na liście graczy, ponów HELLO (z throttlingiem 1.5s)
        const players = Array.isArray(incoming.players) ? incoming.players : [];
        if (
          !players.some((p) => p.id === profileRef.current.playerId) &&
          Date.now() - lastHelloRef.current > 1500
        ) {
          sendHello();
        }
      },
      () => sendHello()
    );
    clientRef.current = client;

    sendHello();
    const quick = setTimeout(sendHello, 600);
    const heartbeat = setInterval(sendHello, HEARTBEAT_MS);
    const linkCheck = setInterval(() => {
      setIsConnected(
        lastRecvRef.current > 0 && Date.now() - lastRecvRef.current < LINK_TIMEOUT_MS
      );
    }, 1000);

    return () => {
      clearTimeout(quick);
      clearInterval(heartbeat);
      clearInterval(linkCheck);
      client.destroy();
      clientRef.current = null;
    };
  }, [enabled, roomCode, playerId, sendHello]);

  // Zmiana nicku / awatara / gotowości – natychmiast do Hosta.
  useEffect(() => {
    if (enabled) sendHello();
  }, [enabled, name, avatar, ready, sendHello]);

  const sendGameAction = useCallback(
    (game: GameId, action: unknown) => {
      clientRef.current?.send({
        type: 'GAME_ACTION',
        payload: { game, playerId: profileRef.current.playerId, action },
      });
    },
    []
  );

  return { room, isConnected, sendGameAction };
}
