'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Users,
  Clock,
  Trophy,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  Crown,
  Flame,
  Sliders,
  CheckCircle2,
  XCircle,
  SkipForward,
  Pause,
  AlertOctagon,
  EyeOff,
} from 'lucide-react';
import type { HostViewProps } from '@/core/types';
import type {
  MarilynAction,
  MarilynSettings,
  MarilynState,
  ScoringFormat,
} from './types';
import { MARILYN_CARDS } from './cards';

export default function HostView({
  state: gameState,
  dispatch,
}: HostViewProps<MarilynState, MarilynAction>) {
  const [screenShake, setScreenShake] = useState(false);

  useEffect(() => {
    if (gameState.phase === 'GAME_OVER') {
      confetti({ particleCount: 110, spread: 80, origin: { y: 0.6 } });
    }
  }, [gameState.phase]);

  useEffect(() => {
    if (gameState.lastTabooAlert) {
      setScreenShake(true);
      const timer = setTimeout(() => setScreenShake(false), 750);
      return () => clearTimeout(timer);
    }
  }, [gameState.lastTabooAlert?.id]);

  const handleStartGame = () => dispatch({ type: 'HOST_START_GAME' });
  const handleStartRoundNow = () => dispatch({ type: 'HOST_START_ROUND' });
  const handleNextTurn = () => dispatch({ type: 'HOST_NEXT_TURN' });
  const handlePlayAgain = () => dispatch({ type: 'HOST_PLAY_AGAIN' });

  const updateSettings = (partial: Partial<MarilynSettings>) =>
    dispatch({ type: 'HOST_UPDATE_SETTINGS', payload: { partial } });

  const activeSpeaker = gameState.players.find(
    (p) => p.id === gameState.activeSpeakerId
  );
  const activeTeam = gameState.teams[gameState.activeTeamIndex];

  // Statystyki finałowe
  const bestDescriber = [...gameState.players].sort(
    (a, b) => b.stats.cardsDescribed - a.stats.cardsDescribed
  )[0];
  const biggestTabooBreaker = [...gameState.players].sort(
    (a, b) => b.stats.tabooViolationsAsDescriber - a.stats.tabooViolationsAsDescriber
  )[0];
  const chiefCensor = [...gameState.players].sort(
    (a, b) => b.stats.tabooCaughtCount - a.stats.tabooCaughtCount
  )[0];

  return (
    <motion.div
      animate={
        screenShake
          ? {
              x: [0, -18, 18, -14, 14, -8, 8, 0],
              y: [0, 10, -10, 6, -6, 0],
            }
          : { x: 0, y: 0 }
      }
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-76px)] bg-[#120A2A] text-white flex flex-col justify-between relative overflow-hidden p-4 md:p-8"
    >
      {/* Tło graficzne Pop-Art */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-16 -left-16 text-[16rem] font-black text-party-red select-none rotate-[-12deg]">
          TABU
        </div>
        <div className="absolute -bottom-20 right-10 text-[16rem] font-black text-party-yellow select-none rotate-[14deg]">
          ❌
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FAZA 1: LOBBY                                                             */}
      {/* ========================================================================= */}
      {gameState.phase === 'LOBBY' && (
        <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 my-4 items-start">
          {/* LEWA KOLUMNA: Zasady gry Taboo */}
          <div className="lg:col-span-4 bg-[#1E1242] border-4 border-black rounded-3xl p-6 shadow-brutal flex flex-col text-left">
            <div className="inline-flex self-start items-center gap-2 bg-party-red text-white font-black text-xs uppercase px-3 py-1 rounded-full border-2 border-black mb-3">
              <AlertOctagon className="w-4 h-4" /> Zasady Gry w Tabu
            </div>
            <h2 className="text-3xl font-black uppercase mb-3">Marilyn Monroe</h2>
            <ul className="space-y-3 text-sm text-purple-100">
              <li>
                🎭 <strong>Opisujący</strong> widzi na telefonie postać oraz <strong className="text-party-red">3 ZAKAZANE SŁOWA</strong> (np. <em>Donald Trump</em> ➔ <em>Prezydent, USA, Włosy</em>).
              </li>
              <li>
                🚨 <strong>Strażnicy Tabu (Przeciwnicy):</strong> widzą na swoich smartfonach te same zakazane słowa. Gdy opisujący wypowie którekolwiek – wciskają <strong className="text-party-red">ZŁAMAŁ TABU!</strong> (−{gameState.settings.tabooPenaltySeconds}s i −{gameState.settings.tabooPenaltyPoints} pkt!).
              </li>
              <li>
                👥 <strong>Zgadywanie:</strong> drużyna zgaduje na głos, a opisujący klika <strong className="text-party-green">ZGADNIĘTE</strong> (+1 pkt).
              </li>
              <li>
                🔒 <strong>Ekran TV jest czysty:</strong> zgadujący patrzą na telewizor, na którym widnieje tylko kategoria postaci.
              </li>
            </ul>
          </div>

          {/* ŚRODKOWA KOLUMNA: Drużyny */}
          <div className="lg:col-span-5 bg-[#1E1242] border-4 border-black rounded-3xl p-6 shadow-brutal flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-black uppercase flex items-center gap-2">
                  <Users className="w-6 h-6 text-party-yellow" />
                  Gracze w Pokoju ({gameState.players.length})
                </h2>
              </div>

              {gameState.settings.scoringFormat === 'TEAMS' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {gameState.teams.map((team) => {
                    const teamMembers = gameState.players.filter(
                      (p) => p.teamId === team.id
                    );
                    return (
                      <div
                        key={team.id}
                        className="bg-black/40 border-3 border-black rounded-2xl p-4"
                        style={{ borderColor: team.color }}
                      >
                        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{team.icon}</span>
                            <span className="font-black text-sm uppercase">
                              {team.name}
                            </span>
                          </div>
                          <span className="text-xs font-black bg-white/10 px-2 py-0.5 rounded-full">
                            {teamMembers.length} os.
                          </span>
                        </div>

                        {teamMembers.length === 0 ? (
                          <p className="text-xs text-gray-400 italic py-4 text-center">
                            Oczekiwanie na graczy...
                          </p>
                        ) : (
                          <ul className="space-y-2">
                            {teamMembers.map((p) => (
                              <li
                                key={p.id}
                                className="flex items-center justify-between bg-white/10 rounded-xl px-3 py-2 border border-black"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-xl">{p.avatar}</span>
                                  <span className="font-bold text-sm">
                                    {p.name}
                                  </span>
                                </div>
                                <span
                                  className={`w-2.5 h-2.5 rounded-full ${
                                    p.isConnected ? 'bg-party-green' : 'bg-gray-500'
                                  }`}
                                  title={p.isConnected ? 'Połączony' : 'Rozłączony'}
                                />
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {gameState.players.map((p) => (
                    <div
                      key={p.id}
                      className="bg-black/40 border-2 border-party-yellow rounded-2xl p-3 flex items-center gap-2.5"
                    >
                      <span className="text-2xl">{p.avatar}</span>
                      <span className="font-black text-sm truncate">{p.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Przycisk START */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                onClick={handleStartGame}
                disabled={gameState.players.length < 1}
                className="w-full bg-party-red hover:bg-rose-500 disabled:opacity-50 text-white font-black text-xl md:text-2xl py-4 rounded-2xl border-4 border-black shadow-brutal uppercase tracking-wider flex items-center justify-center gap-3 transition transform hover:-translate-y-0.5 active:translate-y-0.5"
              >
                <Play className="w-7 h-7 fill-white" />
                ROZPOCZNIJ MARILYN MONROE!
              </button>
              <p className="text-center text-xs text-purple-200 mt-2">
                Baza zawiera <strong>{MARILYN_CARDS.length} zbalansowanych postaci</strong> ze świata filmu, muzyki, historii i popkultury!
              </p>
            </div>
          </div>

          {/* PRAWA KOLUMNA: Ustawienia */}
          <div className="lg:col-span-3 bg-[#1E1242] border-4 border-black rounded-3xl p-5 shadow-brutal space-y-4">
            <h3 className="font-black text-lg uppercase flex items-center gap-2 text-party-yellow">
              <Sliders className="w-5 h-5" /> Ustawienia Gry
            </h3>

            <div>
              <label className="text-xs uppercase font-bold text-purple-200 block mb-1.5">
                Format rozgrywki:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['TEAMS', 'FFA'] as ScoringFormat[]).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => updateSettings({ scoringFormat: fmt })}
                    className={`py-2 px-3 rounded-xl font-black text-xs uppercase border-2 border-black transition ${
                      gameState.settings.scoringFormat === fmt
                        ? 'bg-party-yellow text-black shadow-brutal-sm'
                        : 'bg-black/40 text-gray-300'
                    }`}
                  >
                    {fmt === 'TEAMS' ? 'Drużynowy' : '1 vs Wszyscy'}
                  </button>
                ))}
              </div>
            </div>

            {gameState.settings.scoringFormat === 'TEAMS' && (
              <div>
                <label className="text-xs uppercase font-bold text-purple-200 block mb-1.5">
                  Liczba drużyn:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[2, 3].map((cnt) => (
                    <button
                      key={cnt}
                      onClick={() =>
                        updateSettings({ teamCount: cnt as 2 | 3 })
                      }
                      className={`py-2 rounded-xl font-black text-xs uppercase border-2 border-black transition ${
                        gameState.settings.teamCount === cnt
                          ? 'bg-party-orange text-black shadow-brutal-sm'
                          : 'bg-black/40 text-gray-300'
                      }`}
                    >
                      {cnt} Drużyny
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="text-xs uppercase font-bold text-purple-200 block mb-1.5">
                Czas rundy:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {([60, 90, 120] as const).map((sec) => (
                  <button
                    key={sec}
                    onClick={() => updateSettings({ roundDuration: sec })}
                    className={`py-2 rounded-xl font-black text-xs uppercase border-2 border-black transition ${
                      gameState.settings.roundDuration === sec
                        ? 'bg-party-green text-black shadow-brutal-sm'
                        : 'bg-black/40 text-gray-300'
                    }`}
                  >
                    {sec} sek
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs uppercase font-bold text-purple-200 block mb-1.5">
                Liczba kolejek:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[2, 3, 5].map((r) => (
                  <button
                    key={r}
                    onClick={() => updateSettings({ totalRounds: r })}
                    className={`py-2 rounded-xl font-black text-xs uppercase border-2 border-black transition ${
                      gameState.settings.totalRounds === r
                        ? 'bg-party-blue text-black shadow-brutal-sm'
                        : 'bg-black/40 text-gray-300'
                    }`}
                  >
                    {r} rundy
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs uppercase font-bold text-purple-200 block mb-1.5">
                Maksymalna liczba Pasów:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    onClick={() => updateSettings({ maxPassesPerRound: p })}
                    className={`py-2 rounded-xl font-black text-xs uppercase border-2 border-black transition ${
                      gameState.settings.maxPassesPerRound === p
                        ? 'bg-party-purple text-white shadow-brutal-sm'
                        : 'bg-black/40 text-gray-300'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* FAZA 2: PRZED RUNDĄ (ZAPOWIEDŹ OPISUJĄCEGO)                              */}
      {/* ========================================================================= */}
      {gameState.phase === 'ROLE_SELECTION' && (
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center my-6">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1E1242] border-4 border-black rounded-3xl p-8 max-w-2xl w-full shadow-brutal"
          >
            <div className="inline-block bg-party-red text-white font-black text-xs uppercase px-4 py-1.5 rounded-full border-2 border-black mb-4">
              Runda {gameState.currentRoundNumber} z {gameState.settings.totalRounds} • Zmiana ról
            </div>

            {gameState.settings.scoringFormat === 'TEAMS' && activeTeam && (
              <div
                className="text-lg font-black uppercase mb-2 flex items-center justify-center gap-2"
                style={{ color: activeTeam.color }}
              >
                <span>{activeTeam.icon}</span>
                <span>Teraz zgaduje: {activeTeam.name}</span>
              </div>
            )}

            <h2 className="text-3xl md:text-4xl font-black uppercase mb-6">
              Czas na Opisującego!
            </h2>

            <div className="bg-black/50 border-4 border-party-red rounded-3xl p-6 mb-6 flex flex-col items-center">
              <div className="text-6xl mb-3">{activeSpeaker?.avatar || '🎭'}</div>
              <div className="text-3xl font-black text-party-yellow">
                {activeSpeaker?.name || 'Wybrany Gracz'}
              </div>
              <p className="text-sm text-purple-200 mt-2 max-w-md">
                Spójrz na swój telefon! Za chwilę zobaczysz postać oraz 3 zakazane słowa. Drużyna przeciwna czuwa z palcem na czerwonym przycisku Tabu!
              </p>
            </div>

            <button
              onClick={handleStartRoundNow}
              className="w-full bg-party-green hover:bg-emerald-400 text-black font-black text-2xl py-4 rounded-2xl border-4 border-black shadow-brutal uppercase tracking-wider transition transform hover:-translate-y-0.5"
            >
              STARTUJEMY ZEGAR! ({gameState.settings.roundDuration}s)
            </button>
          </motion.div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* FAZA 3: AKTYWNA RUNDA (UKRYTE HASŁO NA TV!)                              */}
      {/* ========================================================================= */}
      {gameState.phase === 'ROUND_ACTIVE' && (
        <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 my-4 items-stretch">
          {/* LEWA STRONA: Scena główna TV */}
          <div className="lg:col-span-8 bg-[#1E1242] border-4 border-black rounded-3xl p-6 shadow-brutal flex flex-col justify-between relative overflow-hidden">
            {/* Pasek górny rundy */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 bg-black/50 border-2 border-black px-4 py-2 rounded-2xl">
                <span className="text-3xl">{activeSpeaker?.avatar || '🎭'}</span>
                <div>
                  <div className="text-xs uppercase text-purple-300 font-bold">
                    Opisuje:
                  </div>
                  <div className="text-lg font-black text-party-yellow">
                    {activeSpeaker?.name}
                  </div>
                </div>
              </div>

              <div className="bg-party-purple border-3 border-black px-4 py-2 rounded-2xl shadow-brutal-sm text-center">
                <div className="text-[11px] uppercase font-bold text-purple-200">
                  Kategoria Postaci:
                </div>
                <div className="text-base md:text-lg font-black uppercase">
                  {gameState.currentCard?.category || 'Postać'}
                </div>
              </div>

              <button
                onClick={() => dispatch({ type: 'HOST_TOGGLE_PAUSE' })}
                className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl border-2 border-black text-xs font-bold uppercase flex items-center gap-1.5"
              >
                <Pause className="w-4 h-4" />
                {gameState.isPaused ? 'Wznów' : 'Pauza'}
              </button>
            </div>

            {/* ŚRODEK: Wielki Zegar TV + Dyskretna Karta */}
            <div className="my-6 flex flex-col items-center justify-center text-center">
              <motion.div
                key={gameState.timeLeft}
                initial={{ scale: gameState.timeLeft <= 15 ? 1.25 : 1.05 }}
                animate={{ scale: 1 }}
                className={`w-44 h-44 md:w-52 md:h-52 rounded-full border-8 border-black shadow-brutal flex flex-col items-center justify-center transition-colors ${
                  gameState.timeLeft <= 15
                    ? 'bg-party-red text-white animate-pulse-fast'
                    : 'bg-party-yellow text-black'
                }`}
              >
                <Clock className="w-7 h-7 mb-1" />
                <span className="text-6xl md:text-7xl font-black leading-none">
                  {gameState.timeLeft}
                </span>
                <span className="text-xs font-black uppercase mt-1">
                  sekund
                </span>
              </motion.div>

              <div className="mt-6 bg-black/60 border-3 border-dashed border-party-red rounded-2xl px-6 py-4 max-w-lg w-full">
                <div className="flex items-center justify-center gap-2 text-xs uppercase font-bold text-party-red tracking-widest mb-1">
                  <EyeOff className="w-4 h-4" /> POSTAĆ I 3 SŁOWA TABU WIDOCZNE TYLKO NA TELEFONACH
                </div>
                <div className="text-lg md:text-xl font-black text-white">
                  Zgadujcie na głos! Przeciwnicy pilnują zakazanych słów!
                </div>
                <div className="text-xs text-gray-300 mt-1">
                  Pozostałe PASY:{' '}
                  <strong className="text-party-orange">
                    {gameState.passesRemaining}
                  </strong>
                </div>
              </div>
            </div>

            {/* Dolny pasek: Bilans rundy */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase font-bold text-purple-200">
                  Bilans bieżącej rundy:
                </span>
                <span
                  className={`text-2xl font-black px-3 py-1 rounded-xl border-2 border-black ${
                    gameState.roundScoreDelta >= 0
                      ? 'bg-party-green text-black'
                      : 'bg-party-red text-white'
                  }`}
                >
                  {gameState.roundScoreDelta >= 0
                    ? `+${gameState.roundScoreDelta}`
                    : gameState.roundScoreDelta}{' '}
                  pkt
                </span>
              </div>
            </div>

            {/* ALARM ZŁAMANEGO TABU (SCREEN SHAKE OVERLAY) */}
            <AnimatePresence>
              {gameState.lastTabooAlert &&
                Date.now() - gameState.lastTabooAlert.timestamp < 3000 && (
                  <motion.div
                    key={gameState.lastTabooAlert.id}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="absolute inset-4 bg-party-red/95 border-8 border-black rounded-3xl z-30 flex flex-col items-center justify-center text-center p-6 shadow-brutal-lg"
                  >
                    <AlertTriangle className="w-20 h-20 text-party-yellow mb-2 animate-bounce" />
                    <h2 className="text-4xl md:text-6xl font-black uppercase text-white drop-shadow-[0_4px_0_rgba(0,0,0,1)]">
                      ZŁAMANE TABU!
                    </h2>
                    <p className="text-xl md:text-2xl font-black text-party-yellow mt-3">
                      {gameState.lastTabooAlert.caughtByAvatar}{' '}
                      {gameState.lastTabooAlert.caughtByPlayerName} przyłapał(a) Opisującego!
                    </p>
                    <div className="mt-3 bg-black text-white font-black px-5 py-2 rounded-2xl border-2 border-party-yellow text-sm md:text-base">
                      Spalona postać: „{gameState.lastTabooAlert.cardName}” • Kara: -{gameState.settings.tabooPenaltySeconds}s i -{gameState.settings.tabooPenaltyPoints} pkt!
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>
          </div>

          {/* PRAWA STRONA: Wyniki na żywo i Przebieg rundy */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-[#1E1242] border-4 border-black rounded-3xl p-5 shadow-brutal">
              <h3 className="font-black text-base uppercase text-party-yellow mb-3 flex items-center gap-2">
                <Trophy className="w-5 h-5" /> Tabela Wyników
              </h3>
              {gameState.settings.scoringFormat === 'TEAMS' ? (
                <div className="space-y-2.5">
                  {gameState.teams.map((t, idx) => (
                    <div
                      key={t.id}
                      className={`flex items-center justify-between p-3 rounded-2xl border-3 border-black ${
                        idx === gameState.activeTeamIndex
                          ? 'bg-white/15 ring-2 ring-party-yellow'
                          : 'bg-black/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{t.icon}</span>
                        <div>
                          <div className="font-black text-sm uppercase">
                            {t.name}
                          </div>
                          {idx === gameState.activeTeamIndex && (
                            <span className="text-[10px] bg-party-yellow text-black font-black px-1.5 py-0.5 rounded uppercase">
                              Teraz gra
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-3xl font-black text-party-green">
                        {t.score}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {[...gameState.players]
                    .sort((a, b) => b.score - a.score)
                    .map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between bg-black/40 px-3 py-2 rounded-xl border-2 border-black"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{p.avatar}</span>
                          <span className="font-bold text-sm">{p.name}</span>
                        </div>
                        <span className="font-black text-lg text-party-yellow">
                          {p.score} pkt
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="bg-[#1E1242] border-4 border-black rounded-3xl p-5 shadow-brutal flex-1 flex flex-col">
              <h3 className="font-black text-base uppercase text-purple-200 mb-3">
                Karty w tej rundzie:
              </h3>
              {gameState.roundLogs.length === 0 ? (
                <p className="text-xs text-gray-400 italic my-auto text-center">
                  Czekamy na pierwsze odgadnięte hasło lub złamanie tabu...
                </p>
              ) : (
                <div className="space-y-2 overflow-y-auto max-h-60 pr-1">
                  {gameState.roundLogs.map((entry) => (
                    <div
                      key={entry.id}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl border-2 border-black text-xs font-bold ${
                        entry.type === 'GUESSED'
                          ? 'bg-party-green/20 border-party-green text-white'
                          : entry.type === 'TABOO_VIOLATION'
                          ? 'bg-party-red/30 border-party-red text-white'
                          : 'bg-white/10 text-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {entry.type === 'GUESSED' ? (
                          <CheckCircle2 className="w-4 h-4 text-party-green shrink-0" />
                        ) : entry.type === 'TABOO_VIOLATION' ? (
                          <XCircle className="w-4 h-4 text-party-red shrink-0" />
                        ) : (
                          <SkipForward className="w-4 h-4 text-party-yellow shrink-0" />
                        )}
                        <div>
                          <span className="font-black">{entry.cardName}</span>
                          {entry.actorName && entry.type === 'TABOO_VIOLATION' && (
                            <span className="block text-[10px] text-red-300">
                              Złapany przez: {entry.actorName}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="font-black">
                        {entry.pointsDelta > 0
                          ? `+${entry.pointsDelta}`
                          : entry.pointsDelta}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* FAZA 4: PODSUMOWANIE RUNDY                                                */}
      {/* ========================================================================= */}
      {gameState.phase === 'ROUND_SUMMARY' && (
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center my-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1E1242] border-4 border-black rounded-3xl p-6 md:p-8 max-w-3xl w-full shadow-brutal"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-xs uppercase font-black bg-party-red text-white px-3 py-1 rounded-full border border-black">
                  Koniec czasu!
                </span>
                <h2 className="text-3xl font-black uppercase mt-2">
                  Podsumowanie tury: {activeSpeaker?.avatar} {activeSpeaker?.name}
                </h2>
              </div>
              <div className="bg-black/50 border-3 border-black px-5 py-3 rounded-2xl text-center">
                <div className="text-xs uppercase text-gray-300 font-bold">
                  Wynik tury:
                </div>
                <div className="text-3xl font-black text-party-green">
                  {gameState.roundScoreDelta >= 0
                    ? `+${gameState.roundScoreDelta}`
                    : gameState.roundScoreDelta}{' '}
                  pkt
                </div>
              </div>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto mb-6">
              {gameState.roundLogs.length === 0 ? (
                <p className="text-center text-gray-400 py-6">
                  W tej turze nie rozstrzygnięto żadnej karty!
                </p>
              ) : (
                gameState.roundLogs.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-black/40 border-2 border-black px-4 py-2.5 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-md font-black text-xs uppercase border border-black ${
                          item.type === 'GUESSED'
                            ? 'bg-party-green text-black'
                            : item.type === 'TABOO_VIOLATION'
                            ? 'bg-party-red text-white'
                            : 'bg-party-yellow text-black'
                        }`}
                      >
                        {item.type === 'GUESSED'
                          ? 'ZGADNIĘTE'
                          : item.type === 'TABOO_VIOLATION'
                          ? 'ZŁAMANE TABU'
                          : 'PAS'}
                      </span>
                      <span className="font-black text-base">{item.cardName}</span>
                      <span className="text-xs text-purple-300">
                        (Tabu: {item.forbidden.join(', ')})
                      </span>
                    </div>
                    <span className="font-black text-lg">
                      {item.pointsDelta > 0
                        ? `+${item.pointsDelta} pkt`
                        : `${item.pointsDelta} pkt`}
                    </span>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={handleNextTurn}
              className="w-full bg-party-yellow hover:bg-yellow-300 text-black font-black text-xl py-4 rounded-2xl border-4 border-black shadow-brutal uppercase tracking-wider transition"
            >
              NASTĘPNA TURA →
            </button>
          </motion.div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* FAZA 5: FINAŁ                                                             */}
      {/* ========================================================================= */}
      {gameState.phase === 'GAME_OVER' && (
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center my-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1E1242] border-4 border-black rounded-3xl p-6 md:p-8 max-w-4xl w-full shadow-brutal text-center"
          >
            <div className="inline-flex items-center gap-2 bg-party-yellow text-black font-black text-xs uppercase px-4 py-1.5 rounded-full border-2 border-black mb-3">
              <Sparkles className="w-4 h-4" /> Wielki Finał Marilyn Monroe!
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-6">
              Podium Zwycięzców
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {(gameState.settings.scoringFormat === 'TEAMS'
                ? [...gameState.teams].sort((a, b) => b.score - a.score)
                : [...gameState.players]
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 3)
                    .map((p) => ({
                      id: p.id,
                      name: p.name,
                      icon: p.avatar,
                      color: '#FFD600',
                      score: p.score,
                    }))
              ).map((entry, idx) => (
                <div
                  key={entry.id}
                  className={`p-5 rounded-3xl border-4 border-black shadow-brutal flex flex-col items-center ${
                    idx === 0
                      ? 'bg-party-yellow text-black md:-translate-y-3'
                      : idx === 1
                      ? 'bg-party-purple text-white'
                      : 'bg-black/50 text-white'
                  }`}
                >
                  <div className="text-xs font-black uppercase mb-1 flex items-center gap-1">
                    {idx === 0 && <Crown className="w-5 h-5" />} #{idx + 1} Miejsce
                  </div>
                  <div className="text-5xl my-2">{entry.icon}</div>
                  <div className="text-xl font-black uppercase">{entry.name}</div>
                  <div className="text-3xl font-black mt-2">{entry.score} pkt</div>
                </div>
              ))}
            </div>

            {/* Nagrody specjalne */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
              <div className="bg-black/40 border-3 border-party-green rounded-2xl p-4">
                <div className="flex items-center gap-2 text-party-green font-black text-xs uppercase mb-1">
                  <Crown className="w-4 h-4" /> Mistrz Omijania Tabu
                </div>
                <div className="text-lg font-black">
                  {bestDescriber ? `${bestDescriber.avatar} ${bestDescriber.name}` : 'Brak'}
                </div>
                <div className="text-xs text-gray-300">
                  Opisane postaci: <strong>{bestDescriber?.stats.cardsDescribed || 0}</strong>
                </div>
              </div>

              <div className="bg-black/40 border-3 border-party-red rounded-2xl p-4">
                <div className="flex items-center gap-2 text-party-red font-black text-xs uppercase mb-1">
                  <Flame className="w-4 h-4" /> Wpadkowicz Roku
                </div>
                <div className="text-lg font-black">
                  {biggestTabooBreaker ? `${biggestTabooBreaker.avatar} ${biggestTabooBreaker.name}` : 'Brak'}
                </div>
                <div className="text-xs text-gray-300">
                  Złamał tabu: <strong>{biggestTabooBreaker?.stats.tabooViolationsAsDescriber || 0} razy</strong>
                </div>
              </div>

              <div className="bg-black/40 border-3 border-party-blue rounded-2xl p-4">
                <div className="flex items-center gap-2 text-party-blue font-black text-xs uppercase mb-1">
                  <ShieldAlert className="w-4 h-4" /> Bezwzględny Cenzor
                </div>
                <div className="text-lg font-black">
                  {chiefCensor ? `${chiefCensor.avatar} ${chiefCensor.name}` : 'Brak'}
                </div>
                <div className="text-xs text-gray-300">
                  Przyłapał przeciwników: <strong>{chiefCensor?.stats.tabooCaughtCount || 0} razy</strong>
                </div>
              </div>
            </div>

            <button
              onClick={handlePlayAgain}
              className="bg-party-green hover:bg-emerald-400 text-black font-black text-xl px-8 py-4 rounded-2xl border-4 border-black shadow-brutal uppercase inline-flex items-center gap-2 transition"
            >
              <RotateCcw className="w-6 h-6" /> ZAGRAJ PONOWNIE
            </button>
          </motion.div>
        </main>
      )}
    </motion.div>
  );
}
