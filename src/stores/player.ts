import { atom } from 'jotai';
import { TrackType } from '~/api/types/LibraryResponseType';

export const playerStateAtom = atom<{
  playIndex: number;
  queue: Array<TrackType>;
  play: boolean;
} | null>(null);
playerStateAtom.debugLabel = 'playerStatus';

export const playerNotReactiveStateAtom = atom < {};
