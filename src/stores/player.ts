import { atom } from 'jotai';
import type { TrackType } from '~/types/DataTypes';

export const playerStateAtom = atom<{
  playIndex: number;
  queue: Array<TrackType>;
  play: boolean;
} | null>(null);
playerStateAtom.debugLabel = 'playerStatus';

export const playerNotReactiveStateAtom = atom<{
  position: number;
  volume: number;
} | null>(null);
