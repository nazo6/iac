import produce from 'immer';
import { useUpdateAtom } from 'jotai/utils';

import { libraryApi } from '~/apis/api';
import { appInfo } from '~/appInfo';
import { folderStatetAtom, libraryStateAtom } from '~/stores/library';
import { FolderType, TagType } from '~/types/DataTypes';
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
      result.push(itemObject);
    });
    return result;
  };

  data['library']['tracks'] = convert(data['library']['tracks']);
  data['library']['artists'] = convert(data['library']['artists']);
  data['library']['albums'] = convert(data['library']['albums']);
  data['library']['trash'] = convert(data['library']['trash']);
  data['library']['playlists'] = convert(data['library']['playlists']);
  data['library']['tags'] = Object.keys(data['library']['tags']).map((value) => {
    return { ...data['library']['tags'][value], id: value };
  });
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

const tagToFolder = (tagData: TagType[]) => {
  const pathsData = tagData
    .filter((tag) => tag.name.startsWith('_f/') && !tag.archived)
    .map((tag) => {
      return {
        id: tag.id,
        path: tag.name === '_f/' ? [] : tag.name.substr(3).split('/'),
        tracks: tag.tracks,
      };
    });
  const folderData: FolderType = [
    {
      name: 'root',
    },
  ];
  pathsData.forEach((value) => {
    if (value.path.length === 0) {
      folderData[0].files = value.tracks;
      return;
    }
    value.path.reduce((previous, crr, index) => {
      if (!previous.folders) {
        previous.folders = [];
      }
      const newIndex =
        previous.folders.findIndex((v) => v.name === crr) >= 0
          ? previous.folders.findIndex((v) => v.name === crr)
          : previous.folders.push({
              name: crr,
              files: index === value.path.length - 1 ? value.tracks : undefined,
            }) - 1;
      return previous.folders[newIndex];
    }, folderData[0]);
  });
  return folderData;
};

export const useUpdateLibrary = () => {
  const setLibraryData = useUpdateAtom(libraryStateAtom);
  const setFolderData = useUpdateAtom(folderStatetAtom);
  return async (token: string, userId: string) => {
    const data = await getLibraryData(token, userId);
    if (data) {
      setLibraryData(data);
      setFolderData(tagToFolder(data.library.tags));
    } else {
      throw Error('Error occured when fetching library.');
    }
  };
};
