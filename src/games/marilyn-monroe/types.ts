import type { MarilynCard } from './cards';

export type MarilynPhase =
  | 'LOBBY'
  | 'ROLE_SELECTION'
  | 'ROUND_ACTIVE'
  | 'ROUND_SUMMARY'
  | 'GAME_OVER';

export type ScoringFormat = 'TEAMS' | 'FFA';

export interface MarilynTeam {
  id: string;
  name: string;
  icon: string;
  color: string;
  score: number;
}

export interface MarilynPlayerStats {
  cardsDescribed: number; // ile odgadniętych haseł
  tabooViolationsAsDescriber: number; // ile razy złamał tabu jako opisujący
  tabooCaughtCount: number; // ile razy wcisnął buzzer i przyłapał przeciwnika
  passesUsed: number;
}

export interface MarilynPlayer {
  id: string;
  name: string;
  avatar: string;
  teamId: string; // 'team-1' | 'team-2' | 'team-3' | 'ffa'
  score: number;
  isConnected: boolean;
  lastSeen: number;
  stats: MarilynPlayerStats;
}

export interface MarilynRoundLog {
  id: string;
  timestamp: number;
  type: 'GUESSED' | 'PASS' | 'TABOO_VIOLATION';
  cardName: string;
  category: string;
  forbidden: [string, string, string];
  actorName?: string;
  pointsDelta: number;
}

export interface MarilynTabooAlert {
  id: string;
  caughtByPlayerId: string;
  caughtByPlayerName: string;
  caughtByAvatar: string;
  cardName: string;
  forbidden: [string, string, string];
  timestamp: number;
}

export interface MarilynSettings {
  roundDuration: 60 | 90 | 120;
  totalRounds: number;
  teamCount: 2 | 3;
  scoringFormat: ScoringFormat;
  maxPassesPerRound: number;
  tabooPenaltySeconds: number;
  tabooPenaltyPoints: number;
}

export interface MarilynState {
  roomCode: string;
  phase: MarilynPhase;
  settings: MarilynSettings;
  teams: MarilynTeam[];
  players: MarilynPlayer[];
  usedCardIds: string[];

  currentRoundNumber: number;
  totalTurnsPlayed: number;
  activeTeamIndex: number;
  activeSpeakerId: string | null;
  currentCard: MarilynCard | null;

  timeLeft: number;
  isPaused: boolean;
  passesRemaining: number;
  roundScoreDelta: number;
  roundLogs: MarilynRoundLog[];
  lastTabooAlert: MarilynTabooAlert | null;
  tabooCooldownUntil: number;
}

/** Akcje wysyłane z telefonów graczy */
export type MarilynPlayerAction =
  | { type: 'SWITCH_TEAM'; payload: { playerId: string; teamId: string } }
  | { type: 'SPEAKER_READY'; payload: { playerId: string } }
  | { type: 'CARD_GUESSED'; payload: { playerId: string } }
  | { type: 'CARD_PASSED'; payload: { playerId: string } }
  | {
      type: 'BUZZER_TABOO';
      payload: { byPlayerId: string; byPlayerName: string; byAvatar: string };
    };

/** Akcje Hosta */
export type MarilynHostAction =
  | { type: 'HOST_UPDATE_SETTINGS'; payload: { partial: Partial<MarilynSettings> } }
  | { type: 'HOST_START_GAME' }
  | { type: 'HOST_START_ROUND' }
  | { type: 'HOST_TOGGLE_PAUSE' }
  | { type: 'HOST_NEXT_TURN' }
  | { type: 'HOST_PLAY_AGAIN' };

export type MarilynAction = MarilynPlayerAction | MarilynHostAction;
