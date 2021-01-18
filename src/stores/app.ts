import { atom } from 'recoil';
import { LibraryResponseType } from '../types/LibraryResponseType';
import { persistEffect } from './effects';

export const authState = atom<{ token: string; userId: string } | null>({
  key: 'authState',
  default: null,
  effects_UNSTABLE: [persistEffect('app-auth')],
});

export const lastfmTokenState = atom<string | null>({
  key: 'lastfmTokenState',
  default: null,
  effects_UNSTABLE: [persistEffect('app-lastfmtoken')],
});

export const libraryState = atom<LibraryResponseType | null>({
  key: 'libraryState',
  default: null,
  effects_UNSTABLE: [persistEffect('app-librarystate')],
});
