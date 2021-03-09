import type { BaseResponseType } from '../../../types/BaseResponseType';

export type Methods = {
  post: {
    reqHeaders: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8';
    };
    reqBody: {
      _userid: string;
      _token: string;
      mode: 'set_artwork';
      artwork_id: string;
      tracks: number[];
      client: string;
      device_name: string;
      version: string;
      supported_types: false;
    };
    resBody: BaseResponseType;
  };
};
