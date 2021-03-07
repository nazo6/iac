import produce from 'immer';
import { useUpdateAtom } from 'jotai/utils';

import { libraryApi } from '~/apis/api';
import { appInfo } from '~/appInfo';
import { libraryStateAtom } from '~/stores/library';
import type { LibraryResponseType } from '~/types/LibraryResponseType';

const formatData = (data: any) => {
  const convert = (
    libraryObject: {
      [key: string]: Array<string | number>;
    } & {
      map?: {
        [key: string]: number;
      };
    },
  ) => {
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

  data['library']['tracks'] = convert(data['library']['tracks']);
  data['library']['artists'] = convert(data['library']['artists']);
  data['library']['albums'] = convert(data['library']['albums']);
  data['library']['trash'] = convert(data['library']['trash']);
  data['library']['playlists'] = convert(data['library']['playlists']);
  return data as LibraryResponseType;
};

const getLibraryData = async (token: string, userId: string) => {
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
  const data = formatData(status);
  const data1 = produce(data, (draft) => {
    draft.library.albums = draft.library.albums.map((e) => {
      console.log();
      return produce(e, (draft2) => {
        draft2.artist = data.library.artists.find(
          (value) => value.id === draft2.artist_id.toString(),
        )?.name;
      });
    });
  });
  return produce(data1, (draft) => {
    draft.library.tracks = draft.library.tracks.map((e) => {
      return produce(e, (draft2) => {
        const album = data1.library.albums.find(
          (value) => value.id === draft2.album_id.toString(),
        );
        draft2.album = album?.name;
        draft2.artist = album?.artist;
      });
    });
  });
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
