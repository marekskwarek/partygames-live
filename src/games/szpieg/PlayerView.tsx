'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Search,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  Target,
  ArrowRight,
} from 'lucide-react';
import type { PlayerViewProps } from '@/core/types';
import type { SpyAction, SpyState } from './types';
import { LOCATIONS } from './data';

export default function PlayerView({
  state,
  me,
  players,
  roomCode,
  isConnected,
  send,
}: PlayerViewProps<SpyState, SpyAction>) {
  const isSpy = state.roles[me.id] ?? false;
  const currentLoc =
    state.gameLocations.find((l) => l.id === state.currentLocationId) ||
    LOCATIONS.find((l) => l.id === state.currentLocationId) ||
    LOCATIONS[0];

  // Tryb podglądu roli (przytrzymaj, aby zobaczyć)
  const [peekRole, setPeekRole] = useState(false);
  // Modal wyboru lokacji dla szpiega (zgaduję lokację)
  const [showGuessModal, setShowGuessModal] = useState(false);

  const myVote = state.votes[me.id];

  const handleVibrate = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(200);
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0D18] text-white flex flex-col justify-between p-4 relative select-none">
      {/* Pasek statusu gracza */}
      <header className="bg-[#141A2D] border-3 border-black rounded-2xl px-4 py-2.5 shadow-brutal-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{me.avatar}</span>
          <div>
            <div className="font-black text-sm leading-tight text-white">{me.name}</div>
            <div className="text-[10px] font-bold text-party-yellow uppercase">
              PIN: {roomCode}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Przycisk akcji zwołania głosowania jeśli trwa faza pytań */}
          {state.phase === 'INTERROGATION' && (
            <button
              onClick={() => {
                handleVibrate();
                send({ type: 'CALL_VOTING', playerId: me.id });
              }}
              className="bg-party-red hover:bg-red-500 text-white font-black text-xs px-2.5 py-1.5 rounded-xl border border-black shadow-brutal-sm flex items-center gap-1 uppercase"
            >
              <AlertTriangle className="w-3.5 h-3.5" /> Głosowanie
            </button>
          )}

          {/* Szpieg może w dowolnym momencie kliknąć Zgaduję Lokację */}
          {isSpy &&
            (state.phase === 'INTERROGATION' || state.phase === 'SPY_GUESS') && (
              <button
                onClick={() => setShowGuessModal(true)}
                className="bg-party-yellow hover:bg-yellow-300 text-black font-black text-xs px-2.5 py-1.5 rounded-xl border border-black shadow-brutal-sm flex items-center gap-1 uppercase"
              >
                <Target className="w-3.5 h-3.5" /> Zgaduję!
              </button>
            )}
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 1. FAZA LOBBY                                                             */}
      {/* ========================================================================= */}
      {state.phase === 'LOBBY' && (
        <main className="my-auto max-w-md mx-auto w-full text-center space-y-4">
          <div className="bg-[#141A2D] border-4 border-black rounded-3xl p-6 shadow-brutal">
            <span className="text-6xl mb-3 inline-block">🕵️</span>
            <h2 className="text-2xl font-black uppercase text-party-yellow">
              Misja: Szpieg
            </h2>
            <p className="text-xs text-purple-200 mt-2 font-medium">
              Czekaj na rozpoczęcie partii przez Hosta na ekranie TV. Przygotuj się do dyskretnego sprawdzenia swojej roli!
            </p>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 2. FAZA ODPRAWY ORAZ PRZESŁUCHANIA (KARTA ROLI / LOKACJI)                 */}
      {/* ========================================================================= */}
      {(state.phase === 'BRIEFING' || state.phase === 'INTERROGATION') && (
        <main className="my-auto max-w-md mx-auto w-full space-y-4">
          {/* Przycisk / Blok dyskretnego podglądu roli */}
          <div className="bg-[#141A2D] border-4 border-black rounded-3xl p-5 shadow-brutal text-center">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
              <span className="text-[11px] font-black uppercase text-purple-300">
                Tajna tożsamość
              </span>
              <span className="text-[11px] font-bold text-gray-400">
                {peekRole ? 'Widoczna' : 'Ukryta przed sąsiadami'}
              </span>
            </div>

            {/* Przytrzymaj lub kliknij aby odkryć */}
            <div
              onMouseDown={() => setPeekRole(true)}
              onMouseUp={() => setPeekRole(false)}
              onTouchStart={() => setPeekRole(true)}
              onTouchEnd={() => setPeekRole(false)}
              className={`p-6 rounded-2xl border-3 border-black transition cursor-pointer select-none ${
                peekRole
                  ? isSpy
                    ? 'bg-party-red text-white'
                    : 'bg-party-blue text-black'
                  : 'bg-black/80 text-white hover:bg-black/90'
              }`}
            >
              {peekRole ? (
                <div>
                  {isSpy ? (
                    <div>
                      <div className="text-5xl mb-2">🕵️‍♂️</div>
                      <div className="text-2xl font-black uppercase tracking-wider">
                        JESTEŚ SZPIEGIEM!
                      </div>
                      <p className="text-xs text-red-100 mt-2 font-bold leading-snug">
                        Nie znasz lokacji! Słuchaj uważnie odpowiedzi innych, blefuj i zgadnij, gdzie jesteście!
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-5xl mb-2">📍</div>
                      <div className="text-xs font-black uppercase tracking-widest text-black/80">
                        Twoja Lokacja:
                      </div>
                      <div className="text-2xl font-black uppercase text-black mt-0.5">
                        {currentLoc.name}
                      </div>
                      <div className="text-[11px] font-bold text-black/70 mt-1">
                        Kategoria: {currentLoc.category}
                      </div>
                      <div className="mt-3 bg-black/10 rounded-xl p-2 text-[10px] font-bold text-black/90 text-left">
                        <strong>Skojarzenia:</strong> {currentLoc.hints.join(' • ')}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-4 flex flex-col items-center gap-2">
                  <Eye className="w-8 h-8 text-party-yellow animate-pulse" />
                  <span className="font-black text-sm uppercase text-party-yellow">
                    Dotknij i przytrzymaj, aby podejrzeć rolę
                  </span>
                  <span className="text-[10px] text-gray-400 font-semibold">
                    (ukrywa się po puszczeniu palca)
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Wskazówki i aktualna tura pytań */}
          {state.phase === 'INTERROGATION' && state.currentTurn && (
            <div className="bg-black/50 border-3 border-black rounded-2xl p-4 text-center">
              <div className="text-[11px] font-black uppercase text-party-yellow mb-1 flex items-center justify-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" /> Pytanie na TV:
              </div>
              <p className="text-sm font-black text-white italic">
                „{state.currentTurn.question}”
              </p>
              <div className="mt-2 text-[11px] font-bold text-purple-200">
                {state.currentTurn.targetId === me.id ? (
                  <span className="text-party-green uppercase">
                    👉 Teraz twoja kolej na odpowiedź na głos!
                  </span>
                ) : state.currentTurn.askerId === me.id ? (
                  <span className="text-party-yellow uppercase">
                    👉 Ty zadajesz pytanie graczowi:{' '}
                    {players.find((p) => p.id === state.currentTurn?.targetId)?.name}
                  </span>
                ) : (
                  <span>Słuchaj uważnie odpowiedzi w pokoju...</span>
                )}
              </div>
            </div>
          )}
        </main>
      )}

      {/* ========================================================================= */}
      {/* 3. FAZA GŁOSOWANIA (VOTING)                                               */}
      {/* ========================================================================= */}
      {state.phase === 'VOTING' && (
        <main className="my-auto max-w-md mx-auto w-full space-y-4">
          <div className="bg-[#141A2D] border-4 border-black rounded-3xl p-5 shadow-brutal text-center">
            <h2 className="text-xl font-black uppercase text-party-red mb-1">
              Wskaż Szpiega! 🕵️
            </h2>
            <p className="text-xs text-purple-200 mb-4">
              Kto według Ciebie blefował i nie zna lokacji? Kliknij podejrzanego gracza:
            </p>

            <div className="space-y-2">
              {players.map((p) => {
                const isSelected = myVote === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      handleVibrate();
                      send({ type: 'CAST_VOTE', playerId: me.id, targetId: p.id });
                    }}
                    className={`w-full p-3 rounded-2xl border-3 border-black flex items-center justify-between font-black text-sm transition ${
                      isSelected
                        ? 'bg-party-red text-white shadow-brutal-sm scale-102'
                        : 'bg-black/60 text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{p.avatar}</span>
                      <span>{p.name}</span>
                      {p.id === me.id && (
                        <span className="text-[10px] text-gray-400 uppercase font-bold">
                          (Ty)
                        </span>
                      )}
                    </div>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 4. STRZAŁ RATUNKOWY SZPIEGA (SPY_GUESS)                                   */}
      {/* ========================================================================= */}
      {state.phase === 'SPY_GUESS' && (
        <main className="my-auto max-w-md mx-auto w-full space-y-4 text-center">
          <div className="bg-[#141A2D] border-4 border-black rounded-3xl p-5 shadow-brutal">
            {isSpy ? (
              <div>
                <h2 className="text-xl font-black uppercase text-party-yellow mb-1">
                  Zostałeś zdemaskowany! 🎯
                </h2>
                <p className="text-xs text-purple-200 mb-4">
                  To Twoja ostatnia szansa. Wybierz z listy lokację, o której rozmawiali agenci!
                </p>
                <button
                  onClick={() => setShowGuessModal(true)}
                  className="w-full bg-party-green hover:bg-emerald-400 text-black font-black py-4 rounded-2xl border-3 border-black shadow-brutal uppercase text-base"
                >
                  WYBIERZ LOKACJĘ Z LISTY 📍
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-black uppercase text-party-green mb-1">
                  Świetna robota, Agencie! 🛡️
                </h2>
                <p className="text-xs text-purple-200">
                  Zdemaskowaliście Szpiega. Czekajcie, czy uda mu się odgadnąć lokację w strzale ratunkowym...
                </p>
              </div>
            )}
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 5. FAZA KONIEC GRY (GAME_OVER)                                            */}
      {/* ========================================================================= */}
      {state.phase === 'GAME_OVER' && (
        <main className="my-auto max-w-md mx-auto w-full text-center space-y-4">
          <div className="bg-[#141A2D] border-4 border-black rounded-3xl p-6 shadow-brutal">
            <div className="text-5xl mb-2">
              {state.winner === 'AGENTS' ? '🏆' : '🕵️‍♂️'}
            </div>
            <h2 className="text-2xl font-black uppercase text-party-yellow mb-1">
              Koniec partii!
            </h2>
            <p className="text-xs text-purple-200 font-bold mb-4">{state.winReason}</p>
            <div className="bg-black/60 border-2 border-party-blue rounded-2xl p-3 text-xs">
              <span className="text-gray-400 block mb-0.5 uppercase font-bold">
                Prawdziwa lokacja:
              </span>
              <span className="font-black text-party-green text-base">
                {currentLoc.name}
              </span>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* MODAL STRZAŁU SZPIEGA: 16 LOKACJI                                         */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showGuessModal && isSpy && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 bg-black/90 p-4 flex flex-col justify-between overflow-y-auto"
          >
            <div className="max-w-md mx-auto w-full">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-black text-xl text-party-yellow uppercase">
                    Wybierz lokację
                  </h3>
                  <p className="text-[11px] text-purple-200 font-semibold">
                    1 celny strzał decyduje o zwycięstwie!
                  </p>
                </div>
                <button
                  onClick={() => setShowGuessModal(false)}
                  className="bg-white/10 text-white font-bold px-3 py-1.5 rounded-xl border border-white/20 text-xs"
                >
                  Zamknij
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 pb-6">
                {state.gameLocations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => {
                      handleVibrate();
                      send({
                        type: 'SPY_GUESS_LOCATION',
                        playerId: me.id,
                        locationId: loc.id,
                      });
                      setShowGuessModal(false);
                    }}
                    className="p-3 bg-[#141A2D] hover:bg-party-blue hover:text-black border-2 border-black rounded-2xl text-left transition flex flex-col justify-between shadow-brutal-sm active:scale-95"
                  >
                    <span className="font-black text-xs uppercase leading-tight">
                      {loc.name}
                    </span>
                    <span className="text-[9px] text-purple-300 font-bold mt-1">
                      {loc.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="text-center text-[10px] text-purple-300/60 font-bold">
        PartyGames Live • Kontroler Szpiegowski
      </footer>
    </div>
  );
}
