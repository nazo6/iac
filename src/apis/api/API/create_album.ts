import type { BaseResponseType } from '../../../types/BaseResponseType';

export type Methods = {
  post: {
    reqHeaders: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8';
    };
    reqBody: {
      _userid: number;
      _token: string;
      mode: 'create_album';
      artist_id: 0;
      client: string; //'editor'
      device_name: string;
      version: string;
      supported_types: false;
    };
    resBody: BaseResponseType & {
      album_id: number;
    };
  };
};
