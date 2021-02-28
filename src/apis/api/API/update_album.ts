import { BaseResponseType } from '../../types/BaseResponseType';

export type Methods = {
  post: {
    reqHeaders: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8';
    };
    reqBody: {
      _userid: number;
      _token: string;
      mode: 'update_album';
      album_id: number;
      artist_id: number;
      name: string;
      year: string;
      client: string; //'editor'
      device_name: string;
      version: string;
      supported_types: false;
    };
    resBody: BaseResponseType;
  };
};
