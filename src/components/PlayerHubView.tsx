'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wifi,
  WifiOff,
  CheckCircle2,
  Hourglass,
  ArrowLeft,
} from 'lucide-react';
import { getGame } from '@/games/registry';
import { usePartyClient } from '@/core/usePartyClient';
import { AVATARS, DEFAULT_AVATAR } from '@/core/avatars';
import { sanitizeRoomCode } from '@/core/roomCode';

interface PlayerHubViewProps {
  initialRoomCode?: string;
  onExit: () => void;
}

function generatePlayerId(): string {
  return `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function PlayerHubView({ initialRoomCode = '', onExit }: PlayerHubViewProps) {
  const [roomCode, setRoomCode] = useState(() => sanitizeRoomCode(initialRoomCode));
  const [playerId, setPlayerId] = useState(() => generatePlayerId());
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const [ready, setReady] = useState(true);
  const [isJoined, setIsJoined] = useState(false);

  // Synchronizuj kod pokoju jeśli przyszedł z URL (?join=XXXX)
  useEffect(() => {
    const cleaned = sanitizeRoomCode(initialRoomCode);
    if (cleaned) {
      setRoomCode(cleaned);
      return;
    }
    if (typeof window !== 'undefined') {
      const fromWindow = new URLSearchParams(window.location.search).get('join');
      if (fromWindow) {
        setRoomCode(sanitizeRoomCode(fromWindow));
      }
    }
  }, [initialRoomCode]);

  // Wczytanie profilu gracza z LocalStorage (z gwarancją poprawnego playerId)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem('party-hub-player-profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        const validId =
          typeof parsed.playerId === 'string' && parsed.playerId.trim().length > 0
            ? parsed.playerId.trim()
            : generatePlayerId();
        setPlayerId(validId);
        if (typeof parsed.name === 'string' && parsed.name.trim()) {
          setName(parsed.name);
        }
        if (typeof parsed.avatar === 'string' && parsed.avatar.trim()) {
          setAvatar(parsed.avatar);
        }
      }
    } catch {
      // fallback to initial generated playerId
    }
  }, []);

  const { room, isConnected, sendGameAction } = usePartyClient({
    roomCode,
    playerId,
    name,
    avatar,
    ready,
    enabled: isJoined,
  });

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedRoom = sanitizeRoomCode(roomCode);
    const cleanedName = name.trim();
    if (!cleanedRoom || !cleanedName) return;

    const finalPlayerId = playerId && playerId.trim().length > 0 ? playerId.trim() : generatePlayerId();
    setPlayerId(finalPlayerId);
    setRoomCode(cleanedRoom);

    try {
      localStorage.setItem(
        'party-hub-player-profile',
        JSON.stringify({ playerId: finalPlayerId, name: cleanedName, avatar })
      );
    } catch {
      // ignore
    }

    setIsJoined(true);
  };

  // =========================================================================
  // 1. FORMULARZ DOŁĄCZANIA DO POKOJU (JEŚLI JESZCZE NIE DOŁĄCZYŁ)
  // =========================================================================
  if (!isJoined) {
    return (
      <div className="min-h-screen bg-[#120A2A] text-white flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-[#1E1242] border-4 border-black rounded-3xl p-6 shadow-brutal">
          <button
            onClick={onExit}
            className="mb-4 text-xs font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl border-2 border-black flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Menu główne
          </button>

          <div className="flex items-center gap-3 mb-5">
            <span className="bg-party-yellow text-black font-black text-3xl px-3.5 py-1.5 rounded-2xl border-3 border-black shadow-brutal-sm">
              🎮
            </span>
            <div>
              <h1 className="text-2xl font-black uppercase leading-none">
                Kontroler Gracza
              </h1>
              <p className="text-xs text-purple-200 font-semibold mt-0.5">
                PartyGames Hub
              </p>
            </div>
          </div>

          <form onSubmit={handleJoin} className="space-y-4">
            <div>
              <label className="text-xs font-black uppercase text-party-yellow block mb-1">
                4-literowy Kod Pokoju (PIN z ekranu TV):
              </label>
              <input
                type="text"
                maxLength={6}
                required
                value={roomCode}
                onChange={(e) => setRoomCode(sanitizeRoomCode(e.target.value))}
                placeholder="np. ABCD"
                className="w-full bg-black/60 border-3 border-black rounded-2xl px-4 py-3 text-2xl font-black tracking-[0.25em] text-center text-party-yellow uppercase focus:outline-none focus:border-party-yellow"
              />
            </div>

            <div>
              <label className="text-xs font-black uppercase text-purple-200 block mb-1">
                Twój Nick na Imprezie:
              </label>
              <input
                type="text"
                maxLength={18}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="np. Mistrz Gry"
                className="w-full bg-black/60 border-3 border-black rounded-2xl px-4 py-3 text-base font-bold text-white focus:outline-none focus:border-party-green"
              />
            </div>

            <div>
              <label className="text-xs font-black uppercase text-purple-200 block mb-1.5">
                Wybierz Awatar:
              </label>
              <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto p-1">
                {AVATARS.map((av) => (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setAvatar(av.emoji)}
                    className={`p-2 rounded-2xl border-2 border-black flex flex-col items-center transition ${
                      avatar === av.emoji
                        ? 'bg-party-yellow text-black scale-105 shadow-brutal-sm'
                        : 'bg-black/40 text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="text-2xl">{av.emoji}</span>
                    <span className="text-[10px] font-black mt-0.5">{av.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-party-green hover:bg-emerald-400 text-black font-black text-xl py-4 rounded-2xl border-4 border-black shadow-brutal uppercase tracking-wider transition active:translate-y-1"
            >
              DOŁĄCZ DO POKOJU! 🚀
            </button>
          </form>
        </div>
      </div>
    );
  }

  const me = room?.players.find((p) => p.id === playerId) ?? {
    id: playerId,
    name: name || 'Gracz',
    avatar,
    ready,
    isConnected,
    lastSeen: Date.now(),
    joinedAt: Date.now(),
  };

  // =========================================================================
  // 2. WIDOK GRACZA W LOBBY HUBU (CZEKA NA WYBÓR GRY PRZEZ HOSTA)
  // =========================================================================
  if (!room || room.activeGame === 'HUB' || room.gameState == null) {
    return (
      <div className="min-h-screen bg-[#120A2A] text-white flex flex-col justify-between p-4">
        <header className="bg-[#1E1242] border-3 border-black rounded-2xl px-4 py-3 shadow-brutal-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{avatar}</span>
            <div>
              <div className="font-black text-sm leading-tight">{name}</div>
              <div className="text-[10px] font-bold text-party-yellow uppercase">
                Pokój PIN: {roomCode}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`p-1.5 rounded-lg border border-black ${
                isConnected
                  ? 'bg-party-green/20 text-party-green'
                  : 'bg-party-red/30 text-party-red'
              }`}
              title={isConnected ? 'Połączono z Hostem' : 'Łączenie...'}
            >
              {isConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            </span>
            <button
              onClick={() => setIsJoined(false)}
              className="text-xs bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-xl border border-black font-bold"
            >
              Zmień nick
            </button>
          </div>
        </header>

        <main className="my-auto max-w-md mx-auto w-full space-y-6 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1E1242] border-4 border-black rounded-3xl p-6 shadow-brutal"
          >
            <div className="text-6xl mb-3 animate-bounce">{avatar}</div>
            <h2 className="text-2xl font-black uppercase text-party-yellow">
              Jesteś w pokoju!
            </h2>
            <div className="mt-3 bg-black/50 border-2 border-party-yellow/50 rounded-2xl p-4 flex items-center justify-center gap-3">
              <Hourglass className="w-6 h-6 text-party-yellow animate-spin" />
              <p className="text-sm font-bold text-purple-100 text-left">
                Czekaj na wybór gry przez Hosta na ekranie TV...
              </p>
            </div>

            {/* Opcjonalna zmiana statusu gotowości */}
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold text-purple-200">Twój status:</span>
              <button
                onClick={() => setReady(!ready)}
                className={`px-3 py-1.5 rounded-xl border-2 border-black font-black text-xs uppercase flex items-center gap-1.5 transition ${
                  ready ? 'bg-party-green text-black' : 'bg-party-orange text-black'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {ready ? 'Gotowy do gry' : 'Chwila przerwy'}
              </button>
            </div>
          </motion.div>

          <div className="bg-black/40 border-2 border-black rounded-2xl p-4 text-xs text-purple-300">
            <span className="font-bold text-white block mb-1">🎮 Dostępne gry w Hubie:</span>
            <span>🅿️ Gra na P • 💋 Marilyn Monroe • 🕵️‍♂️ Szpieg (Spyfall)</span>
          </div>
        </main>

        <footer className="text-center text-[10px] text-purple-300/60 font-bold">
          PartyGames Hub • Kontroler Smartfona
        </footer>
      </div>
    );
  }

  // =========================================================================
  // 3. WIDOK GRACZA W AKTYWNEJ GRZE (MODULARNY PLAYER VIEW)
  // =========================================================================
  const mod = getGame(room.activeGame);
  const PlayerComponent = mod.PlayerView;

  return (
    <PlayerComponent
      state={room.gameState}
      me={me}
      players={room.players}
      roomCode={room.id}
      isConnected={isConnected}
      send={(action) => sendGameAction(mod.id, action)}
    />
  );
}
