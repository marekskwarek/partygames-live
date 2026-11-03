export type GamePhase =
  | 'LOBBY'
  | 'ROLE_SELECTION'
  | 'ROUND_ACTIVE'
  | 'ROUND_SUMMARY'
  | 'GAME_OVER';

export type GameMode = 'PARTY' | 'COUCH' | 'SIMULATOR';

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
  pHint?: string; // Przykładowy zabawny trop na literę P dla inspiracji
}

export interface PlayerStats {
  wordsDescribed: number;      // Ile haseł skutecznie przekazał jako P-Mówca
  foulCountAsSpeaker: number;  // Ile razy został przyłapany na słowie nie na P
  caughtOthersCount: number;   // Ile razy przyłapał P-Mówcę przyciskiem Buzzer
  passesUsed: number;          // Ile razy użył PAS
  correctTextGuesses: number;  // Zgadnięte hasła w trybie Każdy na Każdego
}

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
  actorName?: string; // Kto wcisnął buzzer lub kto zgadł w FFA
  pointsDelta: number;
  timePenalty?: number;
}

export interface GameSettings {
  roundDuration: 60 | 90 | 120;
  totalRounds: number; // Liczba pełnych kolejek lub tur
  teamCount: 2 | 3;
  scoringFormat: ScoringFormat;
  difficulty: Difficulty;
  selectedCategories: WordCategory[];
  maxPassesPerRound: number; // Domyślnie 2
  foulPenaltySeconds: number; // Domyślnie 10s
  foulPenaltyPoints: number; // Domyślnie -1 pkt (lub 0)
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

  // Stan bieżącej tury / rundy
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

// Komunikaty przesyłane między Kontrolerami (Graczami) a Hostem
export type ClientToHostMessage =
  | {
      type: 'JOIN_ROOM';
      payload: {
        playerId: string;
        name: string;
        avatar: string;
        preferredTeamId?: string;
      };
    }
  | {
      type: 'RECONNECT_PLAYER';
      payload: {
        playerId: string;
      };
    }
  | {
      type: 'SWITCH_TEAM';
      payload: {
        playerId: string;
        teamId: string;
      };
    }
  | {
      type: 'SPEAKER_READY';
      payload: {
        playerId: string;
      };
    }
  | {
      type: 'WORD_GUESSED';
      payload: {
        playerId: string;
        guessedByPlayerId?: string;
      };
    }
  | {
      type: 'WORD_PASSED';
      payload: {
        playerId: string;
      };
    }
  | {
      type: 'BUZZER_FOUL';
      payload: {
        byPlayerId: string;
        byPlayerName: string;
        byAvatar: string;
      };
    }
  | {
      type: 'SUBMIT_GUESS';
      payload: {
        playerId: string;
        playerName: string;
        avatar: string;
        guessText: string;
      };
    }
  | {
      type: 'PING';
      payload: {
        playerId: string;
      };
    };

export type HostToClientMessage =
  | {
      type: 'STATE_SYNC';
      payload: {
        state: GameState;
      };
    }
  | {
      type: 'SOUND_TRIGGER';
      payload: {
        sound: 'BUZZER' | 'SUCCESS' | 'PASS' | 'ROUND_START' | 'ROUND_END' | 'FANFARE';
      };
    }
  | {
      type: 'KICKED';
      payload: {
        playerId: string;
      };
    };
