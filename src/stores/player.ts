import { atom } from 'jotai';
import { TrackType } from '~/api/types/LibraryResponseType';

export const playerState = atom<{ enabled: false } | { enabled: true; playing: boolean; src: string }>({
  enabled: false,
});

export const queueState = atom<Array<TrackType>>([]);
