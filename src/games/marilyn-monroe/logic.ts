import type { GameContext, RoomPlayer } from '@/core/types';
import { MARILYN_CARDS, type MarilynCard } from './cards';
import type {
  MarilynAction,
  MarilynPlayer,
  MarilynPlayerStats,
  MarilynRoundLog,
  MarilynSettings,
  MarilynState,
  MarilynTeam,
} from './types';

export const DEFAULT_MARILYN_TEAMS: MarilynTeam[] = [
  {
    id: 'team-1',
    name: 'Drużyna Czerwona',
    icon: '💋',
    color: '#FF2A54',
    score: 0,
  },
  {
    id: 'team-2',
    name: 'Drużyna Złota',
    icon: '⭐',
    color: '#FFD600',
    score: 0,
  },
  {
    id: 'team-3',
    name: 'Drużyna Fioletowa',
    icon: '💎',
    color: '#9D4EDD',
    score: 0,
  },
];

export const DEFAULT_SETTINGS: MarilynSettings = {
  roundDuration: 60,
  totalRounds: 3,
  teamCount: 2,
  scoringFormat: 'TEAMS',
  maxPassesPerRound: 2,
  tabooPenaltySeconds: 10,
  tabooPenaltyPoints: 1,
};

const emptyStats = (): MarilynPlayerStats => ({
  cardsDescribed: 0,
  tabooViolationsAsDescriber: 0,
  tabooCaughtCount: 0,
  passesUsed: 0,
});

function leastPopulatedTeam(teams: MarilynTeam[], players: MarilynPlayer[]): string {
  const counts = teams.map((t) => ({
    id: t.id,
    count: players.filter((p) => p.teamId === t.id).length,
  }));
  counts.sort((a, b) => a.count - b.count);
  return counts[0]?.id ?? 'team-1';
}

function normalizeTeams(state: MarilynState): MarilynState {
  const ffa = state.settings.scoringFormat === 'FFA';
  const validIds = new Set(state.teams.map((t) => t.id));
  const players: MarilynPlayer[] = [];
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
): MarilynState {
  const base: MarilynState = {
    roomCode,
    phase: 'LOBBY',
    settings: { ...DEFAULT_SETTINGS },
    teams: DEFAULT_MARILYN_TEAMS.slice(0, 2).map((t) => ({ ...t, score: 0 })),
    players: [],
    usedCardIds: [],
    currentRoundNumber: 1,
    totalTurnsPlayed: 0,
    activeTeamIndex: 0,
    activeSpeakerId: null,
    currentCard: null,
    timeLeft: DEFAULT_SETTINGS.roundDuration,
    isPaused: false,
    passesRemaining: DEFAULT_SETTINGS.maxPassesPerRound,
    roundScoreDelta: 0,
    roundLogs: [],
    lastTabooAlert: null,
    tabooCooldownUntil: 0,
  };
  return syncPlayers(base, roomPlayers);
}

