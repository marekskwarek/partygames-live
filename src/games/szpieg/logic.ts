import { LOCATIONS, GENERAL_SPY_QUESTIONS } from './data';
import type { GameContext, RoomPlayer } from '@/core/types';
import type { LocationData, QuestionTurn, SpyAction, SpyState } from './types';

export const DEFAULT_ROUND_DURATION_SEC = 240; // 4 minuty
export const BRIEFING_DURATION_SEC = 25; // 25 sekund odprawy

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function pickGameLocations(all: LocationData[]): {
  target: LocationData;
  pool: LocationData[];
} {
  const shuffled = shuffle(all);
  const pool = shuffled.slice(0, 16); // 16 lokacji w siatce wyboru szpiega
  const target = pool[Math.floor(Math.random() * pool.length)];
  return { target, pool };
}

export function generateQuestionTurn(
  players: RoomPlayer[],
  location: LocationData,
  previousTurn: QuestionTurn | null,
  turnNumber: number
): QuestionTurn | null {
  if (players.length < 2) return null;

  let askerId = '';
  let targetId = '';

  if (previousTurn && players.some((p) => p.id === previousTurn.targetId)) {
    // Zapytany w poprzedniej turze staje się pytającym
    askerId = previousTurn.targetId;
    const candidates = players.filter((p) => p.id !== askerId);
    const target = candidates[Math.floor(Math.random() * candidates.length)];
    targetId = target.id;
  } else {
    // Pierwsza tura: losowy pytający i cel
    const p1 = players[Math.floor(Math.random() * players.length)];
    const candidates = players.filter((p) => p.id !== p1.id);
    const p2 = candidates[Math.floor(Math.random() * candidates.length)];
    askerId = p1.id;
    targetId = p2.id;
  }

  // Pytania: miks pytań dedykowanych danej lokacji i pytań uniwersalnych
  const allAvailableQuestions = [...location.questions, ...GENERAL_SPY_QUESTIONS];
  const question =
    allAvailableQuestions[Math.floor(Math.random() * allAvailableQuestions.length)];

  return {
    askerId,
    targetId,
    question,
    questionIndex: turnNumber,
  };
}

export function createInitialState(
  players: RoomPlayer[],
  roomCode: string
): SpyState {
  const { target, pool } = pickGameLocations(LOCATIONS);

  // Przypisanie szpiega (jeśli są gracze)
  const roles: Record<string, boolean> = {};
  let spyPlayerId = '';
  if (players.length > 0) {
    const randomIndex = Math.floor(Math.random() * players.length);
    spyPlayerId = players[randomIndex].id;
    players.forEach((p) => {
      roles[p.id] = p.id === spyPlayerId;
    });
  }

  return {
    roomCode,
    phase: 'LOBBY',
    phaseEndsAt: 0,
    secondsLeft: DEFAULT_ROUND_DURATION_SEC,
    durationSeconds: DEFAULT_ROUND_DURATION_SEC,
    currentLocationId: target.id,
    gameLocations: pool,
    spyPlayerId,
    roles,
    currentTurn: null,
    turnNumber: 0,
    votes: {},
    accuserId: null,
    accusedSpyId: null,
    spyGuessedLocationId: null,
    spyGuessSuccess: null,
    winner: null,
    winReason: '',
    history: [],
  };
}

export function syncPlayers(state: SpyState, players: RoomPlayer[]): SpyState {
  // Jeśli szpieg wyszedł podczas gry w lobby, zaktualizuj role
  if (state.phase === 'LOBBY') {
    const roles: Record<string, boolean> = {};
    let spyId = state.spyPlayerId;
    if (players.length > 0) {
      if (!players.some((p) => p.id === spyId)) {
        spyId = players[0].id;
      }
      players.forEach((p) => {
        roles[p.id] = p.id === spyId;
      });
    } else {
      spyId = '';
    }
    return { ...state, spyPlayerId: spyId, roles };
  }
  return state;
}

