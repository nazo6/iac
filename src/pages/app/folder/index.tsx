import * as React from 'react';

import { MenuItem } from '@material-ui/core';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import path from 'path-browserify';
import { useHistory, useParams } from 'react-router-dom';

import Explorer, { ExplorerDataType } from '~/components/Explorer';
import { folderStatetAtom } from '~/stores/library';
import { playerStateAtom } from '~/stores/player';
import { useFindTrackDataById } from '~/utils/hooks/useFindData';

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
          id: value.name,
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
      fileContextMenu={[<MenuItem>Copy</MenuItem>]}
    />
  );
};
export default Folder;
