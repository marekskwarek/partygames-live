'use client';

import {
  ALL_CATEGORIES,
  DEFAULT_TEAMS,
  INITIAL_WORDS,
} from '@/data/words';
import {
  ClientToHostMessage,
  GameSettings,
  GameState,
  HostToClientMessage,
  Player,
  WordCategory,
  WordItem,
} from '@/types/game';

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

// Generuje czytelny 4-literowy kod pokoju bez mylących znaków (np. O/0, I/L)
export function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ';
  let code = '';
  // Zaczynamy od litery P dla klimatu „Gry na P”!
  code += 'P';
  for (let i = 0; i < 3; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function createInitialGameState(roomCode: string): GameState {
  return {
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
}

// Normalizacja polskich znaków do porównywania haseł wpisywanych na telefonie
export function normalizePolishText(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/ą/g, 'a')
    .replace(/ć/g, 'c')
    .replace(/ę/g, 'e')
    .replace(/ł/g, 'l')
    .replace(/ń/g, 'n')
    .replace(/ó/g, 'o')
    .replace(/ś/g, 's')
    .replace(/ź/g, 'z')
    .replace(/ż/g, 'z')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ');
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
  let available = effectivePool.filter(
    (w) => !state.usedWordIds.includes(w.id)
  );

  let updatedUsedIds = [...state.usedWordIds];
  if (available.length === 0) {
    // Jeśli wszystkie hasła z puli zostały użyte, resetujemy historię użytych
    available = effectivePool;
    updatedUsedIds = [];
  }

  const randomIndex = Math.floor(Math.random() * available.length);
  const chosen = available[randomIndex];
  updatedUsedIds.push(chosen.id);

  return {
    word: chosen,
    updatedUsedIds,
  };
}

// Wyznacza kolejnego P-Mówcę w zależności od trybu (Drużynowy vs Każdy na każdego)
export function pickNextSpeaker(
  state: GameState,
  nextTeamIdx: number
): string | null {
  if (state.players.length === 0) return null;

  if (state.settings.scoringFormat === 'FFA') {
    const idx = state.totalTurnsPlayed % state.players.length;
    return state.players[idx]?.id || state.players[0].id;
  }

  const targetTeam = state.teams[nextTeamIdx];
  if (!targetTeam) return state.players[0].id;

  const teamPlayers = state.players.filter((p) => p.teamId === targetTeam.id);
  if (teamPlayers.length === 0) {
    // Fallback jeśli w drużynie nie ma jeszcze przypisanego gracza
    return state.players[state.totalTurnsPlayed % state.players.length].id;
  }

  const turnInTeam = Math.floor(state.totalTurnsPlayed / state.teams.length);
  return teamPlayers[turnInTeam % teamPlayers.length].id;
}

// Reduktor akcji od kontrolerów graczy po stronie Hosta
export function processClientMessageOnHost(
  state: GameState,
  msg: ClientToHostMessage,
  onSoundTrigger?: (
    sound:
      | 'BUZZER'
      | 'SUCCESS'
      | 'PASS'
      | 'ROUND_START'
      | 'ROUND_END'
      | 'FANFARE'
  ) => void
): GameState {
  const now = Date.now();

  switch (msg.type) {
    case 'JOIN_ROOM': {
      const { playerId, name, avatar, preferredTeamId } = msg.payload;
      const existingIdx = state.players.findIndex((p) => p.id === playerId);

      // Automatyczny balans drużyn przy dołączaniu
      let assignedTeamId = preferredTeamId || 'team-1';
      if (state.settings.scoringFormat === 'FFA') {
        assignedTeamId = 'ffa';
      } else if (!preferredTeamId) {
        const counts = state.teams.map((t) => ({
          id: t.id,
          count: state.players.filter((p) => p.teamId === t.id).length,
        }));
        counts.sort((a, b) => a.count - b.count);
        assignedTeamId = counts[0]?.id || 'team-1';
      }

      if (existingIdx !== -1) {
        const updatedPlayers = [...state.players];
        updatedPlayers[existingIdx] = {
          ...updatedPlayers[existingIdx],
          name: name.trim() || updatedPlayers[existingIdx].name,
          avatar: avatar || updatedPlayers[existingIdx].avatar,
          isConnected: true,
          lastSeen: now,
        };
        return { ...state, players: updatedPlayers };
      }

      const newPlayer: Player = {
        id: playerId,
        name: name.trim() || `Gracz ${state.players.length + 1}`,
        avatar: avatar || '🌭',
        teamId: assignedTeamId,
        score: 0,
        isConnected: true,
        lastSeen: now,
        stats: {
          wordsDescribed: 0,
          foulCountAsSpeaker: 0,
          caughtOthersCount: 0,
          passesUsed: 0,
          correctTextGuesses: 0,
        },
      };

      return {
        ...state,
        players: [...state.players, newPlayer],
      };
    }

    case 'RECONNECT_PLAYER': {
      const { playerId } = msg.payload;
      return {
        ...state,
        players: state.players.map((p) =>
          p.id === playerId ? { ...p, isConnected: true, lastSeen: now } : p
        ),
      };
    }

    case 'SWITCH_TEAM': {
      const { playerId, teamId } = msg.payload;
      return {
        ...state,
        players: state.players.map((p) =>
          p.id === playerId ? { ...p, teamId, lastSeen: now } : p
        ),
      };
    }

    case 'SPEAKER_READY': {
      if (state.phase !== 'ROLE_SELECTION') return state;
      if (
        state.activeSpeakerId &&
        msg.payload.playerId !== state.activeSpeakerId
      ) {
        return state;
      }
      const { word, updatedUsedIds } = pickNextWord(state);
      onSoundTrigger?.('ROUND_START');
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

    case 'WORD_GUESSED': {
      if (state.phase !== 'ROUND_ACTIVE' || !state.currentWord) return state;

      const { word, updatedUsedIds } = pickNextWord(state);
      onSoundTrigger?.('SUCCESS');

      const activeTeam = state.teams[state.activeTeamIndex];
      const updatedTeams = state.teams.map((t, idx) =>
        idx === state.activeTeamIndex ? { ...t, score: t.score + 1 } : t
      );

      const updatedPlayers = state.players.map((p) => {
        if (p.id === state.activeSpeakerId) {
          return {
            ...p,
            score: p.score + 1,
            stats: {
              ...p.stats,
              wordsDescribed: p.stats.wordsDescribed + 1,
            },
          };
        }
        if (
          msg.payload.guessedByPlayerId &&
          p.id === msg.payload.guessedByPlayerId
        ) {
          return {
            ...p,
            score: p.score + 1,
            stats: {
              ...p.stats,
              correctTextGuesses: p.stats.correctTextGuesses + 1,
            },
          };
        }
        return p;
      });

      const logEntry = {
        id: `log-${now}-${Math.random()}`,
        timestamp: now,
        type: 'GUESSED' as const,
        word: state.currentWord.word,
        category: state.currentWord.category,
        actorName: activeTeam?.name,
        pointsDelta: 1,
      };

      return {
        ...state,
        teams: updatedTeams,
        players: updatedPlayers,
        currentWord: word,
        usedWordIds: updatedUsedIds,
        roundScoreDelta: state.roundScoreDelta + 1,
        roundLogs: [logEntry, ...state.roundLogs],
      };
    }

    case 'WORD_PASSED': {
      if (state.phase !== 'ROUND_ACTIVE' || !state.currentWord) return state;
      if (state.passesRemaining <= 0) return state;

      const { word, updatedUsedIds } = pickNextWord(state);
      onSoundTrigger?.('PASS');

      const updatedPlayers = state.players.map((p) =>
        p.id === state.activeSpeakerId
          ? {
              ...p,
              stats: { ...p.stats, passesUsed: p.stats.passesUsed + 1 },
            }
          : p
      );

      const logEntry = {
        id: `log-${now}-${Math.random()}`,
        timestamp: now,
        type: 'PASS' as const,
        word: state.currentWord.word,
        category: state.currentWord.category,
        pointsDelta: 0,
      };

      return {
        ...state,
        players: updatedPlayers,
        currentWord: word,
        usedWordIds: updatedUsedIds,
        passesRemaining: state.passesRemaining - 1,
        roundLogs: [logEntry, ...state.roundLogs],
      };
    }

    case 'BUZZER_FOUL': {
      if (state.phase !== 'ROUND_ACTIVE' || !state.currentWord) return state;
      // Krótki cooldown (2.2s), aby 5 osób wciskających buzzer naraz w tej samej sekundzie nie odjęło 50 sekund
      if (now < state.foulCooldownUntil) return state;

      onSoundTrigger?.('BUZZER');

      const penaltySec = state.settings.foulPenaltySeconds;
      const penaltyPts = state.settings.foulPenaltyPoints;
      const newTimeLeft = Math.max(0, state.timeLeft - penaltySec);

      const updatedTeams = state.teams.map((t, idx) =>
        idx === state.activeTeamIndex
          ? { ...t, score: Math.max(0, t.score - penaltyPts) }
          : t
      );

      const updatedPlayers = state.players.map((p) => {
        if (p.id === state.activeSpeakerId) {
          return {
            ...p,
            score: Math.max(0, p.score - penaltyPts),
            stats: {
              ...p.stats,
              foulCountAsSpeaker: p.stats.foulCountAsSpeaker + 1,
            },
          };
        }
        if (p.id === msg.payload.byPlayerId) {
          return {
            ...p,
            stats: {
              ...p.stats,
              caughtOthersCount: p.stats.caughtOthersCount + 1,
            },
          };
        }
        return p;
      });

      const foulWord = state.currentWord.word;
      const foulCategory = state.currentWord.category;

      // Po błędzie na P losujemy nowe hasło, żeby gra toczyła się dynamicznie dalej
      const { word: nextWord, updatedUsedIds } = pickNextWord(state);

      const logEntry = {
        id: `log-${now}-${Math.random()}`,
        timestamp: now,
        type: 'FOUL' as const,
        word: foulWord,
        category: foulCategory,
        actorName: msg.payload.byPlayerName,
        pointsDelta: -penaltyPts,
        timePenalty: penaltySec,
      };

      const updatedState: GameState = {
        ...state,
        teams: updatedTeams,
        players: updatedPlayers,
        currentWord: nextWord,
        usedWordIds: updatedUsedIds,
        timeLeft: newTimeLeft,
        roundScoreDelta: state.roundScoreDelta - penaltyPts,
        roundLogs: [logEntry, ...state.roundLogs],
        foulCooldownUntil: now + 2200,
        lastFoulAlert: {
          id: `foul-${now}`,
          caughtByPlayerId: msg.payload.byPlayerId,
          caughtByPlayerName: msg.payload.byPlayerName,
          caughtByAvatar: msg.payload.byAvatar,
          wordBeingDescribed: foulWord,
          timestamp: now,
        },
      };

      if (newTimeLeft <= 0) {
        onSoundTrigger?.('ROUND_END');
        return {
          ...updatedState,
          phase: 'ROUND_SUMMARY',
          timeLeft: 0,
        };
      }

      return updatedState;
    }

    case 'SUBMIT_GUESS': {
      if (state.phase !== 'ROUND_ACTIVE' || !state.currentWord) return state;
      const { playerId, playerName, avatar, guessText } = msg.payload;
      if (!guessText.trim()) return state;

      const normalizedGuess = normalizePolishText(guessText);
      const normalizedTarget = normalizePolishText(state.currentWord.word);

      // Sprawdzamy dokładne dopasowanie lub dopasowanie głównego członu
      const isCorrect =
        normalizedGuess === normalizedTarget ||
        (normalizedGuess.length >= 4 &&
          normalizedTarget.includes(normalizedGuess));

      const attempt = {
        id: `guess-${now}-${Math.random()}`,
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

      // Odgadnięto poprawnie przez wpisanie na telefonie!
      onSoundTrigger?.('SUCCESS');
      const { word: nextWord, updatedUsedIds } = pickNextWord(state);

      const updatedPlayers = state.players.map((p) => {
        if (p.id === playerId) {
          return {
            ...p,
            score: p.score + 1,
            stats: {
              ...p.stats,
              correctTextGuesses: p.stats.correctTextGuesses + 1,
            },
          };
        }
        if (p.id === state.activeSpeakerId) {
          return {
            ...p,
            score: p.score + 1,
            stats: {
              ...p.stats,
              wordsDescribed: p.stats.wordsDescribed + 1,
            },
          };
        }
        return p;
      });

      const guesserPlayer = state.players.find((p) => p.id === playerId);
      const updatedTeams = state.teams.map((t, idx) => {
        if (
          state.settings.scoringFormat === 'TEAMS' &&
          guesserPlayer &&
          t.id === guesserPlayer.teamId
        ) {
          return { ...t, score: t.score + 1 };
        }
        if (
          state.settings.scoringFormat === 'TEAMS' &&
          !guesserPlayer &&
          idx === state.activeTeamIndex
        ) {
          return { ...t, score: t.score + 1 };
        }
        return t;
      });

      const logEntry = {
        id: `log-${now}-${Math.random()}`,
        timestamp: now,
        type: 'TEXT_GUESS' as const,
        word: state.currentWord.word,
        category: state.currentWord.category,
        actorName: playerName,
        pointsDelta: 1,
      };

      return {
        ...state,
        teams: updatedTeams,
        players: updatedPlayers,
        currentWord: nextWord,
        usedWordIds: updatedUsedIds,
        roundScoreDelta: state.roundScoreDelta + 1,
        roundLogs: [logEntry, ...state.roundLogs],
        recentGuesses: [attempt, ...state.recentGuesses.slice(0, 7)],
      };
    }

    case 'PING': {
      return {
        ...state,
        players: state.players.map((p) =>
          p.id === msg.payload.playerId
            ? { ...p, isConnected: true, lastSeen: now }
            : p
        ),
      };
    }

    default:
      return state;
  }
}

// ============================================================================
// KOMUNIKACJA REAL-TIME (Dual-Transport: PeerJS WebRTC + BroadcastChannel)
// ============================================================================
export class PartyNetworkHost {
  private roomCode: string;
  private bc: BroadcastChannel | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private peer: any = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private connections: Map<string, any> = new Map();
  private onClientMessage: (msg: ClientToHostMessage) => void;
  private storageHandler: ((e: StorageEvent) => void) | null = null;

  constructor(
    roomCode: string,
    onClientMessage: (msg: ClientToHostMessage) => void
  ) {
    this.roomCode = roomCode.toUpperCase();
    this.onClientMessage = onClientMessage;
    this.initLocalChannels();
    this.initPeerJS();
  }

  private initLocalChannels() {
    if (typeof window === 'undefined') return;

    // 1. BroadcastChannel dla błyskawicznej komunikacji między kartami/oknami i w Symulatorze (<5ms)
    if ('BroadcastChannel' in window) {
      this.bc = new BroadcastChannel(`gra-na-p-net-${this.roomCode}`);
      this.bc.onmessage = (ev) => {
        if (ev.data && ev.data.direction === 'CLIENT_TO_HOST') {
          this.onClientMessage(ev.data.message as ClientToHostMessage);
        }
      };
    }

    // 2. Fallback na zdarzenia storage między kartami
    this.storageHandler = (e: StorageEvent) => {
      if (e.key === `gra-na-p-c2h-${this.roomCode}` && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed && parsed.message) {
            this.onClientMessage(parsed.message as ClientToHostMessage);
          }
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('storage', this.storageHandler);
  }

  private async initPeerJS() {
    if (typeof window === 'undefined') return;
    try {
      const { Peer } = await import('peerjs');
      const peerId = `granap-room-${this.roomCode.toLowerCase()}`;
      const peer = new Peer(peerId, {
        debug: 0,
      });

      this.peer = peer;

      peer.on('connection', (conn) => {
        conn.on('open', () => {
          this.connections.set(conn.peer, conn);
        });
        conn.on('data', (data) => {
          if (data && typeof data === 'object' && 'type' in data) {
            this.onClientMessage(data as ClientToHostMessage);
          }
        });
        conn.on('close', () => {
          this.connections.delete(conn.peer);
        });
      });
    } catch {
      // PeerJS opcjonalny gdy brak internetu (działa lokalny BroadcastChannel)
    }
  }

  public broadcast(msg: HostToClientMessage) {
    if (typeof window === 'undefined') return;

    // Zapisz stan w localStorage do natychmiastowego odtworzenia po odświeżeniu lub dołączeniu
    if (msg.type === 'STATE_SYNC') {
      try {
        localStorage.setItem(
          `gra-na-p-state-${this.roomCode}`,
          JSON.stringify(msg.payload.state)
        );
      } catch {
        // ignore quota errors
      }
    }

    if (this.bc) {
      this.bc.postMessage({
        direction: 'HOST_TO_CLIENT',
        message: msg,
      });
    }

    // Wyślij przez WebRTC do wszystkich podłączonych smartfonów
    this.connections.forEach((conn) => {
      try {
        if (conn.open) {
          conn.send(msg);
        }
      } catch {
        // ignore closed conn
      }
    });
  }

  public destroy() {
    if (this.bc) {
      this.bc.close();
      this.bc = null;
    }
    if (typeof window !== 'undefined' && this.storageHandler) {
      window.removeEventListener('storage', this.storageHandler);
    }
    if (this.peer) {
      try {
        this.peer.destroy();
      } catch {
        // ignore
      }
      this.peer = null;
    }
  }
}

export class PartyNetworkClient {
  private roomCode: string;
  private bc: BroadcastChannel | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private peer: any = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private conn: any = null;
  private onHostMessage: (msg: HostToClientMessage) => void;
  private onConnectionChange?: (connected: boolean) => void;
  private storageHandler: ((e: StorageEvent) => void) | null = null;

  constructor(
    roomCode: string,
    onHostMessage: (msg: HostToClientMessage) => void,
    onConnectionChange?: (connected: boolean) => void
  ) {
    this.roomCode = roomCode.toUpperCase();
    this.onHostMessage = onHostMessage;
    this.onConnectionChange = onConnectionChange;
    this.initLocalChannels();
    this.initPeerJS();
  }

  private initLocalChannels() {
    if (typeof window === 'undefined') return;

    if ('BroadcastChannel' in window) {
      this.bc = new BroadcastChannel(`gra-na-p-net-${this.roomCode}`);
      this.bc.onmessage = (ev) => {
        if (ev.data && ev.data.direction === 'HOST_TO_CLIENT') {
          this.onConnectionChange?.(true);
          this.onHostMessage(ev.data.message as HostToClientMessage);
        }
      };
    }

    // Odczyt początkowego stanu z LocalStorage jeśli gra jest na tym samym urządzeniu
    try {
      const saved = localStorage.getItem(`gra-na-p-state-${this.roomCode}`);
      if (saved) {
        const parsedState = JSON.parse(saved) as GameState;
        setTimeout(() => {
          this.onConnectionChange?.(true);
          this.onHostMessage({
            type: 'STATE_SYNC',
            payload: { state: parsedState },
          });
        }, 30);
      }
    } catch {
      // ignore
    }

    this.storageHandler = (e: StorageEvent) => {
      if (e.key === `gra-na-p-state-${this.roomCode}` && e.newValue) {
        try {
          const parsedState = JSON.parse(e.newValue) as GameState;
          this.onConnectionChange?.(true);
          this.onHostMessage({
            type: 'STATE_SYNC',
            payload: { state: parsedState },
          });
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('storage', this.storageHandler);
  }

  private async initPeerJS() {
    if (typeof window === 'undefined') return;
    try {
      const { Peer } = await import('peerjs');
      const peer = new Peer({ debug: 0 });
      this.peer = peer;

      peer.on('open', () => {
        const hostPeerId = `granap-room-${this.roomCode.toLowerCase()}`;
        const conn = peer.connect(hostPeerId, { reliable: true });
        this.conn = conn;

        conn.on('open', () => {
          this.onConnectionChange?.(true);
        });

        conn.on('data', (data) => {
          if (data && typeof data === 'object' && 'type' in data) {
            this.onConnectionChange?.(true);
            this.onHostMessage(data as HostToClientMessage);
          }
        });

        conn.on('close', () => {
          this.onConnectionChange?.(false);
        });
      });
    } catch {
      // Fallback na BroadcastChannel
    }
  }

  public send(msg: ClientToHostMessage) {
    if (typeof window === 'undefined') return;

    if (this.bc) {
      this.bc.postMessage({
        direction: 'CLIENT_TO_HOST',
        message: msg,
      });
    }

    try {
      localStorage.setItem(
        `gra-na-p-c2h-${this.roomCode}`,
        JSON.stringify({ ts: Date.now(), message: msg })
      );
    } catch {
      // ignore
    }

    if (this.conn && this.conn.open) {
      try {
        this.conn.send(msg);
      } catch {
        // ignore
      }
    }
  }

  public destroy() {
    if (this.bc) {
      this.bc.close();
      this.bc = null;
    }
    if (typeof window !== 'undefined' && this.storageHandler) {
      window.removeEventListener('storage', this.storageHandler);
    }
    if (this.peer) {
      try {
        this.peer.destroy();
      } catch {
        // ignore
      }
      this.peer = null;
    }
  }
}