export function reduce(
  state: SpyState,
  action: SpyAction,
  ctx: GameContext
): SpyState {
  switch (action.type) {
    case 'START_GAME': {
      if (ctx.players.length === 0) return state;
      const { target, pool } = pickGameLocations(LOCATIONS);

      // Losujemy 1 szpiega spośród dołączonych graczy
      const randomIdx = Math.floor(Math.random() * ctx.players.length);
      const spyId = ctx.players[randomIdx].id;
      const roles: Record<string, boolean> = {};
      ctx.players.forEach((p) => {
        roles[p.id] = p.id === spyId;
      });

      const duration = action.durationSeconds || state.durationSeconds || DEFAULT_ROUND_DURATION_SEC;
      ctx.emit('ROUND_START');

      return {
        ...state,
        phase: 'BRIEFING',
        phaseEndsAt: ctx.now + BRIEFING_DURATION_SEC * 1000,
        secondsLeft: BRIEFING_DURATION_SEC,
        durationSeconds: duration,
        currentLocationId: target.id,
        gameLocations: pool,
        spyPlayerId: spyId,
        roles,
        currentTurn: null,
        turnNumber: 0,
        votes: {},
        accuserId: null,
        accusedSpyId: null,
        spyGuessedLocationId: null,
        spyGuessSuccess: null,
        winner: null,
        winReason: '',
        history: [],
      };
    }

    case 'START_INTERROGATION': {
      if (state.phase !== 'BRIEFING') return state;
      const location =
        state.gameLocations.find((l) => l.id === state.currentLocationId) || LOCATIONS[0];
      const firstTurn = generateQuestionTurn(ctx.players, location, null, 1);
      ctx.emit('SUCCESS');

      return {
        ...state,
        phase: 'INTERROGATION',
        phaseEndsAt: ctx.now + state.durationSeconds * 1000,
        secondsLeft: state.durationSeconds,
        currentTurn: firstTurn,
        turnNumber: 1,
        history: firstTurn
          ? [
              {
                turn: 1,
                askerName:
                  ctx.players.find((p) => p.id === firstTurn.askerId)?.name || 'Gracz',
                targetName:
                  ctx.players.find((p) => p.id === firstTurn.targetId)?.name || 'Gracz',
                question: firstTurn.question,
              },
            ]
          : [],
      };
    }

    case 'NEXT_QUESTION': {
      if (state.phase !== 'INTERROGATION') return state;
      const location =
        state.gameLocations.find((l) => l.id === state.currentLocationId) || LOCATIONS[0];
      const nextTurnNum = state.turnNumber + 1;
      const nextTurn = generateQuestionTurn(
        ctx.players,
        location,
        state.currentTurn,
        nextTurnNum
      );

      ctx.emit('PASS');

      const newHistory = nextTurn
        ? [
            ...state.history,
            {
              turn: nextTurnNum,
              askerName:
                ctx.players.find((p) => p.id === nextTurn.askerId)?.name || 'Gracz',
              targetName:
                ctx.players.find((p) => p.id === nextTurn.targetId)?.name || 'Gracz',
              question: nextTurn.question,
            },
          ]
        : state.history;

      return {
        ...state,
        currentTurn: nextTurn,
        turnNumber: nextTurnNum,
        history: newHistory,
      };
    }

    case 'CALL_VOTING': {
      if (state.phase !== 'INTERROGATION') return state;
      ctx.emit('BUZZER');
      return {
        ...state,
        phase: 'VOTING',
        accuserId: action.playerId,
        phaseEndsAt: ctx.now + 60 * 1000, // 60s na oddanie głosów
        secondsLeft: 60,
        votes: {},
      };
    }

    case 'CAST_VOTE': {
      if (state.phase !== 'VOTING') return state;
      const updatedVotes = {
        ...state.votes,
        [action.playerId]: action.targetId,
      };

      // Sprawdzamy czy wszyscy aktywni gracze oddali głos
      const activePlayers = ctx.players;
      const allVoted =
        activePlayers.length > 0 &&
        activePlayers.every((p) => !!updatedVotes[p.id]);

      if (allVoted) {
        // Podliczanie głosów
        const counts: Record<string, number> = {};
        Object.values(updatedVotes).forEach((targetId) => {
          counts[targetId] = (counts[targetId] || 0) + 1;
        });

        let maxVotes = 0;
        let mostVotedPlayerId: string | null = null;
        let tie = false;

        Object.entries(counts).forEach(([pid, cnt]) => {
          if (cnt > maxVotes) {
            maxVotes = cnt;
            mostVotedPlayerId = pid;
            tie = false;
          } else if (cnt === maxVotes) {
            tie = true;
          }
        });

        // Jeśli zremisowano lub nikt nie zdobył większości:
        if (tie || !mostVotedPlayerId) {
          ctx.emit('BUZZER');
          return {
            ...state,
            votes: updatedVotes,
            phase: 'GAME_OVER',
            winner: 'SPY',
            winReason:
              'Głosowanie zakończyło się remisem! Agenci nie zdołali zdemaskować Szpiega.',
          };
        }

        // Czy wytypowany to Szpieg?
        const isActuallySpy = mostVotedPlayerId === state.spyPlayerId;

        if (isActuallySpy) {
          // Szpieg został zdemaskowany -> Ostatnia szansa: Strzał Ratunkowy (odgadnięcie lokacji)
          ctx.emit('BUZZER');
          return {
            ...state,
            votes: updatedVotes,
            accusedSpyId: mostVotedPlayerId,
            phase: 'SPY_GUESS',
            phaseEndsAt: ctx.now + 45 * 1000,
            secondsLeft: 45,
          };
        } else {
          // Agenci oskarżyli niewinnego Agenta!
          ctx.emit('FANFARE');
          const innocent = ctx.players.find((p) => p.id === mostVotedPlayerId);
          return {
            ...state,
            votes: updatedVotes,
            accusedSpyId: mostVotedPlayerId,
            phase: 'GAME_OVER',
            winner: 'SPY',
            winReason: `Agenci oskarżyli niewinnego (${innocent?.name || 'Agenta'})! Szpieg wygrywa przez blef i manipulację!`,
          };
        }
      }

      return {
        ...state,
        votes: updatedVotes,
      };
    }

    case 'SPY_GUESS_LOCATION': {
      // Szpieg może zgadnąć w trakcie przesłuchania (przerwanie) lub w fazie SPY_GUESS (strzał ratunkowy)
      if (action.playerId !== state.spyPlayerId) return state;

      const isCorrect = action.locationId === state.currentLocationId;
      const guessedLoc = state.gameLocations.find((l) => l.id === action.locationId);

      if (isCorrect) {
        ctx.emit('FANFARE');
        return {
          ...state,
          phase: 'GAME_OVER',
          spyGuessedLocationId: action.locationId,
          spyGuessSuccess: true,
          winner: 'SPY',
          winReason: `Szpieg bezbłędnie rozszyfrował tajną lokację (${guessedLoc?.name}) i uciekł z danymi!`,
        };
      } else {
        ctx.emit('SUCCESS');
        return {
          ...state,
          phase: 'GAME_OVER',
          spyGuessedLocationId: action.locationId,
          spyGuessSuccess: false,
          winner: 'AGENTS',
          winReason: `Szpieg chybił! Podał złą lokację (${guessedLoc?.name || 'Błąd'}), agenci triumfują!`,
        };
      }
    }

    case 'RESTART_GAME': {
      return createInitialState(ctx.players, state.roomCode);
    }

    default:
      return state;
  }
}

