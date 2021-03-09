import type { BaseResponseType } from '../../../types/BaseResponseType';

export type Methods = {
  post: {
    reqHeaders: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8';
    };
    reqBody: {
      _userid: number;
      _token: string;
      mode: 'create_artist';
      name: string;
      client: string;
      device_name: string;
      version: string;
      supported_types: false;
    };
    resBody: BaseResponseType & {
      artist_id: string;
    };
  };
};
