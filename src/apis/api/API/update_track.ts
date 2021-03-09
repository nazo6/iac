import type { BaseResponseType } from '../../../types/BaseResponseType';

export type Methods = {
  post: {
    reqHeaders: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8';
    };
    reqBody: {
      _userid: string;
      _token: string;
      mode: 'update_track';
      tracks: {
        /** Equal track id */
        file_id: number;
        genre: string;
        artwork_id: number;
        path: string;
        size: number;
        title: string;
        artist_id: number;
        album_id: number;
        uid: string;
        track_no: number;
        type: string;
        uploaded_on: string;
        trashed: boolean;
        replay_gain: string;
        enid: number;
        uploaded_time: string;
        rating: number;
        plays: number;
        year: string;
        file: string;
        album?: string;
        artist?: string;
      }[];
      client: string;
      device_name: string;
      version: string;
      supported_types: false;
    };
    resBody: BaseResponseType;
  };
};
