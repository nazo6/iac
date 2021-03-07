import * as React from 'react';

import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import path from 'path-browserify';
import { useHistory, useParams } from 'react-router-dom';

import { useFindTrackDataById } from '~/pages/MainPage/utils/useFindData';
import { folderStatetAtom } from '~/stores/library';
import { playerStateAtom } from '~/stores/player';

import Explorer, { ExplorerDataType } from '../Explorer';

const Folder = () => {
  const history = useHistory();
  const setPlayerState = useUpdateAtom(playerStateAtom);
  const findTrackData = useFindTrackDataById();
  const folderState = useAtomValue(folderStatetAtom);
  const folderPathStr = useParams<{ 0: string }>()['0'];
  const folderPath = folderPathStr.split('/');
  const currentData =
    folderPath[0] === ''
      ? folderState[0]
      : folderPath.reduce((pre, crr) => {
          return pre.folders![pre.folders!.findIndex((value) => value.name === crr)];
        }, folderState[0]);
  const currentFoldersData: ExplorerDataType = currentData.folders
    ? currentData.folders.map((value) => {
        return {
          type: 'folder',
          name: value.name,
        };
      })
    : [];
  const fileData = currentData.files
    ? currentData.files.map((value) => {
        return findTrackData(value);
      })
    : [];
  const currentFilesData: ExplorerDataType = currentData.files
    ? fileData.map((value) => {
        return {
          type: 'track',
          fileData: value,
        };
      })
    : [];
  return (
    <Explorer
      id={`path-${folderPathStr}`}
      data={currentFoldersData.concat(currentFilesData)}
      onFolderSelect={(folderName) => {
        history.push(path.join(folderPathStr, folderName));
      }}
      onTrackSelect={(trackData) => {
        setPlayerState({
          queue: fileData,
          playIndex: fileData.map((data) => data.id).indexOf(trackData.id),
          play: true,
        });
      }}
    />
  );
};
export default Folder;
