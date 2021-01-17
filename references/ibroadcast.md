# ibroadcast の api とか

## 認証

POST https://api.ibroadcast.com/s/JSON/status

### ↑Request

#### Header

| パラメータ   | 説明                                             |
| ------------ | ------------------------------------------------ |
| Content-Type | application/x-www-form-urlencoded; charset=UTF-8 |

#### Body

```json
{
  "email_address": "メールアドレス",
  "password": "生pass",
  "mode": "status",
  "client": "website",
  "device_name": "Website (Chrome, Win32)",
  "version": "3.1",
  "supported_types": false,
  "url": "//api.ibroadcast.com/s/JSON/status"
}
```

### ↓Response

#### 成功時

実際のデータは`auth_response.json`に記載

```json
{
  "lastfm": {
    //lastfmに接続時
    "sessionkey": "lastfmのセッションキー",
    "user": "lastfmのユーザー名",
    "linked": true,
    "message": "Linked to nazo_x_ on Last.fm"
  },
  "settings": {
    "librarybytespersong": 150,
    "streaming_server": "https://streaming.ibroadcast.com",
    "fast_polling": 30,
    "artwork_server": "https://artwork.ibroadcast.com",
    "achievements": [
      //何の機能を使ったか。省略。
    ],
    "slow_polling": 300,
    "librarysongspersecond": 4000
  },
  "messages": [],
  "dropbox": { "linked": false }, //今のところこの機能はない
  "googledrive": { "linked": false }, //上に同じ
  "user": {
    "preferences": { "bitratepref": 128 },
    "tester": false,
    "premium": false,
    "id": "2213580",
    "userid": "2213580",
    "verified": true,
    "username": null,
    "verified_on": "2021-01-15 13:31:37",
    "created_on": "2021-01-15 15:52:45",
    "facebook": false,
    "client": "website",
    "email_address": "nazorgt@gmail.com",
    "user_id": "2213580",
    "device_name": "Website (Chrome, Win32)",
    "password_change": false,
    "token": "b5827e6e-5749-11eb-b68c-1418774e50a6",
    "session": {
      "client": "website",
      "location": null,
      "sessions": [
        //ほかのログインしているアプリが列挙される
        {
          "joinable": true, //boolean 何かよくわからない
          "user_id": "2213580", //その名の通り
          "device_name": "Editor (Chrome, Win32)",
          "remote_addr": "",
          "last_login": "2021-01-15 16:10:36",
          "user_agent": "", //UAがない場合IPになる?
          "data": null, //わからん
          "session_uuid": "", //tokenと同じ
          "client": "website | editor | MediaSync",
          "location": "Asahikawa, Hokkaido"
        }
      ],
      //現在のセッション情報?
      "session_uuid": "", //tokenと同じ？
      "data": null,
      "user_agent": "",
      "last_login": "2021-01-15 16:37:10",
      "remote_addr": "",
      "device_name": "Website (Chrome, Win32)",
      "user_id": ""
    },
    "remote_addr": "",
    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.85 Safari/537.36"
  },
  "message": "ok",
  "status": {
    "expires": "2021-01-29 16:36:16.000000",
    "app_available": false,
    "timestamp": "2021-01-15 16:36:16",
    "plays": 5,
    "available": 658,
    "app_version": "6.5",
    "lastmodified": "2021-01-15 16:36:16",
    "achievement_status": {
      //省略
    }
  },
  "result": true,
  "authenticated": true
}
```

#### 失敗時

```json
{
  "authenticated": false,
  "result": false,
  "message": "Bad email address and password combination"
}
```

## ライブラリ取得

POST https://library.ibroadcast.com/

### ↑Request

#### Header

| パラメータ   | 説明                                             |
| ------------ | ------------------------------------------------ |
| Content-Type | application/x-www-form-urlencoded; charset=UTF-8 |

#### Body

```json
{
  "_userid":"", //ユーザーID
  "_token":"", //認証で取得したトークン
  "mode":"library", //わからん
  "client":"website",
  "device_name":"Website (Chrome, Win32)",
  "version":"3.1",
  "supported_types":false, //わからん
  "url":"//library.ibroadcast.com"
}:
```

### ↓Response

ライブラリのデータが全部入っている

```json
{
  "lastfm": {
    //上に同じ
  },
  "settings": {
    "artwork_server": "アートワークがあるサーバー",
    "streaming_server": "https://streaming.ibroadcast.com"
  },
  "result": true,
  "status": {
    //省略
  },
  "library": {
    /*それぞれ最後のmapと項目が対応している
    それぞれの項目は実際はオブジェクトではなく配列となっている
    "artists": {
      "ID": [
        ...
      ],
      "map": {
        "map": {
        "trashed": 2,
        "tracks": 1,
        "rating": 3,
        "name": 0
      }
      }
    }
    */
    "artists": {
      "アーティストID": {
        "name": "アーティスト名",
        "tracks": [
          201529759 //そのアーティストのトラックのIDの配列
        ],
        "trashed": false,
        "rating": 0
      }
    },
    "playlists": {
      "プレイリストID": {
        "name": "Recently Played",
        "tracks": [201496453, 201506970, 201506601],
        "uid": 1234,
        "system_created": false,
        "public_id": null,
        "type:": "recently-played",
        "description": null,
        "artwork_id": null,
        "sort": 0
      },
      "map": {
        "artwork_id": 7,
        "system_created": 3,
        "type": 5,
        "sort": 8,
        "uid": 2,
        "description": 6,
        "name": 0,
        "tracks": 1,
        "public_id": 4
      }
    },
    "tracks": {
      "トラックID": {
        "track": 1,
        "year": 2013,
        "title": "Pop Up",
        "genre": "Pop",
        "length": 105,
        "album_id": 72778777,
        "artwork_id": 160155,
        "artist_id": 21644339,
        "enid": 0,
        "uploaded_on": "2021-01-15",
        "trashed": false,
        "size": 2573544,
        "path": "",
        "uid": "",
        "rating": 0,
        "plays": 0,
        "file": "/128/74c/fdd/10026629",
        "type": "audio/mpeg3",
        "replay_gain": "-7.9",
        "uploaded_time": "17:13:59"
      }
    },
    "tags": {
      "449977": {
        "tracks": [],
        "archived": false,
        "name": "anime"
      }
    },
    "trash": {
      "map": {
        "name": 0,
        "tracks": 1
      },
      "0": ["Trash"]
    },
    "albums": {
      "72778780": {
        "name":"Funk & Blues",
        "tracks":[
          201535255
        ],
        "artist_id": 21644341,
        "trashed": false,
        "rating": 0,
        "disc": 0,
        "year": 0
      },
    }
    "expires": 1642266035
  }
}
```