export function tick(state: SpyState, ctx: GameContext): SpyState {
  if (state.phase === 'LOBBY' || state.phase === 'GAME_OVER') {
    return state;
  }

  const sec = Math.max(0, Math.ceil((state.phaseEndsAt - ctx.now) / 1000));

  // Efekty dźwiękowe tykania
  if (state.phase === 'INTERROGATION' && sec <= 15 && sec > 0) {
    ctx.emit('TICK_URGENT');
  } else if (sec > 0 && sec % 10 === 0 && state.phase === 'INTERROGATION') {
    ctx.emit('TICK');
  }

  if (sec === 0) {
    if (state.phase === 'BRIEFING') {
      // Automatyczny start pytań po 25s odprawy
      return reduce(state, { type: 'START_INTERROGATION' }, ctx);
    }

    if (state.phase === 'INTERROGATION') {
      // Koniec czasu na pytania -> automatyczne przejście do głosowania
      ctx.emit('BUZZER');
      return {
        ...state,
        phase: 'VOTING',
        phaseEndsAt: ctx.now + 60 * 1000,
        secondsLeft: 60,
        votes: {},
      };
    }

    if (state.phase === 'VOTING') {
      // Upłynął czas na głosowanie a nie wszyscy zagłosowali -> Szpieg wymyka się
      ctx.emit('FANFARE');
      return {
        ...state,
        phase: 'GAME_OVER',
        winner: 'SPY',
        winReason: 'Czas na głosowanie minął! Szpieg pozostał niewykryty.',
      };
    }

    if (state.phase === 'SPY_GUESS') {
      // Szpieg nie zdążył wybrać lokacji w strzale ratunkowym
      ctx.emit('FANFARE');
      return {
        ...state,
        phase: 'GAME_OVER',
        winner: 'AGENTS',
        winReason: 'Szpieg nie zdołał odgadnąć lokacji w wyznaczonym czasie. Agenci wygrywają!',
      };
    }
  }

  if (sec !== state.secondsLeft) {
    return { ...state, secondsLeft: sec };
  }

  return state;
}
