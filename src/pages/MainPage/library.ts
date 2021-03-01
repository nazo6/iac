import { appInfo } from '~/appInfo';
import type { LibraryResponseType } from '~/types/LibraryResponseType';
import { libraryApi } from '~/apis/api';
import { useUpdateAtom } from 'jotai/utils';
import { libraryStateAtom } from '~/stores/library';

export const getLibraryData = async (token: string, userId: string) => {
  const status = await libraryApi.$post({
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    body: {
      _token: token,
      _userid: userId,
      mode: 'library',
      client: appInfo.client,
      device_name: appInfo.deviceName,
      version: '3.1',
      supported_types: false,
      url: '//library.ibroadcast.com',
    },
  });

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
  const result: Array<{ [prop: string]: number | string | number[] | string[] }> = [];
  Object.keys(libraryObject).forEach((key) => {
    const itemObject: { [prop: string]: number | string | number[] | string[] } = {};
    libraryObject[key].forEach((value, index) => {
      itemObject[map[index]] = value;
    });
    itemObject['id'] = key;
    if ('tracks' in itemObject) {
      itemObject['tracks'] = (itemObject['tracks'] as any).map((e: any) => {
        return e.toString();
      });
    }
    result.push(itemObject);
  });
  return result;
};

export const useUpdateLibrary = () => {
  const setLibraryData = useUpdateAtom(libraryStateAtom);
  return async (token: string, userId: string) => {
    const data = await getLibraryData(token, userId);
    if (data) {
      setLibraryData(data);
    } else {
      throw Error('Error occured when fetching library.');
    }
  };
};
