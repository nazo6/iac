import axios from 'axios';
import { appInfo } from '~/appInfo';
import type { LibraryRequestType } from './types/LibraryRequestType';
import type { LibraryResponseType } from './types/LibraryResponseType';

const API_STATUS_ENDPOINT = 'https://library.ibroadcast.com/';

const client = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
});

export const getLibraryData = async (token: string, userId: string) => {
  const requestBody: LibraryRequestType = {
    _token: token,
    _userid: userId,
    mode: 'library',
    client: appInfo.client,
    device_name: appInfo.deviceName,
    version: '3.1',
    supported_types: false,
    url: '//library.ibroadcast.com',
  };
  const response = await client.post(API_STATUS_ENDPOINT, requestBody);
  const status = response.data;

  if (!status['result']) {
    return null;
  }

  status['library']['tracks'] = convert(status['library']['tracks']);
  status['library']['artists'] = convert(status['library']['artists']);
  status['library']['albums'] = convert(status['library']['albums']);
  status['library']['trash'] = convert(status['library']['trash']);
  status['library']['playlists'] = convert(status['library']['playlists']);
  return status as LibraryResponseType;
};

type LibraryObjectType = {
  [key: string]: Array<string | number>;
} & {
  map?: {
    [key: string]: number;
  };
};
const convert = (libraryObject: LibraryObjectType) => {
  const map = Object.entries(libraryObject.map!)
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => {
      return a.value - b.value;
    })
    .map((value) => {
      return value.key;
    });
  delete libraryObject.map;
  const result: Array<{ [prop: string]: number | string }> = [];
  Object.keys(libraryObject).forEach((key) => {
    const itemObject: { [prop: string]: number | string } = {};
    libraryObject[key].forEach((value, index) => {
      itemObject[map[index]] = value;
    });
    itemObject['id'] = key;
    result.push(itemObject);
  });
  return result;
};
