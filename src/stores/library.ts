import { atom } from 'jotai';
import { LibraryResponseType } from '~/api/types/LibraryResponseType';
import { atomWithSave } from './utils';

export const libraryState = atomWithSave<LibraryResponseType | null>({
  key: 'libraryState',
  defaultValue: null,
});

export const tracksStateSelector = atom((get) => get(libraryState)!.library.tracks);
export const albumsStateSelector = atom((get) => get(libraryState)!.library.albums);
export const artistsStateSelector = atom((get) => get(libraryState)!.library.artists);
export const playlistsStateSelector = atom((get) => get(libraryState)!.library.playlists);
export const trashStateSelector = atom((get) => get(libraryState)!.library.albums);
