export type PlayListType = {
  id: string;
  name: string;
  tracks: Array<string>;
  uid: number;
  system_created: boolean;
  public_id: null | number;
  type: null | unknown;
  description: null | string;
  artwork_id: null | number;
  sort: number;
};

export type ArtistType = {
  id: string;
  name: string;
  /** Array of trackId */
  tracks: Array<string>;
  trashed: boolean;
  rating: number;
};

export type AlbumType = {
  id: string;
  name: string;
  tracks: Array<number>;
  artist_id: number;
  trashed: boolean;
  rating: number;
  disc: number;
  year: number;
  artist?: string;
};

export type TrackType = {
  id: string;
  track: number;
  year: number;
  title: string;
  genre: string;
  /** Song length (seconds) */
  length: number;
  album_id: number;
  artwork_id: number;
  artist_id: number;
  enid: number;
  uploaded_on: string;
  trashed: boolean;
  size: number;
  path: string;
  uid: string;
  rating: number;
  plays: number;
  /** Audio file path. */
  file: string;
  /** Mime type e.g. audio/mpeg3 */
  type: string;
  /** Replay gain (number as string) e.g. -4.7*/
  replay_gain: string;
  /** Uploaded time. e.g. 17:13:59 */
  uploaded_time: string;
  album?: string;
  artist?: string;
};

export type TagType = {
  archived: boolean;
  id: string;
  name: string;
  tracks: number[];
};

export type FolderType = {
  name: string;
  files?: number[];
  folders?: FolderType;
}[];

export type ArtworkListType = { artwork_id: string }[];
