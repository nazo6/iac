import { atom } from 'jotai';
import { TrackType } from '~/api/types/LibraryResponseType';

export const playerStateAtom = atom<{
  playIndex: number;
  queue: Array<TrackType>;
  play: boolean;
}>({
  playIndex: 0,
  queue: [],
  play: false,
});
playerStateAtom.debugLabel = 'playerStatus';
