import type { ComponentType } from 'react';

/** Identyfikatory gier dostępnych w Hubie. */
export type GameId = 'GRA_NA_P' | 'MARILYN_MONROE' | 'SZPIEG';

/** Aktualny ekran pokoju: Hub (menu wyboru gry) albo konkretna gra. */
export type ActiveGame = 'HUB' | GameId;

/** Gracz należący do POKOJU (nie do konkretnej gry) – zostaje przy zmianie gier. */
export interface RoomPlayer {
  id: string;
  name: string;
  avatar: string;
  ready: boolean;
  isConnected: boolean;
  lastSeen: number;
  joinedAt: number;
}

/**
 * Stan trwałego pokoju, którego jedynym autorytetem jest Host.
 * Rozsyłany do wszystkich telefonów po każdej zmianie.
 */
export interface RoomState {
  id: string;
  players: RoomPlayer[];
  activeGame: ActiveGame;
  /** Stan aktywnej gry (null w Hubie). Format zależy od modułu gry. */
  gameState: unknown | null;
  updatedAt: number;
}

export type SoundEvent =
  | 'BUZZER'
  | 'SUCCESS'
  | 'PASS'
  | 'ROUND_START'
  | 'ROUND_END'
  | 'FANFARE'
  | 'TICK'
  | 'TICK_URGENT';

/** Wiadomości Gracz → Host. */
export type ClientMessage =
  | {
      type: 'HELLO';
      payload: { playerId: string; name: string; avatar: string; ready: boolean };
    }
  | {
      type: 'GAME_ACTION';
      payload: { game: GameId; playerId: string; action: unknown };
    };

/** Koperta z unikalnym ID – pozwala Hostowi odrzucić duplikaty z kilku kanałów. */
export interface ClientEnvelope {
  mid: string;
  message: ClientMessage;
}

/** Wiadomości Host → Gracze. */
export type HostMessage = {
  type: 'ROOM_SYNC';
  payload: { room: RoomState };
};

/** Kontekst przekazywany do reducerów gier. */
export interface GameContext {
  now: number;
  roomCode: string;
  players: RoomPlayer[];
  /** true gdy akcja pochodzi z ekranu Hosta (uprawnia do akcji HOST_*). */
  fromHost: boolean;
  emit: (sound: SoundEvent) => void;
}

export interface HostViewProps<S, A> {
  state: S;
  players: RoomPlayer[];
  roomCode: string;
  dispatch: (action: A) => void;
}

export interface PlayerViewProps<S, A> {
  state: S;
  me: RoomPlayer;
  players: RoomPlayer[];
  roomCode: string;
  isConnected: boolean;
  send: (action: A) => void;
}

/**
 * Kontrakt modułu gry. Każda gra to izolowany moduł w /games/<nazwa>,
 * który Hub potrafi uruchomić bez znajomości jego wnętrza.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface GameModule<S = any, A = any> {
  id: GameId;
  title: string;
  tagline: string;
  emoji: string;
  /** Kolor akcentu kafla w Hubie (hex). */
  accent: string;
  minPlayers: number;
  playersHint: string;
  createInitialState(players: RoomPlayer[], roomCode: string): S;
  /** Wywoływane przy każdej zmianie listy graczy pokoju (dołączenie, rozłączenie). */
  syncPlayers(state: S, players: RoomPlayer[]): S;
  reduce(state: S, action: A, ctx: GameContext): S;
  /** Wywoływane co sekundę przez Hosta (zegar rundy). */
  tick?(state: S, ctx: GameContext): S;
  HostView: ComponentType<HostViewProps<S, A>>;
  PlayerView: ComponentType<PlayerViewProps<S, A>>;
}
