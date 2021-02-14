import { atomFamily } from 'recoil';

export const vlistScrollPositionStateFamily = atomFamily<null | number, string>({
  key: 'vlistScrollPosition',
  default: null,
});
