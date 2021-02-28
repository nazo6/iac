export type Methods = {
  post: {
    reqHeaders: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8';
    };
    reqBody: {
      _userid: string;
      _token: string;
      mode: 'library';
      client: string;
      device_name: string;
      version: string;
      supported_types: boolean;
      url: '//library.ibroadcast.com';
    };

    resBody: any;
  };
};
