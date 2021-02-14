import produce from 'immer';
import { atom, DefaultValue, selector } from 'recoil';
import { TrackType } from '~/api/types/LibraryResponseType';

export const playerState = atom<{ enabled: false } | { enabled: true; playing: boolean; src: string }>({
  key: 'playerState',
  default: { enabled: false },
});

export const queueState = atom<Array<TrackType>>({
  key: 'trackType',
  default: [],
});

export const interruptingQueueSetter = selector<TrackType>({
  key: 'interruptingQueueSetter',
  get: ({ get }) => get(queueState)[0],
  set: ({ set, get }, newValue) => {
    if (newValue instanceof DefaultValue) {
      set(queueState, newValue);
    } else {
      set(
        queueState,
        produce(get(queueState), (newState) => {
          newState.unshift(newValue);
        }),
      );
    }
  },
});
