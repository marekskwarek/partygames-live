import { normalizePolishText } from '@/core/text';
import type { GameContext, RoomPlayer } from '@/core/types';
import { ALL_CATEGORIES, DEFAULT_TEAMS, INITIAL_WORDS } from './words';
import type {
  GameAction,
  GameSettings,
  GameState,
  Player,
  PlayerStats,
  RoundLogEntry,
  Team,
  WordCategory,
  WordItem,
} from './types';

export const DEFAULT_SETTINGS: GameSettings = {
  roundDuration: 60,
  totalRounds: 3,
  teamCount: 2,
  scoringFormat: 'TEAMS',
  difficulty: 'ALL',
  selectedCategories: [...ALL_CATEGORIES],
  maxPassesPerRound: 2,
  foulPenaltySeconds: 10,
  foulPenaltyPoints: 1,
};

const emptyStats = (): PlayerStats => ({
  wordsDescribed: 0,
  foulCountAsSpeaker: 0,
  caughtOthersCount: 0,
  passesUsed: 0,
  correctTextGuesses: 0,
});

function leastPopulatedTeam(teams: Team[], players: Player[]): string {
  const counts = teams.map((t) => ({
    id: t.id,
    count: players.filter((p) => p.teamId === t.id).length,
  }));
  counts.sort((a, b) => a.count - b.count);
  return counts[0]?.id ?? 'team-1';
}

/** Dba o to, by każdy gracz należał do istniejącej drużyny (lub do 'ffa'). */
function normalizeTeams(state: GameState): GameState {
  const ffa = state.settings.scoringFormat === 'FFA';
  const validIds = new Set(state.teams.map((t) => t.id));
  const players: Player[] = [];
  for (const p of state.players) {
    if (ffa) {
      players.push(p.teamId === 'ffa' ? p : { ...p, teamId: 'ffa' });
    } else if (validIds.has(p.teamId)) {
      players.push(p);
    } else {
      players.push({ ...p, teamId: leastPopulatedTeam(state.teams, players) });
    }
  }
  return { ...state, players };
}

export function createInitialState(
  roomPlayers: RoomPlayer[],
  roomCode: string
): GameState {
  const base: GameState = {
    roomCode,
    phase: 'LOBBY',
    settings: { ...DEFAULT_SETTINGS },
    teams: DEFAULT_TEAMS.slice(0, 2).map((t) => ({ ...t, score: 0 })),
    players: [],
    customWords: [],
    usedWordIds: [],
    currentRoundNumber: 1,
    totalTurnsPlayed: 0,
    activeTeamIndex: 0,
    activeSpeakerId: null,
    currentWord: null,
    timeLeft: DEFAULT_SETTINGS.roundDuration,
    isPaused: false,
    passesRemaining: DEFAULT_SETTINGS.maxPassesPerRound,
    roundScoreDelta: 0,
    roundLogs: [],
    lastFoulAlert: null,
    recentGuesses: [],
    foulCooldownUntil: 0,
  };
  return syncPlayers(base, roomPlayers);
}

/** Dołącza nowych graczy z pokoju i odświeża profile/połączenie istniejących. */
export function syncPlayers(
  state: GameState,
  roomPlayers: RoomPlayer[]
): GameState {
  let changed = false;
  const players = [...state.players];

  for (const rp of roomPlayers) {
    const idx = players.findIndex((p) => p.id === rp.id);
    if (idx === -1) {
      players.push({
        id: rp.id,
        name: rp.name,
        avatar: rp.avatar,
        teamId:
          state.settings.scoringFormat === 'FFA'
            ? 'ffa'
            : leastPopulatedTeam(state.teams, players),
        score: 0,
        isConnected: rp.isConnected,
        lastSeen: rp.lastSeen,
        stats: emptyStats(),
      });
      changed = true;
    } else {
      const p = players[idx];
      if (
        p.name !== rp.name ||
        p.avatar !== rp.avatar ||
        p.isConnected !== rp.isConnected
      ) {
        players[idx] = {
          ...p,
          name: rp.name,
          avatar: rp.avatar,
          isConnected: rp.isConnected,
          lastSeen: rp.lastSeen,
        };
        changed = true;
      }
    }
  }
  return changed ? { ...state, players } : state;
}

