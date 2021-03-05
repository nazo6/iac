import { useAtomValue } from 'jotai/utils';

import {
  albumsStateSelector,
  artistsStateSelector,
  playlistsStateSelector,
  tracksStateSelector,
} from '~/stores/library';

export const useFindAlbumDataById = () => {
  const albumsState = useAtomValue(albumsStateSelector);
  return (albumId: string | number) => {
    const albumData = albumsState.find((value) => value.id === albumId.toString());
    if (!albumData) {
      throw Error('Album not found.');
    }
    return albumData;
  };
};

export const useFindTrackDataById = () => {
  const tracksState = useAtomValue(tracksStateSelector);
  return (trackId: string | number) => {
    const trackData = tracksState.find((value) => value.id === trackId.toString());
    if (!trackData) {
      throw Error('Track not found. trackid:' + trackId);
    }
    return trackData;
  };
};

export const useFindArtistDataById = () => {
  const artistsState = useAtomValue(artistsStateSelector);
  return (artistId: string | number) => {
    const artistData = artistsState.find((value) => value.id === artistId.toString());
    if (!artistData) {
      throw Error('Album not found.');
    }
    return artistData;
  };
};

export const useFindPlayListDataById = () => {
  const playlistState = useAtomValue(playlistsStateSelector);
  return (playlistId: string | number) => {
    const playlistData = playlistState.find(
      (value) => value.id === playlistId.toString(),
    );
    if (!playlistData) {
      throw Error('Playlist not found.');
    }
    return playlistData;
  };
};
