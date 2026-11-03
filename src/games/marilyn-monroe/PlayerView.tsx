'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  SkipForward,
  AlertOctagon,
  Wifi,
  WifiOff,
  Clock,
  Sparkles,
  Users,
  ShieldAlert,
  Flame,
} from 'lucide-react';
import type { PlayerViewProps } from '@/core/types';
import { soundEngine } from '@/core/sound';
import type { MarilynAction, MarilynState } from './types';

export default function PlayerView({
  state: gameState,
  me,
  roomCode,
  isConnected,
  send,
}: PlayerViewProps<MarilynState, MarilynAction>) {
  const playerId = me.id;
  const playerName = me.name;
  const avatar = me.avatar;

  const [buzzerPressedAnim, setBuzzerPressedAnim] = useState(false);

  const myPlayerObj = gameState?.players.find((p) => p.id === playerId);
  const isMyTurnToSpeak = gameState?.activeSpeakerId === playerId;
  const activeSpeaker = gameState?.players.find(
    (p) => p.id === gameState?.activeSpeakerId
  );
  const myTeam = gameState?.teams.find((t) => t.id === myPlayerObj?.teamId);
  const activeTeam = gameState ? gameState.teams[gameState.activeTeamIndex] : null;

  const isMyTeamGuessing =
    gameState?.settings.scoringFormat === 'TEAMS' &&
    myTeam &&
    activeTeam &&
    myTeam.id === activeTeam.id &&
    !isMyTurnToSpeak;

  const handleSwitchTeam = (teamId: string) => {
    soundEngine.vibrate(40);
    send({ type: 'SWITCH_TEAM', payload: { playerId, teamId } });
  };

  const handleSpeakerReady = () => {
    soundEngine.vibrate(80);
    send({ type: 'SPEAKER_READY', payload: { playerId } });
  };

  const handleCardGuessed = () => {
    soundEngine.vibrate(100);
    send({ type: 'CARD_GUESSED', payload: { playerId } });
  };

  const handleCardPassed = () => {
    soundEngine.vibrate(50);
    send({ type: 'CARD_PASSED', payload: { playerId } });
  };

  const handleBuzzerTaboo = () => {
    soundEngine.vibrate(200);
    setBuzzerPressedAnim(true);
    setTimeout(() => setBuzzerPressedAnim(false), 500);
    send({
      type: 'BUZZER_TABOO',
      payload: {
        byPlayerId: playerId,
        byPlayerName: playerName || 'Gracz',
        byAvatar: avatar,
      },
    });
  };

  return (
    <div className="bg-[#120A2A] text-white flex flex-col justify-between select-none min-h-screen p-4">
      {/* PASEK GÓRNY KONTROLERA */}
      <header className="bg-[#1E1242] border-3 border-black rounded-2xl px-3.5 py-2.5 shadow-brutal-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{avatar}</span>
          <div>
            <div className="font-black text-sm leading-tight">{playerName}</div>
            <div className="text-[10px] font-bold text-party-red uppercase">
              {myTeam ? `${myTeam.icon} ${myTeam.name}` : `Marilyn Monroe • ${roomCode}`}
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
            {isConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
          </span>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 1. LOBBY                                                                  */}
      {/* ========================================================================= */}
      {(!gameState || gameState.phase === 'LOBBY') && (
        <main className="my-auto py-6 flex flex-col items-center text-center space-y-5">
          <div className="bg-[#1E1242] border-4 border-black rounded-3xl p-5 w-full shadow-brutal">
            <div className="text-4xl mb-2">{avatar}</div>
            <h2 className="text-xl font-black uppercase text-party-yellow">
              Jesteś w grze, {playerName}!
            </h2>
            <p className="text-xs text-purple-200 mt-1">
              Gra w Tabu: Marilyn Monroe. Spójrz na ekran TV. Host wkrótce wystartuje rundę!
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

      {/* ========================================================================= */}
      {/* 2. ROLE_SELECTION                                                         */}
      {/* ========================================================================= */}
      {gameState?.phase === 'ROLE_SELECTION' && (
        <main className="my-auto py-4 flex flex-col items-center text-center">
          {isMyTurnToSpeak ? (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-[#1E1242] border-4 border-party-red rounded-3xl p-6 w-full shadow-brutal"
            >
              <span className="bg-party-red text-white font-black text-xs uppercase px-3 py-1 rounded-full border border-black">
                TWOJA KOLEJ!
              </span>
              <h2 className="text-2xl md:text-3xl font-black uppercase mt-3 mb-2">
                Jesteś Opisującym! 🎭
              </h2>
              <p className="text-xs text-purple-200 mb-6">
                Za chwilę zobaczysz postać oraz <strong className="text-party-red">3 ZAKAZANE SŁOWA</strong>. Pod żadnym pozorem ich nie wypowiadaj, bo przeciwnicy wcisną czerwony przycisk!
              </p>

              <button
                onClick={handleSpeakerReady}
                className="w-full bg-party-green hover:bg-emerald-400 text-black font-black text-xl py-5 rounded-2xl border-4 border-black shadow-brutal uppercase tracking-wider active:translate-y-1 transition"
              >
                POKAŻ POSTAĆ I STARTUJ! 🚀
              </button>
            </motion.div>
          ) : (
            <div className="bg-[#1E1242] border-4 border-black rounded-3xl p-6 w-full shadow-brutal">
              <div className="text-5xl mb-3">{activeSpeaker?.avatar || '🎭'}</div>
              <h2 className="text-xl font-black uppercase text-party-yellow">
                Teraz opisuje: {activeSpeaker?.name}
              </h2>
              <p className="text-xs text-purple-200 mt-2">
                {isMyTeamGuessing
                  ? 'To Twoja drużyna! Słuchaj uważnie i zgaduj postać na głos!'
                  : 'Jesteś Cenzorem / Strażnikiem Tabu! Za chwilę zobaczysz te same zakazane słowa na swoim ekranie – słuchaj pilnie i bądź gotów wcisnąć Buzzer!'}
              </p>
            </div>
          )}
        </main>
      )}

      {/* ========================================================================= */}
      {/* 3. ROUND_ACTIVE                                                           */}
      {/* ========================================================================= */}
      {gameState?.phase === 'ROUND_ACTIVE' && (
        <main className="flex-1 flex flex-col justify-between my-3 gap-3">
          {/* Timer */}
          <div className="flex items-center justify-between bg-black/50 border-2 border-black rounded-2xl px-4 py-2">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase text-purple-200">
              <Clock className="w-4 h-4 text-party-yellow" /> Pozostały czas:
            </div>
            <div
              className={`text-xl font-black px-3 py-0.5 rounded-xl border border-black ${
                gameState.timeLeft <= 15
                  ? 'bg-party-red text-white animate-pulse'
                  : 'bg-party-yellow text-black'
              }`}
            >
              {gameState.timeLeft}s
            </div>
          </div>

          {/* A. WIDOK OPISUJĄCEGO */}
          {isMyTurnToSpeak ? (
            <div className="flex-1 flex flex-col justify-between gap-3">
              <motion.div
                key={gameState.currentCard?.id}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-party-yellow text-black border-4 border-black rounded-3xl p-5 shadow-brutal text-center flex-1 flex flex-col justify-center"
              >
                <div className="inline-block mx-auto bg-black text-party-yellow text-[11px] font-black uppercase px-3 py-1 rounded-full mb-1">
                  {gameState.currentCard?.category}
                </div>

                <div className="text-xs uppercase font-bold text-black/70 mt-1">
                  Opisz drużynie postać:
                </div>
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-tight my-2 break-words">
                  {gameState.currentCard?.name}
                </h2>

                {/* 3 ZAKAZANE SŁOWA */}
                <div className="mt-3 bg-party-red border-3 border-black rounded-2xl p-3 text-white">
                  <div className="text-[11px] font-black uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
                    <AlertOctagon className="w-4 h-4 text-party-yellow" /> 3 ZAKAZANE SŁOWA (TABU):
                  </div>
                  <div className="space-y-1">
                    {gameState.currentCard?.forbidden.map((word, idx) => (
                      <div
                        key={idx}
                        className="bg-black/40 border border-white/20 rounded-xl py-1 px-2 font-black text-sm uppercase text-party-yellow"
                      >
                        ❌ {word}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Przyciski sterujące opisującego */}
              <div className="grid grid-cols-1 gap-2.5">
                <button
                  type="button"
                  onClick={handleCardGuessed}
                  className="w-full bg-party-green hover:bg-emerald-400 active:scale-95 text-black font-black text-2xl py-5 rounded-3xl border-4 border-black shadow-brutal uppercase tracking-wider flex items-center justify-center gap-2 transition"
                >
                  <Check className="w-8 h-8 stroke-[3]" />
                  ZGADNIĘTE! (+1)
                </button>

                <button
                  type="button"
                  disabled={gameState.passesRemaining <= 0}
                  onClick={handleCardPassed}
                  className={`w-full font-black text-base py-3.5 rounded-2xl border-4 border-black uppercase flex items-center justify-center gap-2 transition ${
                    gameState.passesRemaining > 0
                      ? 'bg-party-orange hover:bg-orange-400 text-black shadow-brutal-sm active:scale-95'
                      : 'bg-gray-700 text-gray-400 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <SkipForward className="w-5 h-5" />
                  PAS ({gameState.passesRemaining}/{gameState.settings.maxPassesPerRound})
                </button>
              </div>
            </div>
          ) : isMyTeamGuessing ? (
            /* B. WIDOK CZŁONKÓW DRUŻYNY ZGADUJĄCEJ (NIE WIDZĄ HASŁA!) */
            <div className="flex-1 flex flex-col justify-center items-center text-center p-4 bg-[#1E1242] border-4 border-black rounded-3xl shadow-brutal">
              <div className="text-6xl mb-3 animate-pulse">👂</div>
              <h2 className="text-2xl font-black uppercase text-party-yellow">
                Słuchaj i zgaduj na głos!
              </h2>
              <p className="text-sm text-purple-200 mt-2 max-w-xs">
                {activeSpeaker?.name} opisuje postać! Krzyczcie swoje propozycje, a gdy traficie – Opisujący kliknie Zgadnięte!
              </p>
              <div className="mt-4 bg-black/40 border-2 border-black rounded-xl p-3 text-xs font-bold text-gray-300">
                Kategoria postaci na TV:{' '}
                <strong className="text-party-yellow uppercase">
                  {gameState.currentCard?.category}
                </strong>
              </div>
            </div>
          ) : (
            /* C. WIDOK PRZECIWNIKÓW / CENZORÓW (WIDZĄ HASŁO, SŁOWA TABU I MAJĄ WIELKI BUZZER) */
            <div className="flex-1 flex flex-col justify-between gap-3">
              {/* Karta z zakazanymi słowami */}
              <div className="bg-[#1E1242] border-3 border-black rounded-2xl p-3 text-center">
                <div className="text-xs uppercase font-bold text-gray-400">
                  Opisywana postać:
                </div>
                <div className="text-xl font-black uppercase text-party-yellow">
                  {gameState.currentCard?.name}
                </div>

                <div className="mt-2 bg-black/50 border-2 border-party-red rounded-xl p-2 text-left">
                  <div className="text-[10px] font-black uppercase text-party-red mb-1">
                    Pilnuj tych 3 zakazanych słów:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {gameState.currentCard?.forbidden.map((word, idx) => (
                      <span
                        key={idx}
                        className="bg-party-red/30 border border-party-red text-white font-black text-xs px-2 py-0.5 rounded-lg"
                      >
                        ❌ {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* WIELKI PRZYCISK BUZZERA TABU */}
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                animate={
                  buzzerPressedAnim ? { scale: [1, 0.9, 1.06, 1] } : { scale: 1 }
                }
                onClick={handleBuzzerTaboo}
                className="flex-1 min-h-[200px] w-full bg-party-red hover:bg-rose-600 text-white border-8 border-black rounded-3xl shadow-brutal-lg flex flex-col items-center justify-center p-5 text-center transition active:translate-y-1"
              >
                <AlertOctagon className="w-16 h-16 text-party-yellow mb-2 animate-pulse" />
                <span className="text-3xl font-black uppercase leading-tight drop-shadow-[0_3px_0_rgba(0,0,0,1)]">
                  ZŁAMAŁ TABU!
                </span>
                <span className="text-xs font-bold bg-black/40 px-3 py-1 rounded-full mt-2 text-party-yellow">
                  Wciśnij, gdy opisujący wypowie zakazane słowo! (-{gameState.settings.tabooPenaltySeconds}s)
                </span>
              </motion.button>
            </div>
          )}
        </main>
      )}

      {/* ========================================================================= */}
      {/* 4. ROUND_SUMMARY & GAME_OVER                                              */}
      {/* ========================================================================= */}
      {(gameState?.phase === 'ROUND_SUMMARY' || gameState?.phase === 'GAME_OVER') && (
        <main className="my-auto py-6 text-center">
          <motion.div
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
              Twoje statystyki w Marilyn Monroe:
            </p>

            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="bg-black/40 border-2 border-black rounded-xl p-2.5">
                <div className="text-xl font-black text-party-green">
                  {myPlayerObj?.stats.cardsDescribed ?? 0}
                </div>
                <div className="text-[10px] uppercase font-bold text-gray-300">
                  Odgadnięte
                </div>
              </div>
              <div className="bg-black/40 border-2 border-black rounded-xl p-2.5">
                <div className="text-xl font-black text-party-red">
                  {myPlayerObj?.stats.tabooViolationsAsDescriber ?? 0}
                </div>
                <div className="text-[10px] uppercase font-bold text-gray-300">
                  Wpadki Tabu
                </div>
              </div>
              <div className="bg-black/40 border-2 border-black rounded-xl p-2.5">
                <div className="text-xl font-black text-party-blue">
                  {myPlayerObj?.stats.tabooCaughtCount ?? 0}
                </div>
                <div className="text-[10px] uppercase font-bold text-gray-300">
                  Złapani
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      )}

      {/* STOPKA */}
      <footer className="text-center text-[10px] text-purple-300/70 font-bold pt-1">
        MARILYN MONROE (TABU) • Pokój: {roomCode}
      </footer>
    </div>
  );
}
