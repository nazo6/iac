import type { AuthRequestBodyType } from '../types/AuthRequestType';
import type { AuthResponseType } from '../types/AuthResponseType';

export type Methods = {
  post: {
    reqFormat: URLSearchParams;
    reqBody: AuthRequestBodyType;

    resBody: AuthResponseType;
  };
};
