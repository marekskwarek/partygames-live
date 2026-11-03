'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { QRCodeSVG } from 'qrcode.react';
import {
  Volume2,
  VolumeX,
  Users,
  Clock,
  Trophy,
  AlertTriangle,
  Plus,
  Play,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  Crown,
  Flame,
  UserPlus,
  Sliders,
  CheckCircle2,
  XCircle,
  SkipForward,
  Pause,
  Smartphone,
} from 'lucide-react';
import {
  ALL_CATEGORIES,
  AVATARS,
  DEFAULT_TEAMS,
  INITIAL_WORDS,
} from '@/data/words';
import {
  ClientToHostMessage,
  Difficulty,
  GameState,
  ScoringFormat,
  WordCategory,
  WordItem,
} from '@/types/game';
import {
  createInitialGameState,
  PartyNetworkHost,
  pickNextSpeaker,
  pickNextWord,
  processClientMessageOnHost,
} from '@/lib/gameEngine';
import { soundEngine } from '@/lib/sound';

interface HostScreenProps {
  initialRoomCode: string;
  onBackToMenu?: () => void;
  embeddedInSimulator?: boolean;
  onRoomCodeReady?: (code: string) => void;
}

export default function HostScreen({
  initialRoomCode,
  onBackToMenu,
  embeddedInSimulator = false,
  onRoomCodeReady,
}: HostScreenProps) {
  const [gameState, setGameState] = useState<GameState>(() =>
    createInitialGameState(initialRoomCode)
  );
  const [isMuted, setIsMuted] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [customWordInput, setCustomWordInput] = useState('');
  const [customWordHint, setCustomWordHint] = useState('');
  const [joinUrl, setJoinUrl] = useState('');
  const [screenShake, setScreenShake] = useState(false);

  const networkRef = useRef<PartyNetworkHost | null>(null);
  const stateRef = useRef<GameState>(gameState);
  stateRef.current = gameState;

  // Przywracanie stanu Hosta z LocalStorage przy odświeżeniu
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem(`gra-na-p-host-backup-${initialRoomCode}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as GameState;
        if (parsed && parsed.roomCode === initialRoomCode) {
          if (parsed.currentWord && parsed.currentWord.word.includes(' ')) {
            const { word, updatedUsedIds } = pickNextWord(parsed);
            parsed.currentWord = word;
            parsed.usedWordIds = updatedUsedIds;
          }
          setGameState(parsed);
        }
      } catch {
        // ignore
      }
    }
    const origin = window.location.origin;
    setJoinUrl(`${origin}/?join=${initialRoomCode}`);
    onRoomCodeReady?.(initialRoomCode);
  }, [initialRoomCode, onRoomCodeReady]);

  // Inicjalizacja sieci Hosta (PeerJS + BroadcastChannel)
  useEffect(() => {
    const net = new PartyNetworkHost(initialRoomCode, (msg: ClientToHostMessage) => {
      setGameState((prev) => {
        const next = processClientMessageOnHost(prev, msg, (sound) => {
          if (sound === 'BUZZER') {
            soundEngine.playBuzzer();
            setScreenShake(true);
            setTimeout(() => setScreenShake(false), 750);
          } else if (sound === 'SUCCESS') {
            soundEngine.playSuccess();
          } else if (sound === 'PASS') {
            soundEngine.playPass();
          } else if (sound === 'ROUND_START') {
            soundEngine.playRoundStart();
          } else if (sound === 'ROUND_END') {
            soundEngine.playRoundEnd();
          } else if (sound === 'FANFARE') {
            soundEngine.playFanfare();
          }
        });
        return next;
      });
    });

    networkRef.current = net;
    return () => {
      net.destroy();
    };
  }, [initialRoomCode]);

  // Synchronizuj każdą zmianę stanu z podłączonymi kontrolerami i zapisz w LocalStorage
  useEffect(() => {
    networkRef.current?.broadcast({
      type: 'STATE_SYNC',
      payload: { state: gameState },
    });
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(
          `gra-na-p-host-backup-${gameState.roomCode}`,
          JSON.stringify(gameState)
        );
      } catch {
        // ignore
      }
    }
  }, [gameState]);

  // Odliczanie zegara w trakcie aktywnej rundy
  useEffect(() => {
    if (gameState.phase !== 'ROUND_ACTIVE' || gameState.isPaused) return;

    const timer = setInterval(() => {
      setGameState((prev) => {
        if (prev.phase !== 'ROUND_ACTIVE' || prev.isPaused) return prev;

        if (prev.timeLeft <= 1) {
          soundEngine.playRoundEnd();
          return {
            ...prev,
            timeLeft: 0,
            phase: 'ROUND_SUMMARY',
          };
        }

        const nextTime = prev.timeLeft - 1;
        soundEngine.playTick(nextTime <= 10);
        return {
          ...prev,
          timeLeft: nextTime,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.phase, gameState.isPaused]);

  // Efekt Confetti na ekranie finałowym
  useEffect(() => {
    if (gameState.phase === 'GAME_OVER') {
      soundEngine.playFanfare();
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  }, [gameState.phase]);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundEngine.setMuted(next);
  };

  // Dodaje wirtualnego gracza / bota do szybkiego przetestowania rozgrywki
  const addDemoPlayer = () => {
    const demoNames = [
      'Piotr Pieróg',
      'Paulina Panda',
      'Paweł Parówka',
      'Patryk Pączek',
      'Pola Papuga',
      'Przemek Pirat',
    ];
    const usedNames = new Set(gameState.players.map((p) => p.name));
    const availableName =
      demoNames.find((n) => !usedNames.has(n)) ||
      `Pan P-${gameState.players.length + 1}`;
    const randomAvatar =
      AVATARS[gameState.players.length % AVATARS.length].emoji;

    const msg: ClientToHostMessage = {
      type: 'JOIN_ROOM',
      payload: {
        playerId: `demo-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name: availableName,
        avatar: randomAvatar,
      },
    };

    setGameState((prev) => processClientMessageOnHost(prev, msg));
  };

  // Start gry z Lobby -> Wybór Roli (Zapowiedź P-Mówcy)
  const handleStartGame = () => {
    setGameState((prev) => {
      let updatedPlayers = [...prev.players];
      // Jeśli nikt jeszcze nie dołączył, dodaj 2 domyślnych graczy, aby można było od razu grać
      if (updatedPlayers.length === 0) {
        updatedPlayers = [
          {
            id: 'auto-1',
            name: 'Kapitan Parówka',
            avatar: '🌭',
            teamId: prev.settings.scoringFormat === 'FFA' ? 'ffa' : 'team-1',
            score: 0,
            isConnected: true,
            lastSeen: Date.now(),
            stats: {
              wordsDescribed: 0,
              foulCountAsSpeaker: 0,
              caughtOthersCount: 0,
              passesUsed: 0,
              correctTextGuesses: 0,
            },
          },
          {
            id: 'auto-2',
            name: 'Prezes Panda',
            avatar: '🐼',
            teamId: prev.settings.scoringFormat === 'FFA' ? 'ffa' : 'team-2',
            score: 0,
            isConnected: true,
            lastSeen: Date.now(),
            stats: {
              wordsDescribed: 0,
              foulCountAsSpeaker: 0,
              caughtOthersCount: 0,
              passesUsed: 0,
              correctTextGuesses: 0,
            },
          },
        ];
      }

      const tempState: GameState = {
        ...prev,
        players: updatedPlayers,
        currentRoundNumber: 1,
        totalTurnsPlayed: 0,
        activeTeamIndex: 0,
      };

      const speakerId = pickNextSpeaker(tempState, 0);
      return {
        ...tempState,
        phase: 'ROLE_SELECTION',
        activeSpeakerId: speakerId,
        lastFoulAlert: null,
      };
    });
  };

  // Start odliczania rundy bezpośrednio z ekranu Hosta (lub z telefonu P-Mówcy)
  const handleStartRoundNow = () => {
    setGameState((prev) => {
      const { word, updatedUsedIds } = pickNextWord(prev);
      soundEngine.playRoundStart();
      return {
        ...prev,
        phase: 'ROUND_ACTIVE',
        currentWord: word,
        usedWordIds: updatedUsedIds,
        timeLeft: prev.settings.roundDuration,
        isPaused: false,
        passesRemaining: prev.settings.maxPassesPerRound,
        roundScoreDelta: 0,
        roundLogs: [],
        lastFoulAlert: null,
        recentGuesses: [],
      };
    });
  };

  // Przejście z podsumowania rundy do kolejnej drużyny / P-Mówcy lub Finału
  const handleNextTurn = () => {
    setGameState((prev) => {
      const nextTurnsPlayed = prev.totalTurnsPlayed + 1;
      const turnsPerRound =
        prev.settings.scoringFormat === 'FFA'
          ? Math.max(2, prev.players.length)
          : prev.teams.length;

      const totalTargetTurns = prev.settings.totalRounds * turnsPerRound;

      if (nextTurnsPlayed >= totalTargetTurns) {
        return {
          ...prev,
          totalTurnsPlayed: nextTurnsPlayed,
          phase: 'GAME_OVER',
        };
      }

      const nextTeamIndex =
        prev.settings.scoringFormat === 'FFA'
          ? 0
          : nextTurnsPlayed % prev.teams.length;
      const nextRoundNum = Math.floor(nextTurnsPlayed / turnsPerRound) + 1;

      const updatedState: GameState = {
        ...prev,
        totalTurnsPlayed: nextTurnsPlayed,
        currentRoundNumber: nextRoundNum,
        activeTeamIndex: nextTeamIndex,
      };

      const nextSpeakerId = pickNextSpeaker(updatedState, nextTeamIndex);

      return {
        ...updatedState,
        phase: 'ROLE_SELECTION',
        activeSpeakerId: nextSpeakerId,
        currentWord: null,
        lastFoulAlert: null,
      };
    });
  };

  // Reset całej gry do Lobby z zachowaniem podłączonych graczy
  const handlePlayAgain = () => {
    setGameState((prev) => ({
      ...prev,
      phase: 'LOBBY',
      currentRoundNumber: 1,
      totalTurnsPlayed: 0,
      activeTeamIndex: 0,
      activeSpeakerId: null,
      currentWord: null,
      usedWordIds: [],
      roundLogs: [],
      lastFoulAlert: null,
      teams: prev.teams.map((t) => ({ ...t, score: 0 })),
      players: prev.players.map((p) => ({
        ...p,
        score: 0,
        stats: {
          wordsDescribed: 0,
          foulCountAsSpeaker: 0,
          caughtOthersCount: 0,
          passesUsed: 0,
          correctTextGuesses: 0,
        },
      })),
    }));
  };

  // Aktualizacja ustawień gry w Lobby
  const updateSettings = (partial: Partial<GameState['settings']>) => {
    setGameState((prev) => {
      const merged = { ...prev.settings, ...partial };
      let updatedTeams = prev.teams;
      if (partial.teamCount && partial.teamCount !== prev.teams.length) {
        updatedTeams = DEFAULT_TEAMS.slice(0, partial.teamCount).map((t) => ({
          ...t,
          score: 0,
        }));
      }
      return {
        ...prev,
        settings: merged,
        teams: updatedTeams,
        timeLeft: merged.roundDuration,
      };
    });
  };

  const toggleCategory = (cat: WordCategory) => {
    const current = gameState.settings.selectedCategories;
    if (current.includes(cat)) {
      if (current.length <= 1) return; // Co najmniej 1 kategoria musi być aktywna
      updateSettings({
        selectedCategories: current.filter((c) => c !== cat),
      });
    } else {
      updateSettings({
        selectedCategories: [...current, cat],
      });
    }
  };

  const handleAddCustomWord = (e: React.FormEvent) => {
    e.preventDefault();
    const singleWord = customWordInput.trim().split(/\s+/)[0];
    if (!singleWord) return;
    const newWord: WordItem = {
      id: `custom-${Date.now()}`,
      word: singleWord,
      category: 'Własne Hasła',
      difficulty: 'MEDIUM',
      pHint:
        customWordHint.trim() ||
        'Własne hasło gospodarza! Pamiętaj: każde słowo na P!',
    };
    setGameState((prev) => ({
      ...prev,
      customWords: [newWord, ...prev.customWords],
    }));
    setCustomWordInput('');
    setCustomWordHint('');
  };

  const activeSpeaker = gameState.players.find(
    (p) => p.id === gameState.activeSpeakerId
  );
  const activeTeam = gameState.teams[gameState.activeTeamIndex];

  // Statystyki na Finał
  const masterOfP = [...gameState.players].sort(
    (a, b) => b.stats.wordsDescribed - a.stats.wordsDescribed
  )[0];
  const biggestFoulMaker = [...gameState.players].sort(
    (a, b) => b.stats.foulCountAsSpeaker - a.stats.foulCountAsSpeaker
  )[0];
  const buzzerSheriff = [...gameState.players].sort(
    (a, b) => b.stats.caughtOthersCount - a.stats.caughtOthersCount
  )[0];

  const totalWordsInPool = INITIAL_WORDS.length + gameState.customWords.length;

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
      className={`min-h-screen bg-[#120A2A] text-white flex flex-col justify-between relative overflow-hidden ${
        embeddedInSimulator ? 'p-3' : 'p-4 md:p-8'
      }`}
    >
      {/* Tło dekoracyjne Neo-Brutalism */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-15">
        <div className="absolute -top-16 -left-16 text-[16rem] font-black text-party-yellow select-none rotate-[-12deg]">
          P
        </div>
        <div className="absolute top-1/3 -right-12 text-[14rem] font-black text-party-purple select-none rotate-[15deg]">
          P!
        </div>
        <div className="absolute -bottom-20 left-1/3 text-[15rem] font-black text-party-green select-none rotate-[8deg]">
          P?
        </div>
      </div>

      {/* PASEK GÓRNY HOSTA */}
      <header className="relative z-10 flex flex-wrap items-center justify-between gap-3 bg-[#1E1242] border-4 border-black rounded-2xl px-4 py-3 shadow-brutal">
        <div className="flex items-center gap-3">
          {onBackToMenu && (
            <button
              onClick={onBackToMenu}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-3 py-1.5 rounded-xl border-2 border-black text-sm transition"
            >
              ← Menu
            </button>
          )}
          <div className="flex items-center gap-2">
            <span className="bg-party-yellow text-black font-black text-2xl px-3 py-1 rounded-xl border-3 border-black shadow-brutal-sm">
              P
            </span>
            <div>
              <h1 className="font-black text-lg md:text-xl tracking-wider uppercase leading-none">
                GRA NA P
              </h1>
              <p className="text-xs text-purple-300 font-semibold">
                Format inspirowany „Zero Presji” • Ekran Hosta (TV)
              </p>
            </div>
          </div>
        </div>

        {/* Kod Pokoju zawsze widoczny na górze */}
        <div className="flex items-center gap-3">
          <div className="bg-black/50 border-2 border-party-yellow rounded-xl px-3 py-1 flex items-center gap-2">
            <span className="text-xs uppercase text-gray-300 font-bold">
              Kod PIN:
            </span>
            <span className="text-xl md:text-2xl font-black tracking-widest text-party-yellow">
              {gameState.roomCode}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 bg-black/40 border-2 border-black px-3 py-1.5 rounded-xl text-xs font-bold">
            <Users className="w-4 h-4 text-party-green" />
            <span>{gameState.players.length} graczy</span>
          </div>

          <button
            onClick={toggleMute}
            className="p-2.5 bg-party-purple hover:bg-purple-500 text-white rounded-xl border-2 border-black shadow-brutal-sm transition"
            title={isMuted ? 'Włącz dźwięk' : 'Wycisz dźwięk'}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* ================================================================= */}
      {/* FAZA 1: LOBBY                                                     */}
      {/* ================================================================= */}
      {gameState.phase === 'LOBBY' && (
        <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 items-start">
          {/* LEWA KOLUMNA: Kod QR, Kod PIN i Instrukcja */}
          <div className="lg:col-span-4 bg-[#1E1242] border-4 border-black rounded-3xl p-6 shadow-brutal flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 bg-party-yellow text-black font-black text-xs uppercase px-3 py-1 rounded-full border-2 border-black mb-3">
              <Smartphone className="w-4 h-4" /> Dołącz telefonem jako kontroler
            </div>
            <h2 className="text-xl font-black uppercase mb-1">
              Zeskanuj QR lub wpisz kod
            </h2>
            <p className="text-xs text-purple-200 mb-4">
              Bez instalacji i bez logowania – każdy smartfon to Twój przycisk!
            </p>

            {joinUrl && (
              <div className="bg-white p-4 rounded-2xl border-4 border-black shadow-brutal mb-4">
                <QRCodeSVG
                  value={joinUrl}
                  size={embeddedInSimulator ? 130 : 170}
                  level="M"
                />
              </div>
            )}

            <div className="w-full bg-black/60 border-3 border-party-yellow rounded-2xl py-3 px-4 mb-4">
              <div className="text-xs uppercase font-bold text-gray-300">
                KOD POKOJU (PIN):
              </div>
              <div className="text-4xl md:text-5xl font-black tracking-[0.25em] text-party-yellow mt-1">
                {gameState.roomCode}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 w-full">
              <button
                onClick={addDemoPlayer}
                className="flex-1 bg-party-blue hover:bg-cyan-300 text-black font-black py-2.5 px-3 rounded-xl border-3 border-black shadow-brutal-sm text-xs uppercase flex items-center justify-center gap-1.5 transition active:translate-y-0.5"
              >
                <UserPlus className="w-4 h-4" /> + Dodaj Bota / Gracza
              </button>
              {!embeddedInSimulator && (
                <a
                  href={`/?join=${gameState.roomCode}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-white hover:bg-gray-100 text-black font-black py-2.5 px-3 rounded-xl border-3 border-black shadow-brutal-sm text-xs uppercase flex items-center justify-center gap-1.5 transition"
                >
                  <Smartphone className="w-4 h-4" /> Otwórz Kontroler
                </a>
              )}
            </div>
          </div>

          {/* ŚRODKOWA KOLUMNA: Podział na Drużyny / Lista Graczy */}
          <div className="lg:col-span-5 bg-[#1E1242] border-4 border-black rounded-3xl p-6 shadow-brutal flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-black uppercase flex items-center gap-2">
                  <Users className="w-6 h-6 text-party-green" />
                  Gracze w Lobby ({gameState.players.length})
                </h2>
                <button
                  onClick={() => setShowSettingsModal(!showSettingsModal)}
                  className="bg-party-purple hover:bg-purple-500 text-white font-black px-3 py-1.5 rounded-xl border-2 border-black shadow-brutal-sm text-xs uppercase flex items-center gap-1.5"
                >
                  <Sliders className="w-4 h-4" /> Własne hasła ({gameState.customWords.length})
                </button>
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
                                    p.isConnected
                                      ? 'bg-party-green'
                                      : 'bg-gray-500'
                                  }`}
                                  title={
                                    p.isConnected ? 'Połączony' : 'Rozłączony'
                                  }
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
                      <span className="font-black text-sm truncate">
                        {p.name}
                      </span>
                    </div>
                  ))}
                  {gameState.players.length === 0 && (
                    <p className="col-span-full text-center text-gray-400 py-8 text-sm">
                      Dołącz przez kod PIN na telefonie lub kliknij „+ Dodaj Bota / Gracza”
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Przycisk START GRY */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                onClick={handleStartGame}
                className="w-full bg-party-green hover:bg-emerald-400 text-black font-black text-xl md:text-2xl py-4 rounded-2xl border-4 border-black shadow-brutal uppercase tracking-wider flex items-center justify-center gap-3 transition transform hover:-translate-y-0.5 active:translate-y-0.5"
              >
                <Play className="w-7 h-7 fill-black" />
                ROZPOCZNIJ GRĘ NA P!
              </button>
              <p className="text-center text-xs text-purple-200 mt-2">
                W bazie gotowych jest <strong>{totalWordsInPool}</strong> polskich haseł w {gameState.settings.selectedCategories.length} kategoriach!
              </p>
            </div>
          </div>

          {/* PRAWA KOLUMNA: Konfiguracja Rundy i Kategorii */}
          <div className="lg:col-span-3 bg-[#1E1242] border-4 border-black rounded-3xl p-5 shadow-brutal space-y-4">
            <h3 className="font-black text-lg uppercase flex items-center gap-2 text-party-yellow">
              <Sliders className="w-5 h-5" /> Ustawienia Imprezy
            </h3>

            {/* Tryb punktacji */}
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
                    {fmt === 'TEAMS' ? 'Drużynowy' : 'Każdy na każdego'}
                  </button>
                ))}
              </div>
            </div>

            {/* Liczba drużyn (jeśli TEAMS) */}
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

            {/* Czas Rundy */}
            <div>
              <label className="text-xs uppercase font-bold text-purple-200 block mb-1.5">
                Czas pojedynczej rundy:
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

            {/* Liczba kolejek */}
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

            {/* Poziom trudności */}
            <div>
              <label className="text-xs uppercase font-bold text-purple-200 block mb-1.5">
                Poziom trudności haseł:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(
                  [
                    { id: 'ALL', label: 'Wszystkie' },
                    { id: 'EASY', label: 'Łatwe' },
                    { id: 'MEDIUM', label: 'Średnie' },
                    { id: 'HARD', label: 'Trudne' },
                  ] as { id: Difficulty; label: string }[]
                ).map((d) => (
                  <button
                    key={d.id}
                    onClick={() => updateSettings({ difficulty: d.id })}
                    className={`py-1.5 px-2 rounded-xl font-bold text-xs border-2 border-black transition ${
                      gameState.settings.difficulty === d.id
                        ? 'bg-party-yellow text-black'
                        : 'bg-black/40 text-gray-300'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Wybór kategorii */}
            <div>
              <label className="text-xs uppercase font-bold text-purple-200 block mb-1.5">
                Kategorie haseł:
              </label>
              <div className="space-y-1.5">
                {ALL_CATEGORIES.map((cat) => {
                  const active =
                    gameState.settings.selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold border-2 border-black flex items-center justify-between transition ${
                        active
                          ? 'bg-party-purple text-white'
                          : 'bg-black/30 text-gray-400'
                      }`}
                    >
                      <span>{cat}</span>
                      <span>{active ? '✓' : ''}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* MODAL DODAWANIA WŁASNYCH HASEŁ */}
      <AnimatePresence>
        {showSettingsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1E1242] border-4 border-black rounded-3xl p-6 max-w-lg w-full shadow-brutal text-white"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black uppercase text-party-yellow">
                  Dodaj własne hasła do puli
                </h3>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="bg-party-red text-white font-black px-3 py-1 rounded-xl border-2 border-black"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleAddCustomWord} className="space-y-3 mb-4">
                <div>
                  <label className="text-xs font-bold uppercase text-purple-200 block mb-1">
                    Nowe jednowyrazowe hasło (np. „Wesele”):
                  </label>
                  <input
                    type="text"
                    value={customWordInput}
                    onChange={(e) => setCustomWordInput(e.target.value.replace(/\s+/g, ''))}
                    placeholder="Wpisz 1 wyraz..."
                    className="w-full bg-black/50 border-3 border-black rounded-xl px-3 py-2.5 text-white font-bold focus:outline-none focus:border-party-yellow"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-purple-200 block mb-1">
                    Podpowiedź na P dla P-Mówcy (opcjonalnie):
                  </label>
                  <input
                    type="text"
                    value={customWordHint}
                    onChange={(e) => setCustomWordHint(e.target.value)}
                    placeholder="np. Podpity powinowaty pląsa podczas przyjęcia..."
                    className="w-full bg-black/50 border-3 border-black rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-party-yellow"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-party-green text-black font-black py-2.5 rounded-xl border-3 border-black shadow-brutal-sm uppercase flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" /> Dodaj hasło do gry
                </button>
              </form>

              {gameState.customWords.length > 0 && (
                <div className="max-h-40 overflow-y-auto space-y-1.5 border-t border-white/10 pt-3">
                  {gameState.customWords.map((cw) => (
                    <div
                      key={cw.id}
                      className="bg-black/40 px-3 py-1.5 rounded-lg text-xs flex justify-between items-center"
                    >
                      <span className="font-bold">{cw.word}</span>
                      <span className="text-party-yellow">Własne</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================================================================= */}
      {/* FAZA 2: PRZED RUNDĄ (ZAPOWIEDŹ P-MÓWCY)                           */}
      {/* ================================================================= */}
      {gameState.phase === 'ROLE_SELECTION' && (
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center my-6">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1E1242] border-4 border-black rounded-3xl p-8 max-w-2xl w-full shadow-brutal"
          >
            <div className="inline-block bg-party-yellow text-black font-black text-xs uppercase px-4 py-1.5 rounded-full border-2 border-black mb-4">
              Runda {gameState.currentRoundNumber} z{' '}
              {gameState.settings.totalRounds} • Przygotujcie mikrofony i uszy!
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
              Nadchodzi P-Mówca!
            </h2>

            <div className="bg-black/50 border-4 border-party-yellow rounded-3xl p-6 mb-6 flex flex-col items-center">
              <div className="text-6xl mb-3">
                {activeSpeaker?.avatar || '🎙️'}
              </div>
              <div className="text-3xl font-black text-party-yellow">
                {activeSpeaker?.name || 'Wybrany Gracz'}
              </div>
              <p className="text-sm text-purple-200 mt-2 max-w-md">
                Spójrz na swój telefon! Opisuj hasła używając{' '}
                <strong className="text-party-green">
                  WYŁĄCZNIE słów zaczynających się na literę „P”
                </strong>
                . Przeciwnicy trzymają palec na czerwonym Buzzerze!
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

      {/* ================================================================= */}
      {/* FAZA 3: AKTYWNA RUNDA (BEZ POKAZYWANIA TAJNEGO HASŁA NA TV!)      */}
      {/* ================================================================= */}
      {gameState.phase === 'ROUND_ACTIVE' && (
        <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 my-4 items-stretch">
          {/* LEWY PANEL: Licznik Czasu i Kategoria (Główna scena TV) */}
          <div className="lg:col-span-8 bg-[#1E1242] border-4 border-black rounded-3xl p-6 shadow-brutal flex flex-col justify-between relative overflow-hidden">
            {/* Górna belka aktywnej rundy */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 bg-black/50 border-2 border-black px-4 py-2 rounded-2xl">
                <span className="text-3xl">{activeSpeaker?.avatar || '🎙️'}</span>
                <div>
                  <div className="text-xs uppercase text-purple-300 font-bold">
                    Aktualny P-Mówca:
                  </div>
                  <div className="text-lg font-black text-party-yellow">
                    {activeSpeaker?.name}
                  </div>
                </div>
              </div>

              <div className="bg-party-purple border-3 border-black px-4 py-2 rounded-2xl shadow-brutal-sm text-center">
                <div className="text-[11px] uppercase font-bold text-purple-200">
                  Kategoria Hasła:
                </div>
                <div className="text-base md:text-lg font-black uppercase">
                  {gameState.currentWord?.category || 'Tajna Kategoria'}
                </div>
              </div>

              <button
                onClick={() =>
                  setGameState((prev) => ({
                    ...prev,
                    isPaused: !prev.isPaused,
                  }))
                }
                className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl border-2 border-black text-xs font-bold uppercase flex items-center gap-1.5"
              >
                <Pause className="w-4 h-4" />
                {gameState.isPaused ? 'Wznów' : 'Pauza'}
              </button>
            </div>

            {/* ŚRODEK: Wielki Zegar + Sekretna Karta */}
            <div className="my-6 flex flex-col items-center justify-center text-center">
              <motion.div
                key={gameState.timeLeft}
                initial={{ scale: gameState.timeLeft <= 10 ? 1.25 : 1.05 }}
                animate={{ scale: 1 }}
                className={`w-44 h-44 md:w-52 md:h-52 rounded-full border-8 border-black shadow-brutal flex flex-col items-center justify-center transition-colors ${
                  gameState.timeLeft <= 10
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

              <div className="mt-6 bg-black/60 border-3 border-dashed border-party-yellow rounded-2xl px-6 py-4 max-w-lg w-full">
                <div className="text-xs uppercase font-bold text-party-yellow tracking-widest mb-1">
                  🔒 TAJNE HASŁO WIDOCZNE TYLKO NA TELEFONIE P-MÓWCY
                </div>
                <div className="text-lg md:text-xl font-black text-white">
                  Słuchajcie uważnie! Każde słowo P-Mówcy MUSI zaczynać się na{' '}
                  <span className="bg-party-yellow text-black px-2 py-0.5 rounded-md">
                    P
                  </span>
                  !
                </div>
                <div className="text-xs text-gray-300 mt-1">
                  Hasło jednowyrazowe • Liczba liter:{' '}
                  <strong className="text-party-green">
                    {gameState.currentWord?.word.trim().length || 0}
                  </strong>{' '}
                  • Pozostałe PASY:{' '}
                  <strong className="text-party-orange">
                    {gameState.passesRemaining}
                  </strong>
                </div>
              </div>
            </div>

            {/* Dolny pasek: Wynik w tej rundzie + Ostatnie zgadywania tekstowe */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase font-bold text-purple-200">
                  Bilans rundy:
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

              {gameState.recentGuesses.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto">
                  <span className="text-xs uppercase font-bold text-gray-400">
                    Strzały z telefonów:
                  </span>
                  {gameState.recentGuesses.slice(0, 3).map((g) => (
                    <span
                      key={g.id}
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg border border-black ${
                        g.isCorrect
                          ? 'bg-party-green text-black'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      {g.avatar} {g.playerName}: „{g.text}”
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* ALARM FALSTARTU / BŁĘDU NA P! */}
            <AnimatePresence>
              {gameState.lastFoulAlert &&
                Date.now() - gameState.lastFoulAlert.timestamp < 3200 && (
                  <motion.div
                    key={gameState.lastFoulAlert.id}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="absolute inset-4 bg-party-red/95 border-8 border-black rounded-3xl z-30 flex flex-col items-center justify-center text-center p-6 shadow-brutal-lg"
                  >
                    <AlertTriangle className="w-20 h-20 text-party-yellow mb-2 animate-bounce" />
                    <h2 className="text-4xl md:text-6xl font-black uppercase text-white drop-shadow-[0_4px_0_rgba(0,0,0,1)]">
                      BŁĄD! TO NIE NA „P”!
                    </h2>
                    <p className="text-xl md:text-2xl font-black text-party-yellow mt-3">
                      {gameState.lastFoulAlert.caughtByAvatar}{' '}
                      {gameState.lastFoulAlert.caughtByPlayerName} przyłapał(a)
                      P-Mówcę!
                    </p>
                    <div className="mt-4 bg-black text-white font-black px-5 py-2 rounded-2xl border-2 border-party-yellow text-lg">
                      Kara: -{gameState.settings.foulPenaltySeconds} sekund i -
                      {gameState.settings.foulPenaltyPoints} pkt! (Spalone
                      hasło: „{gameState.lastFoulAlert.wordBeingDescribed}”)
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>
          </div>

          {/* PRAWY PANEL: Tabela Wyników Na Żywo i Historia Haseł Rundy */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Tabela wyników */}
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

            {/* Przebieg bieżącej rundy */}
            <div className="bg-[#1E1242] border-4 border-black rounded-3xl p-5 shadow-brutal flex-1 flex flex-col">
              <h3 className="font-black text-base uppercase text-purple-200 mb-3">
                Odgadnięte i spalone w tej rundzie:
              </h3>
              {gameState.roundLogs.length === 0 ? (
                <p className="text-xs text-gray-400 italic my-auto text-center">
                  Czekamy na pierwsze odgadnięte hasło lub wpadkę na P...
                </p>
              ) : (
                <div className="space-y-2 overflow-y-auto max-h-60 pr-1">
                  {gameState.roundLogs.map((entry) => (
                    <div
                      key={entry.id}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl border-2 border-black text-xs font-bold ${
                        entry.type === 'GUESSED' || entry.type === 'TEXT_GUESS'
                          ? 'bg-party-green/20 border-party-green text-white'
                          : entry.type === 'FOUL'
                          ? 'bg-party-red/30 border-party-red text-white'
                          : 'bg-white/10 text-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {entry.type === 'GUESSED' ||
                        entry.type === 'TEXT_GUESS' ? (
                          <CheckCircle2 className="w-4 h-4 text-party-green shrink-0" />
                        ) : entry.type === 'FOUL' ? (
                          <XCircle className="w-4 h-4 text-party-red shrink-0" />
                        ) : (
                          <SkipForward className="w-4 h-4 text-party-yellow shrink-0" />
                        )}
                        <div>
                          <span className="font-black">{entry.word}</span>
                          {entry.actorName && entry.type === 'FOUL' && (
                            <span className="block text-[10px] text-red-300">
                              Przyłapał(a): {entry.actorName}
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

      {/* ================================================================= */}
      {/* FAZA 4: PODSUMOWANIE RUNDY                                        */}
      {/* ================================================================= */}
      {gameState.phase === 'ROUND_SUMMARY' && (
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center my-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1E1242] border-4 border-black rounded-3xl p-6 md:p-8 max-w-3xl w-full shadow-brutal"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-xs uppercase font-black bg-party-yellow text-black px-3 py-1 rounded-full border border-black">
                  Koniec czasu!
                </span>
                <h2 className="text-3xl font-black uppercase mt-2">
                  Podsumowanie tury: {activeSpeaker?.avatar}{' '}
                  {activeSpeaker?.name}
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

            {gameState.currentWord && (
              <div className="bg-black/40 border-2 border-party-yellow rounded-2xl p-3 mb-5 text-center">
                <span className="text-xs uppercase text-gray-300 font-bold">
                  Ostatnie nieodgadnięte hasło na liczniku:{' '}
                </span>
                <strong className="text-lg font-black text-party-yellow">
                  „{gameState.currentWord.word}”
                </strong>
              </div>
            )}

            {/* Lista haseł z rundy */}
            <div className="space-y-2 max-h-60 overflow-y-auto mb-6">
              {gameState.roundLogs.length === 0 ? (
                <p className="text-center text-gray-400 py-6">
                  W tej turze nie padło żadne rozstrzygnięte hasło!
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
                          item.type === 'GUESSED' || item.type === 'TEXT_GUESS'
                            ? 'bg-party-green text-black'
                            : item.type === 'FOUL'
                            ? 'bg-party-red text-white'
                            : 'bg-party-yellow text-black'
                        }`}
                      >
                        {item.type === 'GUESSED' || item.type === 'TEXT_GUESS'
                          ? 'ZGADNIĘTE'
                          : item.type === 'FOUL'
                          ? 'WPADKA NIE-P'
                          : 'PAS'}
                      </span>
                      <span className="font-black text-base">{item.word}</span>
                      <span className="text-xs text-purple-300">
                        ({item.category})
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

      {/* ================================================================= */}
      {/* FAZA 5: FINAŁ I PODIUM STATYSTYK                                  */}
      {/* ================================================================= */}
      {gameState.phase === 'GAME_OVER' && (
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center my-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1E1242] border-4 border-black rounded-3xl p-6 md:p-8 max-w-4xl w-full shadow-brutal text-center"
          >
            <div className="inline-flex items-center gap-2 bg-party-yellow text-black font-black text-xs uppercase px-4 py-1.5 rounded-full border-2 border-black mb-3">
              <Sparkles className="w-4 h-4" /> Wielki Finał Gry na P!
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-6">
              Podium Zwycięzców
            </h2>

            {/* Podium Drużyn lub Graczy */}
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
                    {idx === 0 && <Crown className="w-5 h-5" />} #{idx + 1}{' '}
                    Miejsce
                  </div>
                  <div className="text-5xl my-2">{entry.icon}</div>
                  <div className="text-xl font-black uppercase">
                    {entry.name}
                  </div>
                  <div className="text-3xl font-black mt-2">
                    {entry.score} pkt
                  </div>
                </div>
              ))}
            </div>

            {/* Tytuły Specjalne ("Mistrz Litery P", "Największy Psuj", "Szeryf Buzzera") */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
              <div className="bg-black/40 border-3 border-party-green rounded-2xl p-4">
                <div className="flex items-center gap-2 text-party-green font-black text-xs uppercase mb-1">
                  <Crown className="w-4 h-4" /> Mistrz Litery P
                </div>
                <div className="text-lg font-black">
                  {masterOfP
                    ? `${masterOfP.avatar} ${masterOfP.name}`
                    : 'Brak danych'}
                </div>
                <div className="text-xs text-gray-300">
                  Opisane hasła na P:{' '}
                  <strong>{masterOfP?.stats.wordsDescribed || 0}</strong>
                </div>
              </div>

              <div className="bg-black/40 border-3 border-party-red rounded-2xl p-4">
                <div className="flex items-center gap-2 text-party-red font-black text-xs uppercase mb-1">
                  <Flame className="w-4 h-4" /> Największy Psuj (Wpadki)
                </div>
                <div className="text-lg font-black">
                  {biggestFoulMaker
                    ? `${biggestFoulMaker.avatar} ${biggestFoulMaker.name}`
                    : 'Brak danych'}
                </div>
                <div className="text-xs text-gray-300">
                  Złapany na słowie nie-P:{' '}
                  <strong>
                    {biggestFoulMaker?.stats.foulCountAsSpeaker || 0} razy
                  </strong>
                </div>
              </div>

              <div className="bg-black/40 border-3 border-party-blue rounded-2xl p-4">
                <div className="flex items-center gap-2 text-party-blue font-black text-xs uppercase mb-1">
                  <ShieldAlert className="w-4 h-4" /> Szeryf Buzzera
                </div>
                <div className="text-lg font-black">
                  {buzzerSheriff
                    ? `${buzzerSheriff.avatar} ${buzzerSheriff.name}`
                    : 'Brak danych'}
                </div>
                <div className="text-xs text-gray-300">
                  Przyłapał innych:{' '}
                  <strong>
                    {buzzerSheriff?.stats.caughtOthersCount || 0} razy
                  </strong>
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
