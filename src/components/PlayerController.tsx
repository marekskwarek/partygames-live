'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  SkipForward,
  AlertOctagon,
  Wifi,
  WifiOff,
  Send,
  Lightbulb,
  Clock,
  Sparkles,
  Users,
} from 'lucide-react';
import { AVATARS } from '@/data/words';
import { GameState, HostToClientMessage } from '@/types/game';
import { PartyNetworkClient } from '@/lib/gameEngine';
import { soundEngine } from '@/lib/sound';

interface PlayerControllerProps {
  initialRoomCode?: string;
  instanceKey?: string; // Unikalny klucz dla wielu kontrolerów w Symulatorze Split-Screen
  defaultName?: string;
  defaultAvatar?: string;
  autoJoin?: boolean;
  onBackToMenu?: () => void;
  compactMode?: boolean;
}

export default function PlayerController({
  initialRoomCode = '',
  instanceKey = 'main',
  defaultName = '',
  defaultAvatar = '🌭',
  autoJoin = false,
  onBackToMenu,
  compactMode = false,
}: PlayerControllerProps) {
  const storageKey = `gra-na-p-player-${instanceKey}`;

  const [roomCode, setRoomCode] = useState(initialRoomCode.toUpperCase());
  const [playerId, setPlayerId] = useState('');
  const [playerName, setPlayerName] = useState(defaultName);
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [hasJoined, setHasJoined] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [guessInput, setGuessInput] = useState('');
  const [buzzerPressedAnim, setBuzzerPressedAnim] = useState(false);

  const clientRef = useRef<PartyNetworkClient | null>(null);

  // Inicjalizacja ID gracza i sesji z LocalStorage (obsługa Reconnect po zerwaniu Wi-Fi)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.playerId) setPlayerId(parsed.playerId);
        if (parsed.playerName && !defaultName) setPlayerName(parsed.playerName);
        if (parsed.avatar && defaultAvatar === '🌭') setAvatar(parsed.avatar);
        if (parsed.roomCode && !initialRoomCode) setRoomCode(parsed.roomCode);
      } else {
        const newId = `plr-${instanceKey}-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 6)}`;
        setPlayerId(newId);
      }
    } catch {
      setPlayerId(`plr-${instanceKey}-${Date.now()}`);
    }
  }, [storageKey, defaultName, defaultAvatar, initialRoomCode, instanceKey]);

  // Aktualizacja kodu pokoju gdy zmieni się prop z zewnątrz (np. w Symulatorze)
  useEffect(() => {
    if (initialRoomCode) {
      setRoomCode(initialRoomCode.toUpperCase());
    }
  }, [initialRoomCode]);

  // Auto-join dla wbudowanego symulatora
  useEffect(() => {
    if (autoJoin && roomCode && playerId && playerName && !hasJoined) {
      connectToRoom(roomCode, playerId, playerName, avatar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoJoin, roomCode, playerId, playerName]);

  const connectToRoom = (
    targetRoom: string,
    pId: string,
    pName: string,
    pAvatar: string
  ) => {
    const cleanRoom = targetRoom.trim().toUpperCase();
    if (!cleanRoom || !pName.trim()) return;

    if (clientRef.current) {
      clientRef.current.destroy();
    }

    // Zapisz sesję do auto-reconnectu
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            playerId: pId,
            playerName: pName.trim(),
            avatar: pAvatar,
            roomCode: cleanRoom,
          })
        );
      } catch {
        // ignore
      }
    }

    const netClient = new PartyNetworkClient(
      cleanRoom,
      (msg: HostToClientMessage) => {
        if (msg.type === 'STATE_SYNC') {
          setGameState(msg.payload.state);
        }
      },
      (connected) => {
        setIsConnected(connected);
      }
    );

    clientRef.current = netClient;
    setHasJoined(true);

    // Wyślij pakiet dołączenia
    setTimeout(() => {
      netClient.send({
        type: 'JOIN_ROOM',
        payload: {
          playerId: pId,
          name: pName.trim(),
          avatar: pAvatar,
        },
      });
    }, 60);
  };

  // Heartbeat / Reconnect co 4 sekundy
  useEffect(() => {
    if (!hasJoined || !clientRef.current || !playerId) return;
    const interval = setInterval(() => {
      clientRef.current?.send({
        type: 'PING',
        payload: { playerId },
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [hasJoined, playerId]);

  useEffect(() => {
    return () => {
      clientRef.current?.destroy();
    };
  }, []);

  // Reset odkrytej podpowiedzi przy zmianie hasła
  useEffect(() => {
    setShowHint(false);
  }, [gameState?.currentWord?.id]);

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const idToUse =
      playerId || `plr-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setPlayerId(idToUse);
    connectToRoom(roomCode, idToUse, playerName, avatar);
  };

  const handleSwitchTeam = (teamId: string) => {
    soundEngine.vibrate(40);
    clientRef.current?.send({
      type: 'SWITCH_TEAM',
      payload: { playerId, teamId },
    });
  };

  const handleSpeakerReady = () => {
    soundEngine.vibrate(80);
    clientRef.current?.send({
      type: 'SPEAKER_READY',
      payload: { playerId },
    });
  };

  const handleWordGuessed = () => {
    soundEngine.vibrate(100);
    clientRef.current?.send({
      type: 'WORD_GUESSED',
      payload: { playerId },
    });
  };

  const handleWordPassed = () => {
    soundEngine.vibrate(50);
    clientRef.current?.send({
      type: 'WORD_PASSED',
      payload: { playerId },
    });
  };

  const handleBuzzerFoul = () => {
    soundEngine.vibrate([200, 60, 250]);
    setBuzzerPressedAnim(true);
    setTimeout(() => setBuzzerPressedAnim(false), 500);
    clientRef.current?.send({
      type: 'BUZZER_FOUL',
      payload: {
        byPlayerId: playerId,
        byPlayerName: playerName || 'Gracz',
        byAvatar: avatar,
      },
    });
  };

  const handleSendTextGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guessInput.trim()) return;
    soundEngine.vibrate(40);
    clientRef.current?.send({
      type: 'SUBMIT_GUESS',
      payload: {
        playerId,
        playerName,
        avatar,
        guessText: guessInput.trim(),
      },
    });
    setGuessInput('');
  };

  const myPlayerObj = gameState?.players.find((p) => p.id === playerId);
  const isMyTurnToSpeak = gameState?.activeSpeakerId === playerId;
  const activeSpeaker = gameState?.players.find(
    (p) => p.id === gameState?.activeSpeakerId
  );
  const myTeam = gameState?.teams.find((t) => t.id === myPlayerObj?.teamId);
  const activeTeam = gameState
    ? gameState.teams[gameState.activeTeamIndex]
    : null;
  const isMyTeamGuessing =
    gameState?.settings.scoringFormat === 'TEAMS' &&
    myTeam &&
    activeTeam &&
    myTeam.id === activeTeam.id &&
    !isMyTurnToSpeak;

  // =====================================================================
  // WIDOK LOGOWANIA DO POKOJU NA TELEFONIE
  // =====================================================================
  if (!hasJoined) {
    return (
      <div
        className={`min-h-full bg-[#120A2A] text-white flex flex-col justify-center items-center ${
          compactMode ? 'p-3' : 'p-5 min-h-screen'
        }`}
      >
        <div className="w-full max-w-md bg-[#1E1242] border-4 border-black rounded-3xl p-6 shadow-brutal">
          {onBackToMenu && (
            <button
              onClick={onBackToMenu}
              className="mb-4 text-xs font-bold bg-white/10 px-3 py-1.5 rounded-xl border border-black"
            >
              ← Powrót do menu
            </button>
          )}

          <div className="flex items-center gap-3 mb-5">
            <span className="bg-party-yellow text-black font-black text-3xl px-3.5 py-1.5 rounded-2xl border-3 border-black shadow-brutal-sm">
              P
            </span>
            <div>
              <h1 className="text-2xl font-black uppercase leading-none">
                Kontroler Gracza
              </h1>
              <p className="text-xs text-purple-200 font-semibold mt-0.5">
                Dołącz swoim smartfonem do gry!
              </p>
            </div>
          </div>

          <form onSubmit={handleJoinSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-black uppercase text-party-yellow block mb-1">
                4-literowy Kod Pokoju (z ekranu TV):
              </label>
              <input
                type="text"
                maxLength={6}
                required
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="np. PKOT"
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
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="np. Potężny Piotrek"
                className="w-full bg-black/60 border-3 border-black rounded-2xl px-4 py-3 text-base font-bold text-white focus:outline-none focus:border-party-green"
              />
            </div>

            <div>
              <label className="text-xs font-black uppercase text-purple-200 block mb-1.5">
                Wybierz P-Awatar:
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
                    <span className="text-[10px] font-black mt-0.5">
                      {av.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-party-green hover:bg-emerald-400 text-black font-black text-xl py-4 rounded-2xl border-4 border-black shadow-brutal uppercase tracking-wider transition active:translate-y-1"
            >
              DOŁĄCZ DO IMPREZY! 🚀
            </button>
          </form>
        </div>
      </div>
    );
  }

  // =====================================================================
  // WIDOK AKTYWNEGO KONTROLERA (PO DOŁĄCZENIU)
  // =====================================================================
  return (
    <div
      className={`bg-[#120A2A] text-white flex flex-col justify-between select-none ${
        compactMode ? 'min-h-[540px] p-3' : 'min-h-screen p-4'
      }`}
    >
      {/* GÓRNY PASEK KONTROLERA */}
      <header className="bg-[#1E1242] border-3 border-black rounded-2xl px-3.5 py-2.5 shadow-brutal-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{avatar}</span>
          <div>
            <div className="font-black text-sm leading-tight">{playerName}</div>
            <div className="text-[10px] font-bold text-party-yellow uppercase">
              {myTeam ? `${myTeam.icon} ${myTeam.name}` : `Pokój ${roomCode}`}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-black/50 px-2.5 py-1 rounded-xl border border-black text-xs font-black text-party-green">
            {myPlayerObj?.score ?? 0} pkt
          </div>
          <span
            className={`p-1.5 rounded-lg border border-black ${
              isConnected
                ? 'bg-party-green/20 text-party-green'
                : 'bg-party-red/30 text-party-red'
            }`}
            title={isConnected ? 'Połączono z Hostem' : 'Łączenie...'}
          >
            {isConnected ? (
              <Wifi className="w-4 h-4" />
            ) : (
              <WifiOff className="w-4 h-4" />
            )}
          </span>
        </div>
      </header>

      {/* ================================================================= */}
      {/* 1. KONTROLER W LOBBY                                              */}
      {/* ================================================================= */}
      {(!gameState || gameState.phase === 'LOBBY') && (
        <main className="my-auto py-6 flex flex-col items-center text-center space-y-5">
          <div className="bg-[#1E1242] border-4 border-black rounded-3xl p-5 w-full shadow-brutal">
            <div className="text-4xl mb-2">{avatar}</div>
            <h2 className="text-xl font-black uppercase text-party-yellow">
              Jesteś w grze, {playerName}!
            </h2>
            <p className="text-xs text-purple-200 mt-1">
              Spójrz na ekran główny Hosta. Gdy wszyscy dołączą, gospodarz
              rozpocznie rundę!
            </p>

            {gameState && gameState.settings.scoringFormat === 'TEAMS' && (
              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="text-xs font-black uppercase text-purple-200 mb-2 flex items-center justify-center gap-1.5">
                  <Users className="w-4 h-4" /> Wybierz swoją drużynę:
                </div>
                <div className="space-y-2">
                  {gameState.teams.map((t) => {
                    const selected = myPlayerObj?.teamId === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => handleSwitchTeam(t.id)}
                        className={`w-full py-3 px-4 rounded-2xl border-3 border-black font-black text-sm uppercase flex items-center justify-between transition ${
                          selected
                            ? 'bg-party-yellow text-black shadow-brutal-sm'
                            : 'bg-black/40 text-white'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-xl">{t.icon}</span>
                          <span>{t.name}</span>
                        </span>
                        {selected && (
                          <span className="text-xs bg-black text-party-yellow px-2 py-0.5 rounded-full">
                            Twoja
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </main>
      )}

      {/* ================================================================= */}
      {/* 2. KONTROLER PRZED RUNDĄ (ROLE_SELECTION)                         */}
      {/* ================================================================= */}
      {gameState?.phase === 'ROLE_SELECTION' && (
        <main className="my-auto py-4 flex flex-col items-center text-center">
          {isMyTurnToSpeak ? (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-[#1E1242] border-4 border-party-yellow rounded-3xl p-6 w-full shadow-brutal"
            >
              <span className="bg-party-yellow text-black font-black text-xs uppercase px-3 py-1 rounded-full border border-black">
                TWOJA KOLEJ!
              </span>
              <h2 className="text-2xl md:text-3xl font-black uppercase mt-3 mb-2">
                Jesteś P-Mówcą! 🎙️
              </h2>
              <p className="text-xs text-purple-200 mb-6">
                Za chwilę na Twoim ekranie pojawi się tajne hasło. Opisuj je na
                głos używając{' '}
                <strong className="text-party-green">
                  WYŁĄCZNIE słów na literę „P”
                </strong>
                !
              </p>

              <button
                onClick={handleSpeakerReady}
                className="w-full bg-party-green hover:bg-emerald-400 text-black font-black text-xl py-5 rounded-2xl border-4 border-black shadow-brutal uppercase tracking-wider active:translate-y-1 transition"
              >
                POKAŻ HASŁO I STARTUJ! 🚀
              </button>
            </motion.div>
          ) : (
            <div className="bg-[#1E1242] border-4 border-black rounded-3xl p-6 w-full shadow-brutal">
              <div className="text-5xl mb-3">
                {activeSpeaker?.avatar || '🎙️'}
              </div>
              <h2 className="text-xl font-black uppercase text-party-yellow">
                Teraz opisuje: {activeSpeaker?.name}
              </h2>
              <p className="text-xs text-purple-200 mt-2">
                {isMyTeamGuessing
                  ? 'To Twoja drużyna! Słuchaj uważnie i zgaduj hasła na głos!'
                  : 'Przygotuj kciuk na WIELKIM CZERWONYM BUZZERZE! Jeśli usłyszysz jakiekolwiek słowo nie na „P” – wciskaj!'}
              </p>
            </div>
          )}
        </main>
      )}

      {/* ================================================================= */}
      {/* 3. AKTYWNA RUNDA: WIDOK P-MÓWCY vs WIDOK POZOSTAŁYCH GRACZY       */}
      {/* ================================================================= */}
      {gameState?.phase === 'ROUND_ACTIVE' && (
        <main className="flex-1 flex flex-col justify-between my-3 gap-3">
          {/* Pasek czasu na telefonie */}
          <div className="flex items-center justify-between bg-black/50 border-2 border-black rounded-2xl px-4 py-2">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase text-purple-200">
              <Clock className="w-4 h-4 text-party-yellow" /> Pozostały czas:
            </div>
            <div
              className={`text-xl font-black px-3 py-0.5 rounded-xl border border-black ${
                gameState.timeLeft <= 10
                  ? 'bg-party-red text-white animate-pulse'
                  : 'bg-party-yellow text-black'
              }`}
            >
              {gameState.timeLeft}s
            </div>
          </div>

          {isMyTurnToSpeak ? (
            /* ============================================================= */
            /* WIDOK TELEFONU P-MÓWCY (TAJNE HASŁO + [ZGADNIĘTE] + [PAS])    */
            /* ============================================================= */
            <div className="flex-1 flex flex-col justify-between gap-3">
              <motion.div
                key={gameState.currentWord?.id}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-party-yellow text-black border-4 border-black rounded-3xl p-5 shadow-brutal text-center flex-1 flex flex-col justify-center relative"
              >
                <div className="inline-block mx-auto bg-black text-party-yellow text-[11px] font-black uppercase px-3 py-1 rounded-full mb-2">
                  {gameState.currentWord?.category}
                </div>

                <div className="text-xs uppercase font-bold text-black/70 mb-1">
                  Opisz wyłącznie słowami na „P”:
                </div>
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-tight my-2 break-words">
                  {gameState.currentWord?.word}
                </h2>

                {/* Podpowiedź inspiracji na P */}
                {gameState.currentWord?.pHint && (
                  <div className="mt-3">
                    {!showHint ? (
                      <button
                        type="button"
                        onClick={() => setShowHint(true)}
                        className="inline-flex items-center gap-1.5 bg-black/15 hover:bg-black/25 text-black font-black text-xs px-3 py-1.5 rounded-xl border border-black/40 transition"
                      >
                        <Lightbulb className="w-3.5 h-3.5" /> Pokaż podpowiedź
                        słów na P
                      </button>
                    ) : (
                      <div className="bg-white/80 border-2 border-black rounded-xl p-2.5 text-xs font-bold text-left">
                        <span className="font-black uppercase text-purple-900 block mb-0.5">
                          💡 Trop na P:
                        </span>
                        {gameState.currentWord.pHint}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>

              {/* OGROMNE PRZYCISKI DOTYKOWE P-MÓWCY */}
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={handleWordGuessed}
                  className="w-full bg-party-green hover:bg-emerald-400 active:scale-95 text-black font-black text-2xl py-6 rounded-3xl border-4 border-black shadow-brutal uppercase tracking-wider flex items-center justify-center gap-2 transition"
                >
                  <Check className="w-8 h-8 stroke-[3]" />
                  ZGADNIĘTE! (+1 PKT)
                </button>

                <button
                  type="button"
                  disabled={gameState.passesRemaining <= 0}
                  onClick={handleWordPassed}
                  className={`w-full font-black text-lg py-4 rounded-2xl border-4 border-black uppercase flex items-center justify-center gap-2 transition ${
                    gameState.passesRemaining > 0
                      ? 'bg-party-orange hover:bg-orange-400 text-black shadow-brutal-sm active:scale-95'
                      : 'bg-gray-700 text-gray-400 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <SkipForward className="w-6 h-6" />
                  PAS – POMIŃ HASŁO ({gameState.passesRemaining}/
                  {gameState.settings.maxPassesPerRound})
                </button>
              </div>
            </div>
          ) : (
            /* ============================================================= */
            /* WIDOK POZOSTAŁYCH GRACZY (WIELKI BUZZER + WPISYWANIE HASŁA)   */
            /* ============================================================= */
            <div className="flex-1 flex flex-col justify-between gap-3">
              <div className="bg-[#1E1242] border-3 border-black rounded-2xl p-3 text-center">
                <div className="text-xs font-bold text-purple-200">
                  Mówi teraz:{' '}
                  <strong className="text-party-yellow">
                    {activeSpeaker?.avatar} {activeSpeaker?.name}
                  </strong>
                </div>
                <div className="text-sm font-black uppercase text-white mt-0.5">
                  Kategoria: {gameState.currentWord?.category}
                </div>
              </div>

              {/* WIELKI CZERWONY PRZYCISK BUZZERA */}
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                animate={
                  buzzerPressedAnim ? { scale: [1, 0.9, 1.06, 1] } : { scale: 1 }
                }
                onClick={handleBuzzerFoul}
                className="flex-1 min-h-[210px] w-full bg-party-red hover:bg-rose-600 text-white border-8 border-black rounded-3xl shadow-brutal-lg flex flex-col items-center justify-center p-5 text-center transition active:translate-y-1"
              >
                <AlertOctagon className="w-16 h-16 text-party-yellow mb-2 animate-pulse" />
                <span className="text-2xl sm:text-3xl font-black uppercase leading-tight drop-shadow-[0_3px_0_rgba(0,0,0,1)]">
                  BŁĄD! TO NIE NA „P”!
                </span>
                <span className="text-xs font-bold bg-black/40 px-3 py-1 rounded-full mt-2 text-party-yellow">
                  Wciśnij natychmiast, gdy P-Mówca powie słowo nie na P! (-
                  {gameState.settings.foulPenaltySeconds}s)
                </span>
              </motion.button>

              {/* Formularz szybkiego zgadywania tekstowego na telefonie */}
              <form
                onSubmit={handleSendTextGuess}
                className="bg-[#1E1242] border-3 border-black rounded-2xl p-2.5 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={guessInput}
                  onChange={(e) => setGuessInput(e.target.value)}
                  placeholder="Wpisz zgadywane hasło..."
                  className="flex-1 bg-black/50 border-2 border-black rounded-xl px-3 py-2.5 text-sm font-bold text-white focus:outline-none focus:border-party-yellow"
                />
                <button
                  type="submit"
                  className="bg-party-green text-black font-black px-4 py-2.5 rounded-xl border-2 border-black shadow-brutal-sm flex items-center gap-1 text-xs uppercase"
                >
                  <Send className="w-4 h-4" /> Zgaduj
                </button>
              </form>
            </div>
          )}
        </main>
      )}

      {/* ================================================================= */}
      {/* 4. KONTROLER W PODSUMOWANIU RUNDY I FINALE                        */}
      {/* ================================================================= */}
      {(gameState?.phase === 'ROUND_SUMMARY' ||
        gameState?.phase === 'GAME_OVER') && (
        <main className="my-auto py-6 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={gameState.phase}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#1E1242] border-4 border-black rounded-3xl p-6 shadow-brutal"
            >
              <Sparkles className="w-12 h-12 text-party-yellow mx-auto mb-2" />
              <h2 className="text-2xl font-black uppercase text-party-yellow">
                {gameState.phase === 'GAME_OVER'
                  ? 'Koniec Gry! Spójrz na Podium!'
                  : 'Koniec Czasu Rundy!'}
              </h2>
              <p className="text-xs text-purple-200 mt-2">
                Twoje statystyki indywidualne:
              </p>

              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="bg-black/40 border-2 border-black rounded-xl p-2.5">
                  <div className="text-xl font-black text-party-green">
                    {myPlayerObj?.stats.wordsDescribed ?? 0}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-gray-300">
                    Opisane
                  </div>
                </div>
                <div className="bg-black/40 border-2 border-black rounded-xl p-2.5">
                  <div className="text-xl font-black text-party-red">
                    {myPlayerObj?.stats.foulCountAsSpeaker ?? 0}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-gray-300">
                    Wpadki
                  </div>
                </div>
                <div className="bg-black/40 border-2 border-black rounded-xl p-2.5">
                  <div className="text-xl font-black text-party-blue">
                    {myPlayerObj?.stats.caughtOthersCount ?? 0}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-gray-300">
                    Złapani
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      )}

      {/* STOPKA KONTROLERA */}
      <footer className="text-center text-[10px] text-purple-300/70 font-bold pt-1">
        GRA NA P • Pokój: {roomCode} • Każde słowo na P!
      </footer>
    </div>
  );
}
