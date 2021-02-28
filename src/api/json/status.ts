import type { AuthRequestBodyType } from '../types/AuthRequestType';
import type { AuthResponseType } from '../types/AuthResponseType';

export type Methods = {
  post: {
    reqHeaders: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8';
    };
    reqBody: AuthRequestBodyType;

    resBody: AuthResponseType;
  };
};
