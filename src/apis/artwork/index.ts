export type Methods = {
  post: {
    reqFormat: FormData;
    reqBody:
      | {
          _userid: number;
          _token: string;
          album_id: number;
          artworkurl: string;
          client: string;
          device_name: string;
        }
      | {
          uploaded_file: Blob;
          _userid: number;
          _token: string;
          album_id: number;
          client: string;
          device_name: string;
        };
    resBody:
      | {
          artwork_id: string;
          message: string;
          result: true;
        }
      | {
          message: string;
          result: false;
        };
  };
};
