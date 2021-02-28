export type BaseResponseType = {
  result: boolean;
  authenticated: boolean;
  status: {
    app_available: boolean;
    expires: string; //'2021-01-30 00:35:32.000000'
    plays: number;
    timestamp: string; //'2021-01-16 00:35:32'
    lastmodified: string; //'2021-01-16 00:35:32'
    achievement_status: {
      [id: string]: {
        completed_on: string; //'2021-01-15'
        achievement_id: string; //'1150'
      };
      //'1150': { completed_on: '2021-01-15'; achievement_id: '1150' }
    };
    app_version: string; //'6.5'
    available: number; //812
  };
  message: string; //'ok'
  googledrive: { linked: boolean };
  dropbox: { linked: boolean };
  user: {
    password_change: boolean;
    token: string; //'60df39c6-5752-11eb-b68c-1418774e50a6'
    device_name: string; //'Website (Chrome, Win32)'
    user_id: string; //'2213580'
    session: {
      data: null;
      session_uuid: string; //'60e0d1b1-5752-11eb-b68c-1418774e50a6'
      remote_addr: string; //'221.187.91.195'
      last_login: string; //'2021-01-16 00:35:35'
      user_agent: string; //'221.187.91.195'
      user_id: string; //'2213580'
      device_name: string; //'Website (Chrome, Win32)'
      sessions: Array<{
        client: string; //'android'
        location: string | null; //null
        joinable: true;
        user_id: string; //'2213580'
        device_name: string; //'Amazon Fire'
        last_login: string; //'2021-01-15 18:25:04'
        remote_addr: string; //'221.187.91.195'
        user_agent: string; //'221.187.91.195'
        data: null;
        session_uuid: string; //'dea3de9e-575d-11eb-b68c-1418774e50a6'
      }>;
      location: null;
      client: string; //'website'
    };
    user_agent: string; //'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.85 Safari/537.36'
    remote_addr: string; //'221.187.91.195'
    client: string; //'website'
    email_address: string; //'nazorgt@gmail.com'
    facebook: string; //false
    created_on: string; //'2021-01-15 16:54:48'
    premium: boolean;
    userid: string; //'2213580'
    verified: string; //true
    id: string; //'2213580'
    username: string | null;
    verified_on: string; //'2021-01-15 13:31:37'
    preferences: {
      bitratepref: number;
      combine_sets: string; //'0'
    };
    tester: boolean;
  };
  settings: {
    fast_polling: number; //30
    artwork_server: string; //'https://artwork.ibroadcast.com'
    librarybytespersong: number; //150
    streaming_server: string; //'https://streaming.ibroadcast.com'
    slow_polling: number; //300
    librarysongspersecond: number; //4000
    achievements: Array<{
      id: string; // '1000'
      disabled: string; //'0'
      name: string; //'Uploader'
      description: string; //'Upload a song into your library'
    }>;
  };
  messages: [];
  lastfm:
    | {
        linked: false;
      }
    | {
        linked: true;
        user?: string; //'nazo_x_'
        sessionkey: string; //'YjgtPuPSBzdbSHa2wcd2UCWrfwHaNtCN';
        message: string; //'Linked to nazo_x_ on Last.fm';
      };
};
