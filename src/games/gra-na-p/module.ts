import type { GameModule } from '@/core/types';
import HostView from './HostView';
import PlayerView from './PlayerView';
import { createInitialState, reduce, syncPlayers, tick } from './logic';
import type { GameAction, GameState } from './types';

export const graNaPModule: GameModule<GameState, GameAction> = {
  id: 'GRA_NA_P',
  title: 'Gra na P',
  tagline:
    'Opisuj hasła używając wyłącznie słów na literę „P”. Przeciwnicy czuwają przy czerwonym buzzerze!',
  emoji: '🅿️',
  accent: '#FFD600',
  minPlayers: 1,
  playersHint: '1–12 graczy • solo lub drużyny',
  createInitialState,
  syncPlayers,
  reduce,
  tick,
  HostView,
  PlayerView,
};
