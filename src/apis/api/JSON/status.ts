import type { BaseResponseType } from '../../../types/BaseResponseType';

export type Methods = {
  post: {
    reqHeaders: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8';
    };
    reqBody:
      | {
          email_address: string;
          password: string;
          mode: 'status';
          client: string;
          device_name: string;
          version: string;
          supported_types: boolean;
          url: '//api.ibroadcast.com/s/JSON/status';
        }
      | {
          _userid: string;
          _token: string;
          mode: 'status';
          client: string;
          device_name: string;
          version: string;
          supported_types: boolean;
          url: string;
        };

    resBody: BaseResponseType;
  };
};
