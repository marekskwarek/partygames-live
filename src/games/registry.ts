import type { GameId, GameModule } from '@/core/types';
import { graNaPModule } from './gra-na-p/module';
import { marilynMonroeModule } from './marilyn-monroe/module';
import { szpiegModule } from './szpieg/module';

/** Rejestr gier dostępnych w Hubie. Aby dodać nową grę, wystarczy dopisać ją tutaj. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GAMES: GameModule<any, any>[] = [
  graNaPModule,
  marilynMonroeModule,
  szpiegModule,
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getGame(id: GameId): GameModule<any, any> {
  const mod = GAMES.find((g) => g.id === id);
  if (!mod) throw new Error(`Nieznana gra: ${id}`);
  return mod;
}
