import type { GameModule } from '@/core/types';
import HostView from './HostView';
import PlayerView from './PlayerView';
import { createInitialState, reduce, syncPlayers, tick } from './logic';
import type { MarilynAction, MarilynState } from './types';

export const marilynMonroeModule: GameModule<MarilynState, MarilynAction> = {
  id: 'MARILYN_MONROE',
  title: 'Marilyn Monroe',
  tagline:
    'Dynamiczna gra w Tabu! Opisuj znane postaci ze świata popkultury, filmu i historii z bezwzględnym zakazem 3 słów kluczowych.',
  emoji: '💋',
  accent: '#FF2A54',
  minPlayers: 1,
  playersHint: '1–12 graczy • solo lub drużynowo',
  createInitialState,
  syncPlayers,
  reduce,
  tick,
  HostView,
  PlayerView,
};
