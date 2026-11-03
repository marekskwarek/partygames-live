'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Check,
  SkipForward,
  AlertOctagon,
  Clock,
  RotateCcw,
  Play,
  Lightbulb,
  Sparkles,
  Sofa,
  ArrowLeft,
} from 'lucide-react';
import { DEFAULT_TEAMS, INITIAL_WORDS } from '@/games/gra-na-p/words';
import { MARILYN_CARDS, type MarilynCard } from '@/games/marilyn-monroe/cards';
import type { WordItem } from '@/games/gra-na-p/types';
import { soundEngine } from '@/core/sound';

type CouchGameType = 'GRA_NA_P' | 'MARILYN_MONROE';
type CouchPhase = 'SELECT_GAME' | 'LOBBY' | 'PASS_PHONE' | 'ROUND_ACTIVE' | 'ROUND_SUMMARY' | 'GAME_OVER';

interface CouchTeam {
  id: string;
  name: string;
  icon: string;
  color: string;
  score: number;
}

interface CouchHistoryEntry {
  title: string;
  subtitle?: string;
  status: 'GUESSED' | 'PASS' | 'FOUL';
}

interface CouchModeProps {
  onBackToMenu: () => void;
}

export default function CouchMode({ onBackToMenu }: CouchModeProps) {
  const [selectedGame, setSelectedGame] = useState<CouchGameType>('GRA_NA_P');
  const [phase, setPhase] = useState<CouchPhase>('SELECT_GAME');

  const [roundDuration, setRoundDuration] = useState<60 | 90 | 120>(60);
  const [totalRounds, setTotalRounds] = useState<number>(3);
  const [teams, setTeams] = useState<CouchTeam[]>(
    DEFAULT_TEAMS.slice(0, 2).map((t) => ({ ...t, score: 0 }))
  );

  const [currentRound, setCurrentRound] = useState(1);
  const [activeTeamIdx, setActiveTeamIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [passesLeft, setPassesLeft] = useState(2);

  // Stan dla Gry na P
  const [usedWordIds, setUsedWordIds] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<WordItem | null>(null);
  const [showHint, setShowHint] = useState(false);

  // Stan dla Marilyn Monroe
  const [usedCardIds, setUsedCardIds] = useState<string[]>([]);
  const [currentCard, setCurrentCard] = useState<MarilynCard | null>(null);

  const [roundHistory, setRoundHistory] = useState<CouchHistoryEntry[]>([]);
  const [shake, setShake] = useState(false);

  // Losowanie hasła do Gry na P
  const drawNextWord = (currentUsed: string[]) => {
    let available = INITIAL_WORDS.filter((w) => !currentUsed.includes(w.id));
    let nextUsed = [...currentUsed];
    if (available.length === 0) {
      available = INITIAL_WORDS;
      nextUsed = [];
    }
    const chosen = available[Math.floor(Math.random() * available.length)];
    nextUsed.push(chosen.id);
    setUsedWordIds(nextUsed);
    setCurrentWord(chosen);
    setShowHint(false);
  };

  // Losowanie karty do Marilyn Monroe
  const drawNextCard = (currentUsed: string[]) => {
    let available = MARILYN_CARDS.filter((c) => !currentUsed.includes(c.id));
    let nextUsed = [...currentUsed];
    if (available.length === 0) {
      available = MARILYN_CARDS;
      nextUsed = [];
    }
    const chosen = available[Math.floor(Math.random() * available.length)];
    nextUsed.push(chosen.id);
    setUsedCardIds(nextUsed);
    setCurrentCard(chosen);
  };

  const drawNextItem = () => {
    if (selectedGame === 'GRA_NA_P') {
      drawNextWord(usedWordIds);
    } else {
      drawNextCard(usedCardIds);
    }
  };

  // Zegar rundy
  useEffect(() => {
    if (phase !== 'ROUND_ACTIVE') return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          soundEngine.playRoundEnd();
          setPhase('ROUND_SUMMARY');
          return 0;
        }
        const next = prev - 1;
        soundEngine.playTick(next <= 10);
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  // Efekt konfetti na koniec gry
  useEffect(() => {
    if (phase === 'GAME_OVER') {
      soundEngine.playFanfare();
      confetti({ particleCount: 100, spread: 75, origin: { y: 0.6 } });
    }
  }, [phase]);

  const startGameLobby = (gameType: CouchGameType) => {
    setSelectedGame(gameType);
    setTeams((prev) => prev.map((t) => ({ ...t, score: 0 })));
    setCurrentRound(1);
    setActiveTeamIdx(0);
    setPhase('LOBBY');
  };

  const startCouchGame = () => {
    setTeams((prev) => prev.map((t) => ({ ...t, score: 0 })));
    setCurrentRound(1);
    setActiveTeamIdx(0);
    setPhase('PASS_PHONE');
  };

  const startTurn = () => {
    soundEngine.playRoundStart();
    setTimeLeft(roundDuration);
    setPassesLeft(2);
    setRoundHistory([]);
    drawNextItem();
    setPhase('ROUND_ACTIVE');
  };

  const handleGuessed = () => {
    soundEngine.playSuccess();
    setTeams((prev) =>
      prev.map((t, idx) =>
        idx === activeTeamIdx ? { ...t, score: t.score + 1 } : t
      )
    );

    const title = selectedGame === 'GRA_NA_P' ? currentWord?.word || '' : currentCard?.name || '';
    setRoundHistory((prev) => [
      { title, status: 'GUESSED' },
      ...prev,
    ]);

    drawNextItem();
  };

  const handlePass = () => {
    if (passesLeft <= 0) return;
    soundEngine.playPass();
    setPassesLeft((prev) => prev - 1);

    const title = selectedGame === 'GRA_NA_P' ? currentWord?.word || '' : currentCard?.name || '';
    setRoundHistory((prev) => [
      { title, status: 'PASS' },
      ...prev,
    ]);

    drawNextItem();
  };

  const handleFoul = () => {
    soundEngine.playBuzzer();
    setShake(true);
    setTimeout(() => setShake(false), 600);

    setTeams((prev) =>
      prev.map((t, idx) =>
        idx === activeTeamIdx
          ? { ...t, score: Math.max(0, t.score - 1) }
          : t
      )
    );

    const title = selectedGame === 'GRA_NA_P' ? currentWord?.word || '' : currentCard?.name || '';
    const subtitle = selectedGame === 'MARILYN_MONROE' ? currentCard?.forbidden.join(', ') : undefined;

    setRoundHistory((prev) => [
      { title, subtitle, status: 'FOUL' },
      ...prev,
    ]);

    setTimeLeft((prev) => {
      const next = Math.max(0, prev - 10);
      if (next === 0) {
        soundEngine.playRoundEnd();
        setPhase('ROUND_SUMMARY');
      }
      return next;
    });

    drawNextItem();
  };

  const handleNextTeam = () => {
    const nextIdx = activeTeamIdx + 1;
    if (nextIdx < teams.length) {
      setActiveTeamIdx(nextIdx);
      setPhase('PASS_PHONE');
    } else {
      if (currentRound >= totalRounds) {
        setPhase('GAME_OVER');
      } else {
        setCurrentRound((r) => r + 1);
        setActiveTeamIdx(0);
        setPhase('PASS_PHONE');
      }
    }
  };

  const activeTeam = teams[activeTeamIdx];

  return (
    <motion.div
      animate={shake ? { x: [0, -16, 16, -12, 12, 0] } : { x: 0 }}
      className="min-h-screen bg-[#120A2A] text-white p-4 flex flex-col justify-between max-w-lg mx-auto"
    >
      {/* NAGŁÓWEK */}
      <header className="bg-[#1E1242] border-4 border-black rounded-2xl px-4 py-3 shadow-brutal flex items-center justify-between">
        <button
          onClick={phase === 'SELECT_GAME' ? onBackToMenu : () => setPhase('SELECT_GAME')}
          className="bg-white/10 hover:bg-white/20 text-xs font-black px-3 py-1.5 rounded-xl border-2 border-black flex items-center gap-1 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> {phase === 'SELECT_GAME' ? 'Menu' : 'Zmień grę'}
        </button>

        <div className="flex items-center gap-2">
          <Sofa className="w-5 h-5 text-party-orange" />
          <span className="font-black uppercase text-xs sm:text-sm">
            Tryb Kanapowy (1 Telefon)
          </span>
        </div>

        {phase !== 'SELECT_GAME' && (
          <span className="text-xs font-black bg-party-yellow text-black px-2.5 py-1 rounded-lg border border-black">
            Runda {currentRound}/{totalRounds}
          </span>
        )}
      </header>

      {/* ========================================================================= */}
      {/* 1. WYBÓR GRY W TRYBIE KANAPOWYM                                           */}
      {/* ========================================================================= */}
      {phase === 'SELECT_GAME' && (
        <main className="my-auto space-y-5">
          <div className="bg-[#1E1242] border-4 border-black rounded-3xl p-6 shadow-brutal text-center">
            <span className="bg-party-orange text-black font-black text-xs uppercase px-3 py-1 rounded-full border border-black inline-block mb-3">
              Pass & Play • Offline (1 Smartfon)
            </span>
            <h1 className="text-3xl font-black uppercase">Wybierz grę na kanapę</h1>
            <p className="text-xs text-purple-200 mt-2 leading-relaxed">
              Nie potrzebujecie telewizora ani Wi-Fi! Podawajcie sobie jeden telefon z rąk do rąk między drużynami:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* Opcja 1: Gra na P */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => startGameLobby('GRA_NA_P')}
              className="bg-party-yellow text-black border-4 border-black rounded-3xl p-5 shadow-brutal text-left flex items-start justify-between transition group"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-3xl">🅿️</span>
                  <h2 className="text-2xl font-black uppercase">Gra na P</h2>
                </div>
                <p className="text-xs font-bold text-black/80 mt-1 leading-snug">
                  Opisuj hasła używając <strong className="underline">wyłącznie słów na literę „P”</strong>. Rywal siedzący obok czuwa nad przyciskiem błędu!
                </p>
                <div className="mt-3 inline-block bg-black text-party-yellow text-[11px] font-black uppercase px-3 py-1 rounded-lg">
                  1000 haseł • Komedia
                </div>
              </div>
            </motion.button>

            {/* Opcja 2: Marilyn Monroe (Tabu) */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => startGameLobby('MARILYN_MONROE')}
              className="bg-[#1E1242] border-4 border-black rounded-3xl p-5 shadow-brutal text-left flex items-start justify-between transition group hover:bg-[#271854]"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-3xl">💋</span>
                  <h2 className="text-2xl font-black uppercase text-party-red">Marilyn Monroe</h2>
                </div>
                <p className="text-xs text-purple-200 mt-1 leading-snug font-medium">
                  Dynamiczna gra w Tabu! Opisuj znane postaci z <strong className="text-party-yellow font-bold">bezwzględnym zakazem 3 słów kluczowych</strong>. Rywal pilnuje zakazanych słów na ekranie!
                </p>
                <div className="mt-3 inline-block bg-party-red text-white text-[11px] font-black uppercase px-3 py-1 rounded-lg border border-black">
                  90 postaci • Tabu
                </div>
              </div>
            </motion.button>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 2. USTAWIENIA ROZGRYWKI (LOBBY)                                           */}
      {/* ========================================================================= */}
      {phase === 'LOBBY' && (
        <main className="my-auto bg-[#1E1242] border-4 border-black rounded-3xl p-6 shadow-brutal space-y-5">
          <div className="text-center">
            <span
              className={`font-black text-xs uppercase px-3 py-1 rounded-full border border-black inline-block mb-1 text-black ${
                selectedGame === 'GRA_NA_P' ? 'bg-party-yellow' : 'bg-party-red text-white'
              }`}
            >
              {selectedGame === 'GRA_NA_P' ? '🅿️ Gra na P' : '💋 Marilyn Monroe (Tabu)'}
            </span>
            <h2 className="text-2xl font-black uppercase mt-1">Konfiguracja</h2>
          </div>

          <div>
            <label className="text-xs font-black uppercase text-purple-200 block mb-2">
              Liczba drużyn:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[2, 3].map((cnt) => (
                <button
                  key={cnt}
                  onClick={() =>
                    setTeams(
                      DEFAULT_TEAMS.slice(0, cnt).map((t) => ({
                        ...t,
                        score: 0,
                      }))
                    )
                  }
                  className={`py-3 rounded-2xl font-black text-sm uppercase border-3 border-black transition ${
                    teams.length === cnt
                      ? 'bg-party-yellow text-black shadow-brutal-sm'
                      : 'bg-black/40 text-white'
                  }`}
                >
                  {cnt} Drużyny
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase text-purple-200 block mb-2">
              Czas tury drużyny:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {([60, 90, 120] as const).map((sec) => (
                <button
                  key={sec}
                  onClick={() => setRoundDuration(sec)}
                  className={`py-3 rounded-2xl font-black text-sm uppercase border-3 border-black transition ${
                    roundDuration === sec
                      ? 'bg-party-green text-black shadow-brutal-sm'
                      : 'bg-black/40 text-white'
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase text-purple-200 block mb-2">
              Liczba rund / kolejek:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[2, 3, 5].map((r) => (
                <button
                  key={r}
                  onClick={() => setTotalRounds(r)}
                  className={`py-2.5 rounded-2xl font-black text-sm uppercase border-3 border-black transition ${
                    totalRounds === r
                      ? 'bg-party-blue text-black shadow-brutal-sm'
                      : 'bg-black/40 text-white'
                  }`}
                >
                  {r} kolejki
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startCouchGame}
            className="w-full bg-party-green hover:bg-emerald-400 text-black font-black text-xl py-4 rounded-2xl border-4 border-black shadow-brutal uppercase flex items-center justify-center gap-2 transition active:translate-y-1"
          >
            <Play className="w-6 h-6 fill-black" /> ROZPOCZNIJ ROZGRYWKĘ!
          </button>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 3. EKRAN BEZPIECZEŃSTWA: PRZEKAŻ TELEFON                                  */}
      {/* ========================================================================= */}
      {phase === 'PASS_PHONE' && activeTeam && (
        <main className="my-auto bg-[#1E1242] border-4 border-black rounded-3xl p-6 shadow-brutal text-center space-y-5">
          <div className="text-6xl">{activeTeam.icon}</div>
          <div>
            <span className="text-xs uppercase font-black text-party-yellow">
              Przekażcie telefon drużynie:
            </span>
            <h2 className="text-3xl font-black uppercase mt-1">
              {activeTeam.name}
            </h2>
          </div>

          <div className="bg-black/50 border-2 border-party-yellow rounded-2xl p-4 text-xs text-purple-100 text-left space-y-2">
            <p>
              👥 <strong>Ustawienie przy telefonie:</strong>
            </p>
            {selectedGame === 'GRA_NA_P' ? (
              <p>
                Opisujący trzyma telefon tak, by jego drużyna nie widziała ekranu. Osoba z drużyny przeciwnej może siedzieć obok i czuwać nad czerwonym przyciskiem błędu!
              </p>
            ) : (
              <p>
                Opisujący widzi postać i 3 zakazane słowa. Osoba z drużyny przeciwnej siedzi obok, patrzy na te same 3 słowa i trzyma palec na przycisku <strong>ZŁAMAŁ TABU!</strong>
              </p>
            )}
          </div>

          <button
            onClick={startTurn}
            className="w-full bg-party-yellow hover:bg-yellow-300 text-black font-black text-xl py-5 rounded-2xl border-4 border-black shadow-brutal uppercase active:translate-y-1 transition"
          >
            MAMY TELEFON – POKAŻ HASŁO! 🚀
          </button>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 4. AKTYWNA RUNDA NA TELEFONIE                                             */}
      {/* ========================================================================= */}
      {phase === 'ROUND_ACTIVE' && (
        <main className="flex-1 flex flex-col justify-between my-2 gap-3">
          {/* Belka z zegarem i drużyną */}
          <div className="flex items-center justify-between bg-[#1E1242] border-3 border-black rounded-2xl p-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{activeTeam?.icon}</span>
              <span className="font-black text-sm uppercase">
                {activeTeam?.name}
              </span>
            </div>
            <div
              className={`px-4 py-1.5 rounded-xl border-2 border-black font-black text-2xl flex items-center gap-1.5 ${
                timeLeft <= 10
                  ? 'bg-party-red text-white animate-pulse'
                  : 'bg-party-yellow text-black'
              }`}
            >
              <Clock className="w-5 h-5" />
              {timeLeft}s
            </div>
          </div>

          {/* KARTA HASŁA W ZALEŻNOŚCI OD GRY */}
          {selectedGame === 'GRA_NA_P' && currentWord && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentWord.id}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-party-yellow text-black border-4 border-black rounded-3xl p-5 shadow-brutal text-center flex-1 flex flex-col justify-center"
              >
                <span className="mx-auto bg-black text-party-yellow text-xs font-black uppercase px-3 py-1 rounded-full mb-2">
                  {currentWord.category}
                </span>
                <div className="text-[11px] font-bold text-black/70 uppercase">
                  Opisz wyłącznie słowami na literę „P”:
                </div>
                <h2 className="text-3xl sm:text-4xl font-black uppercase my-2">
                  {currentWord.word}
                </h2>

                {currentWord.pHint && (
                  <div className="mt-2">
                    {!showHint ? (
                      <button
                        onClick={() => setShowHint(true)}
                        className="inline-flex items-center gap-1 bg-black/15 px-3 py-1.5 rounded-xl text-xs font-black border border-black/30"
                      >
                        <Lightbulb className="w-3.5 h-3.5" /> Pokaż trop na P
                      </button>
                    ) : (
                      <div className="bg-white/85 border-2 border-black rounded-xl p-2 text-xs font-bold text-left">
                        💡 {currentWord.pHint}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {selectedGame === 'MARILYN_MONROE' && currentCard && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCard.id}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-party-yellow text-black border-4 border-black rounded-3xl p-5 shadow-brutal text-center flex-1 flex flex-col justify-center"
              >
                <span className="mx-auto bg-black text-party-yellow text-xs font-black uppercase px-3 py-1 rounded-full mb-1">
                  {currentCard.category}
                </span>
                <div className="text-[11px] font-bold text-black/70 uppercase">
                  Opisz postać (nie używaj słów z czerwonej ramki!):
                </div>
                <h2 className="text-3xl sm:text-4xl font-black uppercase my-2">
                  {currentCard.name}
                </h2>

                <div className="mt-2 bg-party-red border-3 border-black rounded-2xl p-2.5 text-white">
                  <div className="text-[10px] font-black uppercase tracking-wider mb-1">
                    ❌ 3 ZAKAZANE SŁOWA (TABU):
                  </div>
                  <div className="space-y-1">
                    {currentCard.forbidden.map((word, idx) => (
                      <div
                        key={idx}
                        className="bg-black/40 border border-white/20 rounded-lg py-0.5 px-2 font-black text-xs uppercase text-party-yellow"
                      >
                        ❌ {word}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* PRZYCISKI STEROWANIA W GRZE */}
          <div className="space-y-2">
            <button
              onClick={handleGuessed}
              className="w-full bg-party-green active:scale-95 text-black font-black text-2xl py-5 rounded-3xl border-4 border-black shadow-brutal uppercase flex items-center justify-center gap-2 transition"
            >
              <Check className="w-7 h-7 stroke-[3]" /> ZGADNIĘTE! (+1 PKT)
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                disabled={passesLeft <= 0}
                onClick={handlePass}
                className={`py-3.5 rounded-2xl border-4 border-black font-black text-xs sm:text-sm uppercase flex flex-col items-center justify-center transition ${
                  passesLeft > 0
                    ? 'bg-party-orange text-black shadow-brutal-sm active:scale-95'
                    : 'bg-gray-700 text-gray-400 opacity-50 cursor-not-allowed'
                }`}
              >
                <SkipForward className="w-5 h-5 mb-0.5" />
                PAS ({passesLeft}/2)
              </button>

              <button
                onClick={handleFoul}
                className="py-3.5 rounded-2xl bg-party-red active:scale-95 text-white border-4 border-black shadow-brutal-sm font-black text-xs sm:text-sm uppercase flex flex-col items-center justify-center transition"
              >
                <AlertOctagon className="w-5 h-5 text-party-yellow mb-0.5" />
                {selectedGame === 'GRA_NA_P' ? 'BŁĄD NIE-P! (-10s)' : 'ZŁAMAŁ TABU! (-10s)'}
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 5. PODSUMOWANIE TURY                                                      */}
      {/* ========================================================================= */}
      {phase === 'ROUND_SUMMARY' && (
        <main className="my-auto bg-[#1E1242] border-4 border-black rounded-3xl p-6 shadow-brutal space-y-4">
          <h2 className="text-2xl font-black uppercase text-center text-party-yellow">
            Koniec czasu: {activeTeam?.name}!
          </h2>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {roundHistory.map((h, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-black/40 px-3 py-2 rounded-xl border border-black text-xs font-bold"
              >
                <div>
                  <span className="block font-black">{h.title}</span>
                  {h.subtitle && <span className="text-[10px] text-red-300">Tabu: {h.subtitle}</span>}
                </div>
                <span
                  className={
                    h.status === 'GUESSED'
                      ? 'text-party-green font-black'
                      : h.status === 'FOUL'
                      ? 'text-party-red font-black'
                      : 'text-party-yellow font-black'
                  }
                >
                  {h.status === 'GUESSED'
                    ? '+1 PKT'
                    : h.status === 'FOUL'
                    ? 'WPADKA (-1)'
                    : 'PAS'}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-3 space-y-2">
            <div className="text-xs uppercase font-black text-purple-200">
              Aktualna tabela wyników:
            </div>
            {teams.map((t) => (
              <div
                key={t.id}
                className="flex justify-between items-center bg-black/50 px-4 py-2 rounded-xl border-2 border-black"
              >
                <span className="font-black text-sm">
                  {t.icon} {t.name}
                </span>
                <span className="font-black text-xl text-party-green">
                  {t.score} pkt
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={handleNextTeam}
            className="w-full bg-party-yellow hover:bg-yellow-300 text-black font-black text-lg py-4 rounded-2xl border-4 border-black shadow-brutal uppercase transition active:translate-y-1"
          >
            KOLEJNA DRUŻYNA →
          </button>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 6. FINAŁ                                                                  */}
      {/* ========================================================================= */}
      {phase === 'GAME_OVER' && (
        <main className="my-auto bg-[#1E1242] border-4 border-black rounded-3xl p-6 shadow-brutal text-center space-y-5">
          <Sparkles className="w-12 h-12 text-party-yellow mx-auto" />
          <h2 className="text-3xl font-black uppercase">Koniec Gry!</h2>
          <div className="space-y-3">
            {[...teams]
              .sort((a, b) => b.score - a.score)
              .map((t, idx) => (
                <div
                  key={t.id}
                  className={`p-4 rounded-2xl border-3 border-black flex items-center justify-between ${
                    idx === 0
                      ? 'bg-party-yellow text-black font-black'
                      : 'bg-black/40 text-white'
                  }`}
                >
                  <span className="text-lg font-black">
                    #{idx + 1} {t.icon} {t.name}
                  </span>
                  <span className="text-2xl font-black">{t.score} pkt</span>
                </div>
              ))}
          </div>
          <button
            onClick={() => setPhase('SELECT_GAME')}
            className="w-full bg-party-green text-black font-black text-lg py-4 rounded-2xl border-4 border-black shadow-brutal uppercase flex items-center justify-center gap-2 transition"
          >
            <RotateCcw className="w-5 h-5" /> ZAGRAJ JESZCZE RAZ
          </button>
        </main>
      )}

      <footer className="text-center text-xs text-purple-300/60 py-2 font-bold">
        Tryb Kanapowy • PartyGames Hub
      </footer>
    </motion.div>
  );
}
