import type { GameModule } from '@/core/types';
import HostView from './HostView';
import PlayerView from './PlayerView';
import { createInitialState, reduce, syncPlayers, tick } from './logic';
import type { SpyAction, SpyState } from './types';

export const szpiegModule: GameModule<SpyState, SpyAction> = {
  id: 'SZPIEG',
  title: 'Szpieg',
  tagline:
    'Gra dedukcji społecznej i blefu (format Spyfall / Zero Presji)! Agenci znają tajną lokację, a ukryty Szpieg musi sprytnie przetrwać przesłuchanie.',
  emoji: '🕵️‍♂️',
  accent: '#2BD2FF',
  minPlayers: 1,
  playersHint: '3–12 graczy • optymalnie 4',
  createInitialState,
  syncPlayers,
  reduce,
  tick,
  HostView,
  PlayerView,
};
