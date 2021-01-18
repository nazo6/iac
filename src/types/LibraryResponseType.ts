export type LibraryResponseType = {
  settings: {
    artwork_server: string; //"https://artwork.ibroadcast.com",
    fast_polling: number; //30,
    librarybytespersong: number; //150,
    streaming_server: string; //"https://streaming.ibroadcast.com",
    slow_polling: number; //300,
    librarysongspersecond: number; //4000
  };
  status: {
    lastmodified: string; //"2021-01-15 17:14:27",
    app_available: boolean; //false,
    expires: string; //"2021-01-29 17:14:05.000000",
    timestamp: string; //"2021-01-15 17:14:05",
    app_version: string; //"6.5"
  };
  library: {
    tags: {};
    tracks: {
      '201535254': [
        1,
        2007,
        'Beach Bum',
        'Rock',
        53,
        72778779,
        123143,
        21644341,
        0,
        '2021-01-15',
        true,
        885785,
        '',
        '',
        0,
        0,
        '/128/93c/f41/10350915',
        'audio/mpeg3',
        '4.7',
        '17:13:59',
      ];
      '201535252': [
        1,
        2013,
        'Pop Up',
        'Pop',
        105,
        72778777,
        160155,
        21644339,
        0,
        '2021-01-15',
        false,
        2573544,
        '',
        '',
        0,
        0,
        '/128/74c/fdd/10026629',
        'audio/mpeg3',
        '-7.9',
        '17:13:59',
      ];
      map: {
        replay_gain: 18;
        length: 4;
        enid: 8;
        year: 1;
        plays: 15;
        artwork_id: 6;
        rating: 14;
        uploaded_on: 9;
        uid: 13;
        path: 12;
        artist_id: 7;
        file: 16;
        track: 0;
        type: 17;
        genre: 3;
        trashed: 10;
        album_id: 5;
        size: 11;
        title: 2;
        uploaded_time: 19;
      };
      '201535253': [
        7,
        2013,
        'American Dream',
        'Country',
        240,
        72778778,
        148445,
        21644340,
        0,
        '2021-01-15',
        true,
        5717605,
        '',
        '',
        0,
        0,
        '/128/951/58f/10026631',
        'audio/mpeg3',
        '-4.7',
        '17:13:59',
      ];
      '201535255': [
        1,
        0,
        'Niles Blues',
        'Blues',
        154,
        72778780,
        2325883,
        21644341,
        0,
        '2021-01-15',
        true,
        2734681,
        '',
        '',
        0,
        0,
        '/128/057/397/28917137',
        'audio/mpeg3',
        '-6',
        '17:13:59',
      ];
    };
    expires: 1642266846;
    artists: {
      '21644341': ['Kevin MacLeod', [201535254, 201535255], false, 0];
      '21644340': ['Joe Farren', [201535253], false, 0];
      '21644339': ['Zoe.LeelA', [201535252], false, 0];
      map: {
        trashed: 2;
        tracks: 1;
        rating: 3;
        name: 0;
      };
    };
    albums: {
      map: {
        rating: 4;
        tracks: 1;
        artist_id: 2;
        name: 0;
        year: 6;
        trashed: 3;
        disc: 5;
      };
      '72778780': ['Funk & Blues', [201535255], 21644341, false, 0, 0, 0];
      '72778778': ['Open Skies', [201535253], 21644340, false, 0, 0, 2013];
      '72778779': ['Rock Classic', [201535254], 21644341, false, 0, 0, 2007];
      '72778777': ['Digital Guilt', [201535252], 21644339, false, 0, 0, 2013];
    };
    playlists: {
      '318131': ['Starter Songs', [201535254, 201535252, 201535255, 201535253], 1234, false, null, null, null, null, 0];
      map: {
        tracks: 1;
        sort: 8;
        type: 5;
        name: 0;
        system_created: 3;
        artwork_id: 7;
        description: 6;
        uid: 2;
        public_id: 4;
      };
    };
    trash: {
      '0': ['Trash', [201535254, 201535255, 201535253]];
      map: {
        name: 0;
        tracks: 1;
      };
    };
  };
  lastfm: {
    sessionkey: '';
    user: '';
    linked: false;
    message: 'Not connected';
  };
  result: true;
};
