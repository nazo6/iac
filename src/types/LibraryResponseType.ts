import type {
  PlayListType,
  ArtistType,
  AlbumType,
  TrackType,
  TagType,
} from '~/types/DataTypes';

export type LibraryResponseType = {
  settings: {
    artwork_server: string;
    fast_polling: number;
    librarybytespersong: number;
    streaming_server: string;
    slow_polling: number;
    librarysongspersecond: number;
  };
  status: {
    lastmodified: string;
    app_available: boolean;
    expires: string;
    timestamp: string;
    app_version: string;
  };
  library: {
    expires: number;
    tags: Array<TagType>;
    tracks: Array<TrackType>;
    artists: Array<ArtistType>;
    albums: Array<AlbumType>;
    playlists: Array<PlayListType>;
    trash: Array<{ trashId: string; name: string; tracks?: Array<number> }>;
  };
  lastfm: {
    sessionkey: string;
    user: string;
    linked: boolean;
    message: string;
  };
  result: boolean;
};
