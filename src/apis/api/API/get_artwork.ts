import type { BaseResponseType } from '../../../types/BaseResponseType';

export type Methods = {
  post: {
    reqHeaders: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8';
    };
    reqBody: {
      _userid: string;
      _token: string;
      mode: 'get_artwork';
      track_id: number;
      client: string;
      device_name: string;
      version: string;
      supported_types: false;
    };

    resBody: BaseResponseType & {
      art: { artwork_id: string }[];
    };
  };
};
