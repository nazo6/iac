import type { AuthRequestBodyType } from '../../types/AuthRequestType';
import type { BaseResponseType } from '../../types/BaseResponseType';

export type Methods = {
  post: {
    reqHeaders: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8';
    };
    reqBody: AuthRequestBodyType;

    resBody: BaseResponseType;
  };
};
