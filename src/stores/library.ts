import { atom, selector } from 'recoil';
import { LibraryResponseType } from '~/api/types/LibraryResponseType';
import { persistEffect } from './effects';

export const libraryState = atom<LibraryResponseType | null>({
  key: 'libraryState',
  default: null,
  effects_UNSTABLE: [persistEffect('app-librarystate')],
});

export const tracksState = selector({
  key: 'tracksState',
  get: ({ get }) => get(libraryState)!.library.tracks,
});
export const albumsState = selector({
  key: 'albumsState',
  get: ({ get }) => get(libraryState)!.library.albums,
});
export const artistsState = selector({
  key: 'artistsState',
  get: ({ get }) => get(libraryState)!.library.artists,
});
export const playlistsState = selector({
  key: 'playlistsState',
  get: ({ get }) => get(libraryState)!.library.playlists,
});
export const trashStaete = selector({
  key: 'trashState',
  get: ({ get }) => get(libraryState)!.library.trash,
});
