import { getGame } from '@/games/registry';
import type {
  ClientMessage,
  GameContext,
  GameId,
  RoomPlayer,
  RoomState,
  SoundEvent,
} from './types';

/** Po tylu ms bez sygnału od telefonu gracz jest oznaczany jako rozłączony. */
export const STALE_AFTER_MS = 12000;

export function createRoom(id: string): RoomState {
  return {
    id,
    players: [],
    activeGame: 'HUB',
    gameState: null,
    updatedAt: Date.now(),
  };
}

function makeContext(
  room: RoomState,
  now: number,
  fromHost: boolean,
  emit: (s: SoundEvent) => void
): GameContext {
  return { now, roomCode: room.id, players: room.players, fromHost, emit };
}

/** Synchronizuje listę graczy pokoju ze stanem aktywnej gry. */
export function syncGame(room: RoomState): RoomState {
  if (room.activeGame === 'HUB' || room.gameState == null) return room;
  const mod = getGame(room.activeGame);
  const next = mod.syncPlayers(room.gameState, room.players);
  return next === room.gameState ? room : { ...room, gameState: next };
}

/** Dodaje gracza do pokoju lub odświeża jego profil (idempotentne – służy też jako heartbeat). */
export function upsertPlayer(
  room: RoomState,
  payload: { playerId: string; name: string; avatar: string; ready: boolean },
  now: number
): RoomState {
  const name = payload.name.trim().slice(0, 18);
  const idx = room.players.findIndex((p) => p.id === payload.playerId);
  const players = [...room.players];

  if (idx === -1) {
    if (!name) return room;
    const created: RoomPlayer = {
      id: payload.playerId,
      name,
      avatar: payload.avatar || '🌭',
      ready: payload.ready,
      isConnected: true,
      lastSeen: now,
      joinedAt: now,
    };
    players.push(created);
  } else {
    players[idx] = {
      ...players[idx],
      name: name || players[idx].name,
      avatar: payload.avatar || players[idx].avatar,
      ready: payload.ready,
      isConnected: true,
      lastSeen: now,
    };
  }
  return syncGame({ ...room, players });
}

/** Główny reducer wiadomości od telefonów. */
export function handleClientMessage(
  room: RoomState,
  msg: ClientMessage,
  emit: (s: SoundEvent) => void,
  now: number = Date.now()
): RoomState {
  switch (msg.type) {
    case 'HELLO':
      return upsertPlayer(room, msg.payload, now);

    case 'GAME_ACTION': {
      const { game, playerId, action } = msg.payload;
      if (room.activeGame !== game || room.gameState == null) return room;
      if (!room.players.some((p) => p.id === playerId)) return room;
      const mod = getGame(game);
      const next = mod.reduce(
        room.gameState,
        action,
        makeContext(room, now, false, emit)
      );
      return next === room.gameState ? room : { ...room, gameState: next };
    }

    default:
      return room;
  }
}

/** Akcja wywołana z ekranu Hosta (uprawniona do akcji HOST_*). */
export function dispatchFromHost(
  room: RoomState,
  action: unknown,
  emit: (s: SoundEvent) => void,
  now: number = Date.now()
): RoomState {
  if (room.activeGame === 'HUB' || room.gameState == null) return room;
  const mod = getGame(room.activeGame);
  const next = mod.reduce(
    room.gameState,
    action,
    makeContext(room, now, true, emit)
  );
  return next === room.gameState ? room : { ...room, gameState: next };
}

export function selectGame(room: RoomState, gameId: GameId): RoomState {
  const mod = getGame(gameId);
  if (room.players.length === 0) return room;
  return {
    ...room,
    activeGame: gameId,
    gameState: mod.createInitialState(room.players, room.id),
  };
}

export function backToHub(room: RoomState): RoomState {
  if (room.activeGame === 'HUB') return room;
  return { ...room, activeGame: 'HUB', gameState: null };
}

/** Wywoływane co sekundę: oznaczanie rozłączonych graczy i zegar aktywnej gry. */
export function tickRoom(
  room: RoomState,
  emit: (s: SoundEvent) => void,
  now: number = Date.now()
): RoomState {
  let next = room;

  const players = room.players.map((p) =>
    p.isConnected && now - p.lastSeen > STALE_AFTER_MS
      ? { ...p, isConnected: false }
      : p
  );
  if (players.some((p, i) => p !== room.players[i])) {
    next = syncGame({ ...room, players });
  }

  if (next.activeGame !== 'HUB' && next.gameState != null) {
    const mod = getGame(next.activeGame);
    if (mod.tick) {
      const gs = mod.tick(next.gameState, makeContext(next, now, true, emit));
      if (gs !== next.gameState) next = { ...next, gameState: gs };
    }
  }
  return next;
}
