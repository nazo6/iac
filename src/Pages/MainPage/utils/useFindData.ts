import { useAtomValue } from 'jotai/utils';
import {
  albumsStateSelector,
  artistsStateSelector,
  playlistsStateSelector,
  tracksStateSelector,
} from '~/stores/library';

export const useFindAlbumDataById = () => {
  const albumsState = useAtomValue(albumsStateSelector);
  return (albumId: string) => {
    const albumData = albumsState.find((value) => value.id === albumId);
    if (!albumData) {
      throw Error('Album not found.');
    }
    return albumData;
  };
};

export const useFindTrackDataById = () => {
  const tracksState = useAtomValue(tracksStateSelector);
  return (trackId: string) => {
    const trackData = tracksState.find((value) => value.id === trackId);
    if (!trackData) {
      throw Error('Track not found.');
    }
    return trackData;
  };
};

export const useFindArtistDataById = () => {
  const artistsState = useAtomValue(artistsStateSelector);
  return (artistId: string) => {
    const artistData = artistsState.find((value) => value.id === artistId);
    if (!artistData) {
      throw Error('Album not found.');
    }
    return artistData;
  };
};

export const useFindPlayListDataById = () => {
  const playlistState = useAtomValue(playlistsStateSelector);
  return (playlistId: string) => {
    const playlistData = playlistState.find((value) => value.id === playlistId);
    if (!playlistData) {
      throw Error('Playlist not found.');
    }
    return playlistData;
  };
};
