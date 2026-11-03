export type GamePhase =
  | 'LOBBY'
  | 'ROLE_SELECTION'
  | 'ROUND_ACTIVE'
  | 'ROUND_SUMMARY'
  | 'GAME_OVER';

export type ScoringFormat = 'TEAMS' | 'FFA';

export type Difficulty = 'ALL' | 'EASY' | 'MEDIUM' | 'HARD';

export type WordCategory =
  | 'Filmy i Seriale'
  | 'Postacie i Celebryci'
  | 'Czynności i Zawody'
  | 'Przedmioty i Rzeczy'
  | 'Abstrakcje i Trudne'
  | 'Własne Hasła';

export interface WordItem {
  id: string;
  word: string;
  category: WordCategory;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  pHint?: string; // Przykładowy trop na literę P dla inspiracji
}

export interface PlayerStats {
  wordsDescribed: number; // Ile haseł skutecznie przekazał jako P-Mówca
  foulCountAsSpeaker: number; // Ile razy został przyłapany na słowie nie na P
  caughtOthersCount: number; // Ile razy przyłapał P-Mówcę przyciskiem Buzzer
  passesUsed: number; // Ile razy użył PAS
  correctTextGuesses: number; // Zgadnięte hasła wpisane na telefonie
}

/** Gracz w kontekście tej gry (profil pochodzi z pokoju, reszta jest lokalna dla gry). */
export interface Player {
  id: string;
  name: string;
  avatar: string;
  teamId: string; // 'team-1' | 'team-2' | 'team-3' | 'ffa'
  score: number;
  isConnected: boolean;
  lastSeen: number;
  stats: PlayerStats;
}

export interface Team {
  id: string;
  name: string;
  icon: string;
  color: string;
  score: number;
}

export interface RoundLogEntry {
  id: string;
  timestamp: number;
  type: 'GUESSED' | 'PASS' | 'FOUL' | 'TEXT_GUESS';
  word: string;
  category: WordCategory;
  actorName?: string;
  pointsDelta: number;
  timePenalty?: number;
}

export interface GameSettings {
  roundDuration: 60 | 90 | 120;
  totalRounds: number;
  teamCount: 2 | 3;
  scoringFormat: ScoringFormat;
  difficulty: Difficulty;
  selectedCategories: WordCategory[];
  maxPassesPerRound: number;
  foulPenaltySeconds: number;
  foulPenaltyPoints: number;
}

export interface FoulAlert {
  id: string;
  caughtByPlayerId: string;
  caughtByPlayerName: string;
  caughtByAvatar: string;
  wordBeingDescribed: string;
  timestamp: number;
}

export interface GuessAttempt {
  id: string;
  playerId: string;
  playerName: string;
  avatar: string;
  text: string;
  isCorrect: boolean;
  timestamp: number;
}

export interface GameState {
  roomCode: string;
  phase: GamePhase;
  settings: GameSettings;
  teams: Team[];
  players: Player[];
  customWords: WordItem[];
  usedWordIds: string[];

  currentRoundNumber: number;
  totalTurnsPlayed: number;
  activeTeamIndex: number;
  activeSpeakerId: string | null;
  currentWord: WordItem | null;
  timeLeft: number;
  isPaused: boolean;
  passesRemaining: number;
  roundScoreDelta: number;
  roundLogs: RoundLogEntry[];
  lastFoulAlert: FoulAlert | null;
  recentGuesses: GuessAttempt[];
  foulCooldownUntil: number;
}

/** Akcje wysyłane z telefonów graczy. */
export type PlayerAction =
  | { type: 'SWITCH_TEAM'; payload: { playerId: string; teamId: string } }
  | { type: 'SPEAKER_READY'; payload: { playerId: string } }
  | { type: 'WORD_GUESSED'; payload: { playerId: string; guessedByPlayerId?: string } }
  | { type: 'WORD_PASSED'; payload: { playerId: string } }
  | {
      type: 'BUZZER_FOUL';
      payload: { byPlayerId: string; byPlayerName: string; byAvatar: string };
    }
  | {
      type: 'SUBMIT_GUESS';
      payload: {
        playerId: string;
        playerName: string;
        avatar: string;
        guessText: string;
      };
    };

/** Akcje dostępne wyłącznie dla ekranu Hosta. */
export type HostAction =
  | { type: 'HOST_UPDATE_SETTINGS'; payload: { partial: Partial<GameSettings> } }
  | { type: 'HOST_START_GAME' }
  | { type: 'HOST_START_ROUND' }
  | { type: 'HOST_TOGGLE_PAUSE' }
  | { type: 'HOST_NEXT_TURN' }
  | { type: 'HOST_PLAY_AGAIN' }
  | { type: 'HOST_ADD_CUSTOM_WORD'; payload: { word: string; hint?: string } };

export type GameAction = PlayerAction | HostAction;
