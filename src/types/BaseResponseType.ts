export type BaseResponseType = {
  result: boolean;
  authenticated: boolean;
  status: {
    app_available: boolean;
    expires: string;
    plays: number;
    timestamp: string;
    lastmodified: string;
    achievement_status: {
      [id: string]: {
        completed_on: string;
        achievement_id: string;
      };
    };
    app_version: string;
    available: number;
  };
  message: string;
  googledrive: { linked: boolean };
  dropbox: { linked: boolean };
  user: {
    password_change: boolean;
    token: string;
    device_name: string;
    user_id: string;
    session: {
      data: null;
      session_uuid: string;
      remote_addr: string;
      last_login: string;
      user_agent: string;
      user_id: string;
      device_name: string;
      sessions: Array<{
        client: string;
        location: string | null;
        joinable: true;
        user_id: string;
        device_name: string;
        last_login: string;
        remote_addr: string;
        user_agent: string;
        data: null;
        session_uuid: string;
      }>;
      location: null;
      client: string;
    };
    user_agent: string;
    remote_addr: string;
    client: string;
    email_address: string;
    facebook: string;
    created_on: string;
    premium: boolean;
    userid: string;
    verified: string;
    id: string;
    username: string | null;
    verified_on: string;
    preferences: {
      bitratepref: number;
      combine_sets: string;
    };
    tester: boolean;
  };
  settings: {
    fast_polling: number;
    artwork_server: string;
    librarybytespersong: number;
    streaming_server: string;
    slow_polling: number;
    librarysongspersecond: number;
    achievements: Array<{
      id: string;
      disabled: string;
      name: string;
      description: string;
    }>;
  };
  messages: [];
  lastfm:
    | {
        linked: false;
      }
    | {
        linked: true;
        user?: string;
        sessionkey: string;
        message: string;
      };
};