export function syncPlayers(
  state: MarilynState,
  roomPlayers: RoomPlayer[]
): MarilynState {
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

export function pickNextCard(state: MarilynState): {
  card: MarilynCard;
  updatedUsedIds: string[];
} {
  let available = MARILYN_CARDS.filter((c) => !state.usedCardIds.includes(c.id));
  let updatedUsedIds = [...state.usedCardIds];

  if (available.length === 0) {
    available = MARILYN_CARDS;
    updatedUsedIds = [];
  }

  const chosen = available[Math.floor(Math.random() * available.length)];
  updatedUsedIds.push(chosen.id);
  return { card: chosen, updatedUsedIds };
}

export function pickNextSpeaker(
  state: MarilynState,
  nextTeamIdx: number
): string | null {
  if (state.players.length === 0) return null;

  const prefer = (list: MarilynPlayer[]) => {
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

function startRound(state: MarilynState, ctx: GameContext): MarilynState {
  const { card, updatedUsedIds } = pickNextCard(state);
  ctx.emit('ROUND_START');
  return {
    ...state,
    phase: 'ROUND_ACTIVE',
    currentCard: card,
    usedCardIds: updatedUsedIds,
    timeLeft: state.settings.roundDuration,
    isPaused: false,
    passesRemaining: state.settings.maxPassesPerRound,
    roundScoreDelta: 0,
    roundLogs: [],
    lastTabooAlert: null,
  };
}

function resetForNewGame(state: MarilynState): MarilynState {
  return {
    ...state,
    phase: 'LOBBY',
    currentRoundNumber: 1,
    totalTurnsPlayed: 0,
    activeTeamIndex: 0,
    activeSpeakerId: null,
    currentCard: null,
    usedCardIds: [],
    roundLogs: [],
    lastTabooAlert: null,
    isPaused: false,
    teams: state.teams.map((t) => ({ ...t, score: 0 })),
    players: state.players.map((p) => ({
      ...p,
      score: 0,
      stats: emptyStats(),
    })),
  };
}

const logId = (now: number) => `log-mm-${now}-${Math.random().toString(36).slice(2, 7)}`;

export function reduce(
  state: MarilynState,
  action: MarilynAction,
  ctx: GameContext
): MarilynState {
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
          teams = DEFAULT_MARILYN_TEAMS.slice(0, merged.teamCount).map((t) => ({
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
        const temp: MarilynState = {
          ...state,
          currentRoundNumber: 1,
          totalTurnsPlayed: 0,
          activeTeamIndex: 0,
        };
        return {
          ...temp,
          phase: 'ROLE_SELECTION',
          activeSpeakerId: pickNextSpeaker(temp, 0),
          lastTabooAlert: null,
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
        const updated: MarilynState = {
          ...state,
          totalTurnsPlayed: nextTurnsPlayed,
          currentRoundNumber: Math.floor(nextTurnsPlayed / turnsPerRound) + 1,
          activeTeamIndex: nextTeamIndex,
        };
        return {
          ...updated,
          phase: 'ROLE_SELECTION',
          activeSpeakerId: pickNextSpeaker(updated, nextTeamIndex),
          currentCard: null,
          lastTabooAlert: null,
        };
      }

      case 'HOST_PLAY_AGAIN':
        return resetForNewGame(state);
    }
    return state;
  }

  // Akcje Graczy
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

    case 'CARD_GUESSED': {
      if (state.phase !== 'ROUND_ACTIVE' || !state.currentCard) return state;
      if (action.payload.playerId !== state.activeSpeakerId) return state;

      const { card, updatedUsedIds } = pickNextCard(state);
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
              stats: { ...p.stats, cardsDescribed: p.stats.cardsDescribed + 1 },
            }
          : p
      );

      const entry: MarilynRoundLog = {
        id: logId(now),
        timestamp: now,
        type: 'GUESSED',
        cardName: state.currentCard.name,
        category: state.currentCard.category,
        forbidden: state.currentCard.forbidden,
        actorName: state.teams[state.activeTeamIndex]?.name,
        pointsDelta: 1,
      };

      return {
        ...state,
        teams,
        players,
        currentCard: card,
        usedCardIds: updatedUsedIds,
        roundScoreDelta: state.roundScoreDelta + 1,
        roundLogs: [entry, ...state.roundLogs],
      };
    }

    case 'CARD_PASSED': {
      if (state.phase !== 'ROUND_ACTIVE' || !state.currentCard) return state;
      if (action.payload.playerId !== state.activeSpeakerId) return state;
      if (state.passesRemaining <= 0) return state;

      const { card, updatedUsedIds } = pickNextCard(state);
      ctx.emit('PASS');

      const entry: MarilynRoundLog = {
        id: logId(now),
        timestamp: now,
        type: 'PASS',
        cardName: state.currentCard.name,
        category: state.currentCard.category,
        forbidden: state.currentCard.forbidden,
        pointsDelta: 0,
      };

      return {
        ...state,
        players: state.players.map((p) =>
          p.id === state.activeSpeakerId
            ? { ...p, stats: { ...p.stats, passesUsed: p.stats.passesUsed + 1 } }
            : p
        ),
        currentCard: card,
        usedCardIds: updatedUsedIds,
        passesRemaining: state.passesRemaining - 1,
        roundLogs: [entry, ...state.roundLogs],
      };
    }

    case 'BUZZER_TABOO': {
      if (state.phase !== 'ROUND_ACTIVE' || !state.currentCard) return state;
      // Opisujący nie może wcisnąć buzzera przeciwko samemu sobie
      if (action.payload.byPlayerId === state.activeSpeakerId) return state;
      // Zabezpieczenie przed jednoczesnym kliknięciem przez kilku przeciwników (2s)
      if (now < state.tabooCooldownUntil) return state;

      ctx.emit('BUZZER');

      const penaltySec = state.settings.tabooPenaltySeconds;
      const penaltyPts = state.settings.tabooPenaltyPoints;
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
            stats: {
              ...p.stats,
              tabooViolationsAsDescriber: p.stats.tabooViolationsAsDescriber + 1,
            },
          };
        }
        if (p.id === action.payload.byPlayerId) {
          return {
            ...p,
            stats: { ...p.stats, tabooCaughtCount: p.stats.tabooCaughtCount + 1 },
          };
        }
        return p;
      });

      const cardBeingDescribed = state.currentCard;
      const { card: nextCard, updatedUsedIds } = pickNextCard(state);

      const entry: MarilynRoundLog = {
        id: logId(now),
        timestamp: now,
        type: 'TABOO_VIOLATION',
        cardName: cardBeingDescribed.name,
        category: cardBeingDescribed.category,
        forbidden: cardBeingDescribed.forbidden,
        actorName: action.payload.byPlayerName,
        pointsDelta: -penaltyPts,
      };

      const updated: MarilynState = {
        ...state,
        teams,
        players,
        currentCard: nextCard,
        usedCardIds: updatedUsedIds,
        timeLeft: newTimeLeft,
        roundScoreDelta: state.roundScoreDelta - penaltyPts,
        roundLogs: [entry, ...state.roundLogs],
        tabooCooldownUntil: now + 2000,
        lastTabooAlert: {
          id: `taboo-${now}`,
          caughtByPlayerId: action.payload.byPlayerId,
          caughtByPlayerName: action.payload.byPlayerName,
          caughtByAvatar: action.payload.byAvatar,
          cardName: cardBeingDescribed.name,
          forbidden: cardBeingDescribed.forbidden,
          timestamp: now,
        },
      };

      if (newTimeLeft <= 0) {
        ctx.emit('ROUND_END');
        return { ...updated, phase: 'ROUND_SUMMARY', timeLeft: 0 };
      }
      return updated;
    }
  }
  return state;
}

export function tick(state: MarilynState, ctx: GameContext): MarilynState {
  if (state.phase !== 'ROUND_ACTIVE' || state.isPaused) return state;

  if (state.timeLeft <= 1) {
    ctx.emit('ROUND_END');
    return { ...state, timeLeft: 0, phase: 'ROUND_SUMMARY' };
  }
  const next = state.timeLeft - 1;
  ctx.emit(next <= 10 ? 'TICK_URGENT' : 'TICK');
  return { ...state, timeLeft: next };
}
