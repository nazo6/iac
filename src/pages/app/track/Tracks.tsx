import * as React from 'react';

import { Box } from '@material-ui/core';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';

import Explorer from '~/components/Explorer';
import { tracksStateSelector } from '~/stores/library';
import { playerStateAtom } from '~/stores/player';

const Tracks = () => {
  const tracksData = useAtomValue(tracksStateSelector);
  const setPlayerState = useUpdateAtom(playerStateAtom);
  const sortData = (
    sortType: 'title' | 'uploaded_time',
    sortDirection: 'ascend' | 'descend',
  ) => {
    return tracksData.slice().sort((a, b) => {
      let sortPair = ['', ''];
      switch (sortType) {
        case 'title':
          sortPair = [a.title, b.title];
          break;
        case 'uploaded_time':
          sortPair = [a.uploaded_time, b.uploaded_time];
          break;
      }
      switch (sortDirection) {
        case 'ascend':
          if (sortPair[0] > sortPair[1]) {
            return 1;
          } else {
            return -1;
          }
        case 'descend':
          if (sortPair[0] < sortPair[1]) {
            return 1;
          } else {
            return -1;
          }
      }
    });
  };
  return (
    <Box className="h-full">
      <Explorer
        id={`traks`}
        data={sortData('title', 'ascend').map((value) => {
          return {
            type: 'track',
            fileData: value,
          };
        })}
        onTrackSelect={(trackData) => {
          setPlayerState({
            play: true,
            playIndex: 0,
            queue: [trackData],
          });
        }}
      />
    </Box>
  );
};
export default Tracks;
