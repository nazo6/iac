import type { AuthRequestBodyType } from '../types/AuthRequestType';
import type { BaseResponseType } from '../types/BaseResponseType';
import { LibraryRequestType } from '../types/LibraryRequestType';
import { LibraryResponseType } from '../types/LibraryResponseType';

export type Methods = {
  post: {
    reqHeaders: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8';
    };
    reqBody: LibraryRequestType;

    resBody: any;
  };
};
