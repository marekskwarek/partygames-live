'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Radio,
  Clock,
  HelpCircle,
  AlertTriangle,
  RotateCcw,
  Play,
  ArrowRight,
  ShieldAlert,
  Search,
  Eye,
  CheckCircle,
  Trophy,
} from 'lucide-react';
import type { HostViewProps } from '@/core/types';
import type { SpyAction, SpyState } from './types';
import { LOCATIONS } from './data';

export default function HostView({
  state,
  players,
  roomCode,
  dispatch,
}: HostViewProps<SpyState, SpyAction>) {
  const currentLoc =
    state.gameLocations.find((l) => l.id === state.currentLocationId) ||
    LOCATIONS.find((l) => l.id === state.currentLocationId) ||
    LOCATIONS[0];

  const spyPlayer = players.find((p) => p.id === state.spyPlayerId);
  const accusedPlayer = players.find((p) => p.id === state.accusedSpyId);

  // Formatowanie sekund do mm:ss
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] bg-[#0A0D18] text-white flex flex-col justify-between p-4 md:p-8 overflow-hidden select-none">
      {/* Dynamiczny szpiegowski radar w tle */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10 overflow-hidden">
        <div className="w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full border border-party-blue relative flex items-center justify-center">
          <div className="w-3/4 h-3/4 rounded-full border border-dashed border-party-blue/60" />
          <div className="w-1/2 h-1/2 rounded-full border border-party-blue/40" />
          <div className="w-1/4 h-1/4 rounded-full border border-party-blue/30" />
          {/* Promień radaru obracający się */}
          <div className="absolute inset-0 bg-gradient-to-tr from-party-blue/30 via-transparent to-transparent animate-spin [animation-duration:8s]" />
        </div>
      </div>

      {/* Pasek statusu u góry TV: Czas i Tryb */}
      <header className="relative z-10 flex flex-wrap items-center justify-between gap-4 bg-[#141A2D]/80 backdrop-blur border-3 border-black rounded-3xl px-6 py-4 shadow-brutal">
        <div className="flex items-center gap-3">
          <span className="p-2.5 bg-party-blue text-black rounded-2xl border-2 border-black font-black text-xl shadow-brutal-sm">
            🕵️
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-wider text-party-yellow">
                Operacja: SZPIEG
              </h2>
              <span className="bg-red-500/20 text-red-400 border border-red-500/50 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                TAJNE / POUFNE
              </span>
            </div>
            <p className="text-xs text-purple-200 font-semibold">
              Ekran Główny TV • Zero Presji Party Mode
            </p>
          </div>
        </div>

        {/* Wielki stoper z pulsem napięcia */}
        {state.phase !== 'LOBBY' && state.phase !== 'GAME_OVER' && (
          <div
            className={`flex items-center gap-3 px-5 py-2 rounded-2xl border-3 border-black shadow-brutal transition-all ${
              state.secondsLeft <= 30
                ? 'bg-party-red text-white scale-105 animate-pulse'
                : 'bg-black/60 text-party-yellow'
            }`}
          >
            <Clock className="w-6 h-6" />
            <span className="text-3xl md:text-4xl font-black tracking-widest font-mono">
              {formatTime(state.secondsLeft)}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <div className="bg-black/40 border-2 border-white/10 rounded-2xl px-4 py-2 text-xs font-bold text-purple-200">
            Graczy w agencji: <span className="text-party-green font-black">{players.length}</span>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 1. FAZA LOBBY – PRZYGOTOWANIE DO MISJI                                     */}
      {/* ========================================================================= */}
      {state.phase === 'LOBBY' && (
        <main className="relative z-10 max-w-4xl mx-auto w-full my-auto text-center space-y-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#141A2D] border-4 border-black rounded-3xl p-8 shadow-brutal relative"
          >
            <span className="text-6xl mb-4 inline-block animate-bounce">🕵️‍♂️</span>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-2">
              Szpieg w Pokoju
            </h1>
            <p className="text-sm md:text-base text-purple-200 max-w-xl mx-auto font-medium">
              Wszyscy Agenci otrzymają tę samą tajną lokację na swoje telefony. Jeden z Was jest{' '}
              <strong className="text-party-red">Szpiegiem</strong> i nie ma pojęcia, gdzie jesteście!
            </p>

            {/* Kafelki z zasadami dla graczy na TV */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-left">
              <div className="bg-black/40 border-2 border-party-blue/40 rounded-2xl p-4">
                <div className="text-party-blue font-black text-xs uppercase mb-1">
                  1. Odprawa (30s)
                </div>
                <p className="text-xs text-purple-200">
                  Każdy w tajemnicy sprawdza telefon. Agenci poznają miejsce, a Szpieg dowiaduje się o swojej roli.
                </p>
              </div>
              <div className="bg-black/40 border-2 border-party-yellow/40 rounded-2xl p-4">
                <div className="text-party-yellow font-black text-xs uppercase mb-1">
                  2. Pytania na żywo
                </div>
                <p className="text-xs text-purple-200">
                  Aplikacja losuje pytania i wskazuje, kto kogo odpytuje. Szpieg musi sprytnie blefować!
                </p>
              </div>
              <div className="bg-black/40 border-2 border-party-green/40 rounded-2xl p-4">
                <div className="text-party-green font-black text-xs uppercase mb-1">
                  3. Głosowanie / Strzał
                </div>
                <p className="text-xs text-purple-200">
                  Zdemaskujcie Szpiega w głosowaniu! Jeśli Szpieg zgadnie lokację – wygrywa partię.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => dispatch({ type: 'START_GAME', durationSeconds: 240 })}
                disabled={players.length < 2}
                className={`px-8 py-5 rounded-2xl border-4 border-black font-black text-xl uppercase tracking-wider flex items-center gap-3 transition ${
                  players.length >= 2
                    ? 'bg-party-green hover:bg-emerald-400 text-black shadow-brutal active:translate-y-1'
                    : 'bg-gray-700 text-gray-400 opacity-60 cursor-not-allowed'
                }`}
              >
                <Play className="w-6 h-6 fill-black" />
                {players.length >= 2 ? 'ROZPOCZNIJ MISJĘ (4 MINUTY)' : 'Czekam na min. 2 graczy...'}
              </button>
            </div>
          </motion.div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 2. FAZA ODPRAWY (BRIEFING) – 25 SEKUND NA TELEFONACH                      */}
      {/* ========================================================================= */}
      {state.phase === 'BRIEFING' && (
        <main className="relative z-10 max-w-3xl mx-auto w-full my-auto text-center space-y-6">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#141A2D] border-4 border-black rounded-3xl p-8 shadow-brutal"
          >
            <div className="inline-flex items-center gap-2 bg-party-yellow text-black font-black text-xs uppercase px-4 py-1.5 rounded-full border-2 border-black mb-4">
              <Eye className="w-4 h-4" /> FAZA 1: TAJNA ODPRAWA
            </div>

            <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-3">
              Sprawdź swój telefon! 📱
            </h2>
            <p className="text-sm md:text-base text-purple-200 max-w-md mx-auto mb-6">
              Przytrzymaj przycisk na ekranie smartfona, aby dyskretnie podejrzeć swoją rolę oraz lokację. Pilnuj ekranu przed wzrokiem sąsiada!
            </p>

            <div className="bg-black/60 border-3 border-party-blue rounded-3xl p-6 max-w-sm mx-auto mb-6">
              <div className="text-xs uppercase font-bold text-gray-400 mb-1">
                Czas do rozpoczęcia pytań:
              </div>
              <div className="text-5xl font-black text-party-yellow font-mono">
                {state.secondsLeft} s
              </div>
            </div>

            <button
              onClick={() => dispatch({ type: 'START_INTERROGATION' })}
              className="bg-party-blue hover:bg-blue-400 text-black font-black px-6 py-3.5 rounded-2xl border-3 border-black text-sm uppercase tracking-wider shadow-brutal-sm transition"
            >
              Wszyscy gotowi? Przejdź do pytań natychmiast →
            </button>
          </motion.div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 3. FAZA PRZESŁUCHANIA (INTERROGATION) – PYTANIA NA TV                      */}
      {/* ========================================================================= */}
      {state.phase === 'INTERROGATION' && (
        <main className="relative z-10 max-w-5xl mx-auto w-full my-auto space-y-6">
          <motion.div
            key={state.turnNumber}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#141A2D] border-4 border-black rounded-3xl p-6 md:p-10 shadow-brutal text-center relative overflow-hidden"
          >
            {/* Nagłówek kolejki: Kto pyta kogo */}
            <div className="inline-flex items-center gap-3 bg-black/60 border-2 border-white/20 px-5 py-2 rounded-2xl mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-party-green uppercase">Pytający:</span>
                <span className="font-black text-sm md:text-base text-white">
                  {players.find((p) => p.id === state.currentTurn?.askerId)?.name || 'Gracz 1'}
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-party-yellow" />
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-party-red uppercase">Odpowiada:</span>
                <span className="font-black text-sm md:text-base text-white">
                  {players.find((p) => p.id === state.currentTurn?.targetId)?.name || 'Gracz 2'}
                </span>
              </div>
            </div>

            {/* Centralne wylosowane pytanie wielkim fontem */}
            <div className="my-4">
              <div className="text-xs font-black uppercase text-purple-300 tracking-widest mb-3 flex items-center justify-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-party-yellow" /> Asystent Przesłuchania (Pytanie #{state.turnNumber})
              </div>
              <h1 className="text-2xl md:text-5xl font-black text-party-yellow uppercase leading-tight drop-shadow-[0_4px_0_rgba(0,0,0,1)] max-w-4xl mx-auto">
                „{state.currentTurn?.question || 'W co jesteś w tej chwili ubrany?'}”
              </h1>
              <p className="text-xs md:text-sm text-purple-200 mt-4 font-semibold">
                Odpowiadaj na głos w pokoju! Pamiętaj: szpieg słucha każdego słowa.
              </p>
            </div>

            {/* Przyciski sterowania Hosta */}
            <div className="mt-8 pt-6 border-t-2 border-white/10 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => dispatch({ type: 'NEXT_QUESTION' })}
                className="bg-party-yellow hover:bg-yellow-300 text-black font-black px-6 py-3.5 rounded-2xl border-3 border-black text-sm md:text-base uppercase tracking-wider shadow-brutal-sm transition active:translate-y-1 flex items-center gap-2"
              >
                Kolejne pytanie →
              </button>

              <button
                onClick={() => dispatch({ type: 'CALL_VOTING', playerId: 'host-tv' })}
                className="bg-party-red hover:bg-red-400 text-white font-black px-6 py-3.5 rounded-2xl border-3 border-black text-sm md:text-base uppercase tracking-wider shadow-brutal-sm transition active:translate-y-1 flex items-center gap-2"
              >
                <AlertTriangle className="w-5 h-5" /> Zarządź Głosowanie!
              </button>
            </div>
          </motion.div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 4. FAZA GŁOSOWANIA (VOTING) – KTO JEST SZPIEGIEM                           */}
      {/* ========================================================================= */}
      {state.phase === 'VOTING' && (
        <main className="relative z-10 max-w-4xl mx-auto w-full my-auto text-center space-y-6">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#141A2D] border-4 border-black rounded-3xl p-6 md:p-8 shadow-brutal"
          >
            <div className="inline-flex items-center gap-2 bg-party-red text-white font-black text-xs uppercase px-4 py-1.5 rounded-full border-2 border-black mb-4 animate-pulse">
              <ShieldAlert className="w-4 h-4" /> NARADA AGENCJI: GŁOSOWANIE
            </div>

            <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-2">
              Kto jest Szpiegiem?
            </h2>
            <p className="text-xs md:text-sm text-purple-200 max-w-lg mx-auto mb-6">
              Każdy gracz oddaje teraz tajny głos na swoim smartfonie. Wskażcie osobę, której odpowiedzi brzmiały najbardziej podejrzanie!
            </p>

            {/* Kartoteki podejrzanych na ekranie TV */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {players.map((p) => {
                const votesReceived = Object.values(state.votes).filter((id) => id === p.id).length;
                const hasVoted = !!state.votes[p.id];
                return (
                  <div
                    key={p.id}
                    className="bg-black/50 border-3 border-black rounded-2xl p-4 flex flex-col items-center justify-between shadow-brutal-sm"
                  >
                    <div className="text-4xl mb-2">{p.avatar}</div>
                    <div className="font-black text-sm text-white">{p.name}</div>
                    <div className="mt-3 flex items-center gap-1.5">
                      {hasVoted ? (
                        <span className="text-[11px] font-bold text-party-green flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Zagłosował
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-gray-400 italic">
                          Wybiera...
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 5. STRZAŁ RATUNKOWY SZPIEGA (SPY_GUESS)                                   */}
      {/* ========================================================================= */}
      {state.phase === 'SPY_GUESS' && (
        <main className="relative z-10 max-w-3xl mx-auto w-full my-auto text-center space-y-6">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#141A2D] border-4 border-black rounded-3xl p-8 shadow-brutal"
          >
            <span className="text-6xl mb-4 inline-block animate-spin [animation-duration:10s]">
              🎯
            </span>
            <div className="inline-flex items-center gap-2 bg-party-yellow text-black font-black text-xs uppercase px-4 py-1.5 rounded-full border-2 border-black mb-3">
              OSTATNIA SZANSA SZPIEGA
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-3">
              Szpieg został zdemaskowany!
            </h2>
            <p className="text-sm text-purple-200 max-w-md mx-auto mb-6 font-medium">
              Agenci prawidłowo wytypowali Szpiega! Jednak Szpieg ma jeszcze 1 strzał ratunkowy: musi wskazać na telefonie, jaka to była lokacja.
            </p>

            <div className="bg-black/60 border-3 border-party-red rounded-3xl p-5 max-w-xs mx-auto">
              <div className="text-xs font-bold text-gray-400 uppercase">Pozostały czas:</div>
              <div className="text-4xl font-black text-party-red font-mono mt-1">
                {state.secondsLeft} s
              </div>
            </div>
          </motion.div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 6. PODSUMOWANIE GRY (GAME_OVER) – DRAMATYCZNE UJAWNIENIE                  */}
      {/* ========================================================================= */}
      {state.phase === 'GAME_OVER' && (
        <main className="relative z-10 max-w-4xl mx-auto w-full my-auto text-center space-y-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#141A2D] border-4 border-black rounded-3xl p-8 md:p-12 shadow-brutal"
          >
            <div className="text-7xl mb-4">
              {state.winner === 'AGENTS' ? '🏆' : '🕵️‍♂️'}
            </div>

            <div
              className={`inline-flex items-center gap-2 font-black text-sm uppercase px-5 py-2 rounded-full border-3 border-black shadow-brutal-sm mb-4 ${
                state.winner === 'AGENTS'
                  ? 'bg-party-green text-black'
                  : 'bg-party-red text-white'
              }`}
            >
              <Trophy className="w-5 h-5" />
              {state.winner === 'AGENTS' ? 'ZWYCIĘSTWO AGENTÓW!' : 'ZWYCIĘSTWO SZPIEGA!'}
            </div>

            <h1 className="text-3xl md:text-5xl font-black uppercase text-white mb-3">
              {state.winReason}
            </h1>

            {/* Karty ujawnienia: Szpieg i Prawdziwa Lokacja */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 text-left">
              {/* Karta Szpiega */}
              <div className="bg-black/60 border-3 border-party-red rounded-2xl p-5">
                <span className="text-xs font-black uppercase text-party-red block mb-1">
                  Tożsamość Szpiega:
                </span>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-4xl">{spyPlayer?.avatar || '🕵️'}</span>
                  <div>
                    <h3 className="text-2xl font-black text-white">{spyPlayer?.name || 'Szpieg'}</h3>
                    <p className="text-xs text-purple-200">Blefował przez całą rozgrywkę</p>
                  </div>
                </div>
              </div>

              {/* Karta Prawdziwej Lokacji */}
              <div className="bg-black/60 border-3 border-party-green rounded-2xl p-5">
                <span className="text-xs font-black uppercase text-party-green block mb-1">
                  Prawdziwa Tajna Lokacja:
                </span>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-4xl">📍</span>
                  <div>
                    <h3 className="text-2xl font-black text-party-yellow">{currentLoc.name}</h3>
                    <p className="text-xs text-purple-200">Kategoria: {currentLoc.category}</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => dispatch({ type: 'RESTART_GAME' })}
              className="bg-party-green hover:bg-emerald-400 text-black font-black text-xl px-8 py-5 rounded-2xl border-4 border-black shadow-brutal uppercase tracking-wider transition active:translate-y-1 inline-flex items-center gap-3"
            >
              <RotateCcw className="w-6 h-6" /> ZAGRAJ PONOWNIE W SZPIEGA
            </button>
          </motion.div>
        </main>
      )}

      {/* Stopka Hosta */}
      <footer className="relative z-10 flex items-center justify-between text-[11px] font-bold text-purple-300/60 pt-4 border-t border-white/10">
        <span>PartyGames Live • Moduł Dedukcji Społecznej: Szpieg</span>
        <span>Pokój PIN: {roomCode}</span>
      </footer>
    </div>
  );
}