// Losuje kolejne nieużyte hasło zgodnie z wybranymi kategoriami i trudnością
export function pickNextWord(state: GameState): {
  word: WordItem;
  updatedUsedIds: string[];
} {
  const allPool: WordItem[] = [...INITIAL_WORDS, ...state.customWords];

  const filteredPool = allPool.filter((w) => {
    const catMatch =
      w.category === 'Własne Hasła' ||
      state.settings.selectedCategories.includes(w.category as WordCategory);
    const diffMatch =
      state.settings.difficulty === 'ALL' ||
      w.difficulty === state.settings.difficulty;
    return catMatch && diffMatch;
  });

  const effectivePool = filteredPool.length > 0 ? filteredPool : allPool;
  let available = effectivePool.filter((w) => !state.usedWordIds.includes(w.id));

  let updatedUsedIds = [...state.usedWordIds];
  if (available.length === 0) {
    // Wszystkie hasła z puli zostały użyte – resetujemy historię
    available = effectivePool;
    updatedUsedIds = [];
  }

  const chosen = available[Math.floor(Math.random() * available.length)];
  updatedUsedIds.push(chosen.id);
  return { word: chosen, updatedUsedIds };
}

// Wyznacza kolejnego P-Mówcę (drużynowo lub każdy na każdego), pomijając rozłączonych
export function pickNextSpeaker(
  state: GameState,
  nextTeamIdx: number
): string | null {
  if (state.players.length === 0) return null;

  const prefer = (list: Player[]) => {
    const connected = list.filter((p) => p.isConnected);
    return connected.length > 0 ? connected : list;
  };

  if (state.settings.scoringFormat === 'FFA') {
    const pool = prefer(state.players);
    return pool[state.totalTurnsPlayed % pool.length].id;
  }

  const targetTeam = state.teams[nextTeamIdx];
  const teamPlayers = targetTeam
    ? prefer(state.players.filter((p) => p.teamId === targetTeam.id))
    : [];
  if (teamPlayers.length === 0) {
    const pool = prefer(state.players);
    return pool[state.totalTurnsPlayed % pool.length].id;
  }

  const turnInTeam = Math.floor(state.totalTurnsPlayed / state.teams.length);
  return teamPlayers[turnInTeam % teamPlayers.length].id;
}

function startRound(state: GameState, ctx: GameContext): GameState {
  const { word, updatedUsedIds } = pickNextWord(state);
  ctx.emit('ROUND_START');
  return {
    ...state,
    phase: 'ROUND_ACTIVE',
    currentWord: word,
    usedWordIds: updatedUsedIds,
    timeLeft: state.settings.roundDuration,
    isPaused: false,
    passesRemaining: state.settings.maxPassesPerRound,
    roundScoreDelta: 0,
    roundLogs: [],
    lastFoulAlert: null,
    recentGuesses: [],
  };
}

function resetForNewGame(state: GameState): GameState {
  return {
    ...state,
    phase: 'LOBBY',
    currentRoundNumber: 1,
    totalTurnsPlayed: 0,
    activeTeamIndex: 0,
    activeSpeakerId: null,
    currentWord: null,
    usedWordIds: [],
    roundLogs: [],
    lastFoulAlert: null,
    recentGuesses: [],
    isPaused: false,
    teams: state.teams.map((t) => ({ ...t, score: 0 })),
    players: state.players.map((p) => ({
      ...p,
      score: 0,
      stats: emptyStats(),
    })),
  };
}

const logId = (now: number) => `log-${now}-${Math.random().toString(36).slice(2, 7)}`;

