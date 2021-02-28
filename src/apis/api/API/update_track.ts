import { BaseResponseType } from '../types/BaseResponseType';

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
        length: number;
        size: number;
        title: string;
        artist_id: number;
        album_id: number;
        uid: '';
        track_no: number;
        type: string; //'audio/mpeg3'
        uploaded_on: string; //'2021-01-15'
        trashed: boolean;
        replay_gain: string; //'-7.7'
        enid: 0;
        uploaded_time: string; //'16:05:20'
        rating: number;
        plays: number;
        year: string;
        file: string; //'/128/aae/5e9/160499822'
        album: string;
        artist: string;
      }[];
      client: string;
      device_name: string;
      version: string;
      supported_types: false;
    };
    resBody: BaseResponseType;
  };
};
