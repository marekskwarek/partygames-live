'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import {
  Users,
  Gamepad2,
  Volume2,
  VolumeX,
  ArrowRight,
  LogOut,
  Sparkles,
  Smartphone,
  UserPlus,
  Tv,
} from 'lucide-react';
import { GAMES, getGame } from '@/games/registry';
import { useRoomHost } from '@/core/useRoomHost';
import { soundEngine } from '@/core/sound';
import { AVATARS } from '@/core/avatars';

interface HostHubViewProps {
  roomCode: string;
  onExitRoom: () => void;
}

export default function HostHubView({ roomCode, onExitRoom }: HostHubViewProps) {
  const { room, shake, selectGame, backToHub, dispatchGame } = useRoomHost(roomCode);
  const [isMuted, setIsMuted] = useState(false);
  const [joinUrl, setJoinUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      setJoinUrl(`${origin}/?join=${roomCode}`);
    }
  }, [roomCode]);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundEngine.setMuted(next);
  };

  return (
    <motion.div
      animate={
        shake
          ? {
              x: [0, -18, 18, -14, 14, -8, 8, 0],
              y: [0, 10, -10, 6, -6, 0],
            }
          : { x: 0, y: 0 }
      }
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#120A2A] text-white flex flex-col justify-between"
    >
      {/* GŁÓWNY PASEK NAWIGACJI HOSTA */}
      <header className="sticky top-0 z-50 bg-[#1E1242] border-b-4 border-black px-4 py-3 shadow-brutal flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onExitRoom}
            className="bg-white/10 hover:bg-white/20 text-white font-bold px-3 py-1.5 rounded-xl border-2 border-black text-xs uppercase flex items-center gap-1.5 transition"
            title="Wyjdź do menu głównego"
          >
            <LogOut className="w-4 h-4" /> Wyjdź
          </button>

          <div className="flex items-center gap-2">
            <span className="bg-party-yellow text-black font-black text-xl px-2.5 py-0.5 rounded-xl border-2 border-black shadow-brutal-sm">
              HUB
            </span>
            <div>
              <h1 className="font-black text-base md:text-lg tracking-wider uppercase leading-none">
                PartyGames Hub
              </h1>
              <p className="text-[10px] text-purple-300 font-bold">
                {room.activeGame === 'HUB' ? 'Wybór gry w pokoju' : `W trakcie: ${getGame(room.activeGame).title}`}
              </p>
            </div>
          </div>
        </div>

        {/* Informacje o pokoju i przycisk powrotu do Menu Hubu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {room.activeGame !== 'HUB' && (
            <button
              onClick={backToHub}
              className="bg-party-yellow hover:bg-yellow-300 text-black font-black px-3 py-1.5 rounded-xl border-2 border-black text-xs uppercase flex items-center gap-1.5 shadow-brutal-sm transition"
            >
              <Gamepad2 className="w-4 h-4" /> Zmień grę / Menu Hosta
            </button>
          )}

          <div className="bg-black/60 border-2 border-party-yellow rounded-xl px-3 py-1 flex items-center gap-2">
            <span className="text-[10px] uppercase text-gray-300 font-bold hidden sm:inline">
              PIN:
            </span>
            <span className="text-xl md:text-2xl font-black tracking-widest text-party-yellow">
              {room.id}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-black/40 border-2 border-black px-3 py-1.5 rounded-xl text-xs font-bold">
            <Users className="w-4 h-4 text-party-green" />
            <span>{room.players.length}</span>
          </div>

          <button
            onClick={toggleMute}
            className="p-2 bg-party-purple hover:bg-purple-500 text-white rounded-xl border-2 border-black shadow-brutal-sm transition"
            title={isMuted ? 'Włącz dźwięk' : 'Wycisz dźwięk'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 1. WIDOK MENU HUBU (CENTRALNY WYBÓR GIER W STYLU JACKBOX)                 */}
      {/* ========================================================================= */}
      {room.activeGame === 'HUB' ? (
        <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEWA STRONA: Kod QR, Dołączanie graczy */}
          <div className="lg:col-span-4 bg-[#1E1242] border-4 border-black rounded-3xl p-6 shadow-brutal text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 bg-party-yellow text-black font-black text-xs uppercase px-3 py-1 rounded-full border-2 border-black mb-3">
              <Smartphone className="w-4 h-4" /> Dołącz telefonem
            </div>
            <h2 className="text-2xl font-black uppercase mb-1">Wejdź do pokoju</h2>
            <p className="text-xs text-purple-200 mb-4">
              Zeskanuj kod QR lub wejdź na stronę i podaj kod PIN:
            </p>

            {joinUrl && (
              <div className="bg-white p-3 rounded-2xl border-4 border-black shadow-brutal mb-4">
                <QRCodeSVG value={joinUrl} size={160} level="M" />
              </div>
            )}

            <div className="w-full bg-black/60 border-3 border-party-yellow rounded-2xl py-3 px-4 mb-4">
              <div className="text-[10px] uppercase font-bold text-gray-300">KOD PIN:</div>
              <div className="text-4xl md:text-5xl font-black tracking-[0.25em] text-party-yellow mt-0.5">
                {room.id}
              </div>
            </div>

            <div className="w-full bg-black/40 border-2 border-white/10 rounded-2xl p-3 text-xs text-purple-200">
              <span className="text-party-yellow font-black block mb-1">
                Jak dołączyć?
              </span>
              Otwórz aparat w telefonie i zeskanuj kod QR lub wejdź na stronę i podaj powyższy kod PIN.
            </div>

            {/* Lista podłączonych graczy w pokoju */}
            <div className="w-full mt-6 pt-4 border-t border-white/10 text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-black text-purple-200 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-party-green" /> Dołączeni gracze ({room.players.length}):
                </span>
              </div>

              {room.players.length === 0 ? (
                <p className="text-xs text-gray-400 italic text-center py-2">
                  Czekamy na pierwszych graczy...
                </p>
              ) : (
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {room.players.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between bg-black/40 border-2 border-black rounded-xl px-3 py-1.5 text-xs font-bold"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{p.avatar}</span>
                        <span>{p.name}</span>
                      </div>
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          p.isConnected ? 'bg-party-green' : 'bg-gray-500'
                        }`}
                        title={p.isConnected ? 'Połączony' : 'Rozłączony'}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* PRAWA STRONA: Karuzela / Wybór Gier */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-[#1E1242] border-4 border-black rounded-3xl p-6 shadow-brutal">
              <div className="flex items-center gap-2 text-party-yellow font-black text-xs uppercase mb-1">
                <Sparkles className="w-4 h-4" /> Jackbox / AirConsole Party Experience
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase">Wybierz Grę Towarzyską</h2>
              <p className="text-sm text-purple-200 mt-1">
                Wszyscy dołączeni gracze natychmiast przejdą do wybranej gry bez rozłączania ani ponownego wpisywania kodu PIN!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {GAMES.map((game) => (
                <motion.div
                  key={game.id}
                  whileHover={{ y: -4 }}
                  className="bg-[#1E1242] border-4 border-black rounded-3xl p-6 shadow-brutal flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-5xl">{game.emoji}</span>
                      <span
                        className="text-xs font-black px-3 py-1 rounded-full border-2 border-black uppercase text-black"
                        style={{ backgroundColor: game.accent }}
                      >
                        {game.playersHint}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black uppercase">{game.title}</h3>
                    <p className="text-xs md:text-sm text-purple-200 mt-2 leading-relaxed">
                      {game.tagline}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <button
                      onClick={() => selectGame(game.id)}
                      disabled={room.players.length === 0}
                      className={`w-full py-4 rounded-2xl border-4 border-black font-black text-lg uppercase flex items-center justify-center gap-2 transition ${
                        room.players.length > 0
                          ? 'bg-party-green hover:bg-emerald-400 text-black shadow-brutal-sm active:translate-y-1'
                          : 'bg-gray-700 text-gray-400 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      {room.players.length > 0 ? (
                        <>
                          Rozpocznij {game.title} ({room.players.length}{' '}
                          {room.players.length === 1 ? 'gracz' : 'graczy'}){' '}
                          <ArrowRight className="w-5 h-5" />
                        </>
                      ) : (
                        'Czekam na graczy z telefonów...'
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      ) : (
        /* ========================================================================= */
        /* 2. WIDOK AKTYWNEJ GRY (MODULARNY HOST VIEW)                               */
        /* ========================================================================= */
        <div className="flex-1">
          {(() => {
            const mod = getGame(room.activeGame);
            const HostComponent = mod.HostView;
            return (
              <HostComponent
                state={room.gameState}
                players={room.players}
                roomCode={room.id}
                dispatch={dispatchGame}
              />
            );
          })()}
        </div>
      )}

      {/* STOPKA */}
      <footer className="bg-black/60 border-t-2 border-black py-2 px-4 text-center text-xs text-purple-300 font-bold">
        PartyGames Hub • Trwały Pokój PIN: <span className="text-party-yellow">{room.id}</span>
      </footer>
    </motion.div>
  );
}
