import { atom } from 'jotai';

import { FolderType } from '~/types/DataTypes';
import { LibraryResponseType } from '~/types/LibraryResponseType';

import { atomWithSave } from './utils';

export const libraryStateAtom = atomWithSave<LibraryResponseType | null>({
  key: 'libraryState',
  defaultValue: null,
});

export const tracksStateSelector = atom((get) => get(libraryStateAtom)!.library.tracks);
export const albumsStateSelector = atom((get) => get(libraryStateAtom)!.library.albums);
export const artistsStateSelector = atom((get) => get(libraryStateAtom)!.library.artists);
export const playlistsStateSelector = atom(
  (get) => get(libraryStateAtom)!.library.playlists,
);
export const trashStateSelector = atom((get) => get(libraryStateAtom)!.library.albums);
export const tagsStateSelector = atom((get) => get(libraryStateAtom)!.library.tags);

export const folderStatetAtom = atomWithSave<FolderType>({
  key: 'folderState',
  defaultValue: [
    {
      name: 'root',
    },
  ],
});
