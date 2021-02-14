import { atom } from 'jotai';
import { LibraryResponseType } from '~/api/types/LibraryResponseType';
import { atomWithSave } from './utils';

export const libraryState = atomWithSave<LibraryResponseType | null>({
  key: 'libraryState',
  defaultValue: null,
});

export const tracksStateAtom = atom((get) => get(libraryState)!.library.tracks);
export const albumsStateAtom = atom((get) => get(libraryState)!.library.albums);
export const artistsStateAtom = atom((get) => get(libraryState)!.library.artists);
export const playlistsStateAtom = atom((get) => get(libraryState)!.library.playlists);
export const trashStateAtom = atom((get) => get(libraryState)!.library.albums);
