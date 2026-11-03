export interface LocationData {
  id: string;
  name: string;
  category: string;
  hints: string[];
  questions: string[];
}

export type SpyPhase =
  | 'LOBBY'
  | 'BRIEFING'       // 30s na zapoznanie się ze swoją rolą i lokacją
  | 'INTERROGATION'  // Rundy pytań na żywo, radar, timer
  | 'VOTING'         // Wszyscy głosują na podejrzanego
  | 'SPY_GUESS'      // Ostatnia szansa szpiega (jeśli zdemaskowany lub zadeklarował zgadywanie)
  | 'GAME_OVER';     // Podsumowanie i ujawnienie ról

export interface PlayerRoleInfo {
  playerId: string;
  isSpy: boolean;
  roleTitle: string; // 'Agent' lub 'Szpieg'
}

export interface QuestionTurn {
  askerId: string;
  targetId: string;
  question: string;
  questionIndex: number;
}

export interface SpyVote {
  voterId: string;
  targetId: string; // na kogo głosuje
}

export interface SpyState {
  roomCode: string;
  phase: SpyPhase;
  phaseEndsAt: number; // timestamp
  secondsLeft: number;
  durationSeconds: number; // np. 240s (4 min)
  
  // Lokacja gry (ukryta na TV!)
  currentLocationId: string;
  // Lista 16 dostępnych lokacji w danej partii (dla strzału szpiega)
  gameLocations: LocationData[];
  
  // Role
  spyPlayerId: string;
  roles: Record<string, boolean>; // playerId -> isSpy
  
  // Tury pytań
  currentTurn: QuestionTurn | null;
  turnNumber: number;
  
  // Głosowanie
  votes: Record<string, string>; // voterId -> targetId
  accuserId: string | null; // gracz który zwołał wcześniejsze głosowanie
  accusedSpyId: string | null; // wytypowany w głosowaniu
  
  // Zgadywanie szpiega
  spyGuessedLocationId: string | null;
  spyGuessSuccess: boolean | null;
  
  // Wynik gry
  winner: 'AGENTS' | 'SPY' | null;
  winReason: string;
  
  // Historia zadanych pytań w partii
  history: Array<{
    turn: number;
    askerName: string;
    targetName: string;
    question: string;
  }>;
}

export type SpyAction =
  | { type: 'START_GAME'; durationSeconds?: number }
  | { type: 'START_INTERROGATION' } // Przejście z odprawy do pytań (lub po upływie 30s)
  | { type: 'NEXT_QUESTION' }
  | { type: 'CALL_VOTING'; playerId: string }
  | { type: 'CAST_VOTE'; playerId: string; targetId: string }
  | { type: 'SPY_GUESS_LOCATION'; playerId: string; locationId: string }
  | { type: 'RESTART_GAME' };