export function reduce(
  state: GameState,
  action: GameAction,
  ctx: GameContext
): GameState {
  const now = ctx.now;

  // Akcje Hosta
  if (action.type.startsWith('HOST_')) {
    if (!ctx.fromHost) return state;

    switch (action.type) {
      case 'HOST_UPDATE_SETTINGS': {
        if (state.phase !== 'LOBBY') return state;
        const merged = { ...state.settings, ...action.payload.partial };
        let teams = state.teams;
        if (merged.teamCount !== state.teams.length) {
          teams = DEFAULT_TEAMS.slice(0, merged.teamCount).map((t) => ({
            ...t,
            score: 0,
          }));
        }
        return normalizeTeams({
          ...state,
          settings: merged,
          teams,
          timeLeft: merged.roundDuration,
        });
      }

      case 'HOST_START_GAME': {
        if (state.phase !== 'LOBBY' || state.players.length === 0) return state;
        const temp: GameState = {
          ...state,
          currentRoundNumber: 1,
          totalTurnsPlayed: 0,
          activeTeamIndex: 0,
        };
        return {
          ...temp,
          phase: 'ROLE_SELECTION',
          activeSpeakerId: pickNextSpeaker(temp, 0),
          lastFoulAlert: null,
        };
      }

      case 'HOST_START_ROUND':
        if (state.phase !== 'ROLE_SELECTION') return state;
        return startRound(state, ctx);

      case 'HOST_TOGGLE_PAUSE':
        if (state.phase !== 'ROUND_ACTIVE') return state;
        return { ...state, isPaused: !state.isPaused };

      case 'HOST_NEXT_TURN': {
        if (state.phase !== 'ROUND_SUMMARY') return state;
        const nextTurnsPlayed = state.totalTurnsPlayed + 1;
        const turnsPerRound =
          state.settings.scoringFormat === 'FFA'
            ? Math.max(2, state.players.length)
            : state.teams.length;

        if (nextTurnsPlayed >= state.settings.totalRounds * turnsPerRound) {
          ctx.emit('FANFARE');
          return { ...state, totalTurnsPlayed: nextTurnsPlayed, phase: 'GAME_OVER' };
        }

        const nextTeamIndex =
          state.settings.scoringFormat === 'FFA'
            ? 0
            : nextTurnsPlayed % state.teams.length;
        const updated: GameState = {
          ...state,
          totalTurnsPlayed: nextTurnsPlayed,
          currentRoundNumber: Math.floor(nextTurnsPlayed / turnsPerRound) + 1,
          activeTeamIndex: nextTeamIndex,
        };
        return {
          ...updated,
          phase: 'ROLE_SELECTION',
          activeSpeakerId: pickNextSpeaker(updated, nextTeamIndex),
          currentWord: null,
          lastFoulAlert: null,
        };
      }

      case 'HOST_PLAY_AGAIN':
        return resetForNewGame(state);

      case 'HOST_ADD_CUSTOM_WORD': {
        const single = action.payload.word.trim().split(/\s+/)[0];
        if (!single) return state;
        const item: WordItem = {
          id: `custom-${now}-${Math.random().toString(36).slice(2, 6)}`,
          word: single,
          category: 'Własne Hasła',
          difficulty: 'MEDIUM',
          pHint:
            action.payload.hint?.trim() ||
            'Własne hasło gospodarza! Pamiętaj: każde słowo na P!',
        };
        return { ...state, customWords: [item, ...state.customWords] };
      }
    }
    return state;
  }

  // Akcje graczy
  switch (action.type) {
    case 'SWITCH_TEAM': {
      const { playerId, teamId } = action.payload;
      if (state.phase !== 'LOBBY') return state;
      if (!state.teams.some((t) => t.id === teamId)) return state;
      return {
        ...state,
        players: state.players.map((p) =>
          p.id === playerId ? { ...p, teamId } : p
        ),
      };
    }

    case 'SPEAKER_READY': {
      if (state.phase !== 'ROLE_SELECTION') return state;
      if (state.activeSpeakerId && action.payload.playerId !== state.activeSpeakerId) {
        return state;
      }
      return startRound(state, ctx);
    }

    case 'WORD_GUESSED': {
      if (state.phase !== 'ROUND_ACTIVE' || !state.currentWord) return state;
      if (action.payload.playerId !== state.activeSpeakerId) return state;

      const { word, updatedUsedIds } = pickNextWord(state);
      ctx.emit('SUCCESS');

      const teams =
        state.settings.scoringFormat === 'TEAMS'
          ? state.teams.map((t, idx) =>
              idx === state.activeTeamIndex ? { ...t, score: t.score + 1 } : t
            )
          : state.teams;

      const players = state.players.map((p) =>
        p.id === state.activeSpeakerId
          ? {
              ...p,
              score: p.score + 1,
              stats: { ...p.stats, wordsDescribed: p.stats.wordsDescribed + 1 },
            }
          : p
      );

      const entry: RoundLogEntry = {
        id: logId(now),
        timestamp: now,
        type: 'GUESSED',
        word: state.currentWord.word,
        category: state.currentWord.category,
        actorName: state.teams[state.activeTeamIndex]?.name,
        pointsDelta: 1,
      };

      return {
        ...state,
        teams,
        players,
        currentWord: word,
        usedWordIds: updatedUsedIds,
        roundScoreDelta: state.roundScoreDelta + 1,
        roundLogs: [entry, ...state.roundLogs],
      };
    }

    case 'WORD_PASSED': {
      if (state.phase !== 'ROUND_ACTIVE' || !state.currentWord) return state;
      if (action.payload.playerId !== state.activeSpeakerId) return state;
      if (state.passesRemaining <= 0) return state;

      const { word, updatedUsedIds } = pickNextWord(state);
      ctx.emit('PASS');

      const entry: RoundLogEntry = {
        id: logId(now),
        timestamp: now,
        type: 'PASS',
        word: state.currentWord.word,
        category: state.currentWord.category,
        pointsDelta: 0,
      };

      return {
        ...state,
        players: state.players.map((p) =>
          p.id === state.activeSpeakerId
            ? { ...p, stats: { ...p.stats, passesUsed: p.stats.passesUsed + 1 } }
            : p
        ),
        currentWord: word,
        usedWordIds: updatedUsedIds,
        passesRemaining: state.passesRemaining - 1,
        roundLogs: [entry, ...state.roundLogs],
      };
    }

    case 'BUZZER_FOUL': {
      if (state.phase !== 'ROUND_ACTIVE' || !state.currentWord) return state;
      if (action.payload.byPlayerId === state.activeSpeakerId) return state;
      // Cooldown (2,2 s) – kilka osób naraz nie odejmie 50 sekund
      if (now < state.foulCooldownUntil) return state;

      ctx.emit('BUZZER');

      const penaltySec = state.settings.foulPenaltySeconds;
      const penaltyPts = state.settings.foulPenaltyPoints;
      const newTimeLeft = Math.max(0, state.timeLeft - penaltySec);

      const teams =
        state.settings.scoringFormat === 'TEAMS'
          ? state.teams.map((t, idx) =>
              idx === state.activeTeamIndex
                ? { ...t, score: Math.max(0, t.score - penaltyPts) }
                : t
            )
          : state.teams;

      const players = state.players.map((p) => {
        if (p.id === state.activeSpeakerId) {
          return {
            ...p,
            score: Math.max(0, p.score - penaltyPts),
            stats: { ...p.stats, foulCountAsSpeaker: p.stats.foulCountAsSpeaker + 1 },
          };
        }
        if (p.id === action.payload.byPlayerId) {
          return {
            ...p,
            stats: { ...p.stats, caughtOthersCount: p.stats.caughtOthersCount + 1 },
          };
        }
        return p;
      });

      const foulWord = state.currentWord.word;
      const { word: nextWord, updatedUsedIds } = pickNextWord(state);

      const entry: RoundLogEntry = {
        id: logId(now),
        timestamp: now,
        type: 'FOUL',
        word: foulWord,
        category: state.currentWord.category,
        actorName: action.payload.byPlayerName,
        pointsDelta: -penaltyPts,
        timePenalty: penaltySec,
      };

      const updated: GameState = {
        ...state,
        teams,
        players,
        currentWord: nextWord,
        usedWordIds: updatedUsedIds,
        timeLeft: newTimeLeft,
        roundScoreDelta: state.roundScoreDelta - penaltyPts,
        roundLogs: [entry, ...state.roundLogs],
        foulCooldownUntil: now + 2200,
        lastFoulAlert: {
          id: `foul-${now}`,
          caughtByPlayerId: action.payload.byPlayerId,
          caughtByPlayerName: action.payload.byPlayerName,
          caughtByAvatar: action.payload.byAvatar,
          wordBeingDescribed: foulWord,
          timestamp: now,
        },
      };

      if (newTimeLeft <= 0) {
        ctx.emit('ROUND_END');
        return { ...updated, phase: 'ROUND_SUMMARY', timeLeft: 0 };
      }
      return updated;
    }

    case 'SUBMIT_GUESS': {
      if (state.phase !== 'ROUND_ACTIVE' || !state.currentWord) return state;
      const { playerId, playerName, avatar, guessText } = action.payload;
      if (playerId === state.activeSpeakerId || !guessText.trim()) return state;

      const guess = normalizePolishText(guessText);
      const target = normalizePolishText(state.currentWord.word);
      const isCorrect =
        guess === target || (guess.length >= 4 && target.includes(guess));

      const attempt = {
        id: `guess-${now}-${Math.random().toString(36).slice(2, 6)}`,
        playerId,
        playerName,
        avatar,
        text: guessText.trim(),
        isCorrect,
        timestamp: now,
      };

      if (!isCorrect) {
        return {
          ...state,
          recentGuesses: [attempt, ...state.recentGuesses.slice(0, 7)],
        };
      }

      ctx.emit('SUCCESS');
      const { word: nextWord, updatedUsedIds } = pickNextWord(state);

      const players = state.players.map((p) => {
        if (p.id === playerId) {
          return {
            ...p,
            score: p.score + 1,
            stats: { ...p.stats, correctTextGuesses: p.stats.correctTextGuesses + 1 },
          };
        }
        if (p.id === state.activeSpeakerId) {
          return {
            ...p,
            score: p.score + 1,
            stats: { ...p.stats, wordsDescribed: p.stats.wordsDescribed + 1 },
          };
        }
        return p;
      });

      const guesser = state.players.find((p) => p.id === playerId);
      const teams =
        state.settings.scoringFormat === 'TEAMS'
          ? state.teams.map((t, idx) => {
              const gain = guesser
                ? t.id === guesser.teamId
                : idx === state.activeTeamIndex;
              return gain ? { ...t, score: t.score + 1 } : t;
            })
          : state.teams;

      const entry: RoundLogEntry = {
        id: logId(now),
        timestamp: now,
        type: 'TEXT_GUESS',
        word: state.currentWord.word,
        category: state.currentWord.category,
        actorName: playerName,
        pointsDelta: 1,
      };

      return {
        ...state,
        teams,
        players,
        currentWord: nextWord,
        usedWordIds: updatedUsedIds,
        roundScoreDelta: state.roundScoreDelta + 1,
        roundLogs: [entry, ...state.roundLogs],
        recentGuesses: [attempt, ...state.recentGuesses.slice(0, 7)],
      };
    }
  }
  return state;
}

/** Zegar rundy – wywoływany co sekundę przez Hosta. */
export function tick(state: GameState, ctx: GameContext): GameState {
  if (state.phase !== 'ROUND_ACTIVE' || state.isPaused) return state;

  if (state.timeLeft <= 1) {
    ctx.emit('ROUND_END');
    return { ...state, timeLeft: 0, phase: 'ROUND_SUMMARY' };
  }
  const next = state.timeLeft - 1;
  ctx.emit(next <= 10 ? 'TICK_URGENT' : 'TICK');
  return { ...state, timeLeft: next };
}
