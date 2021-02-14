import { Box } from '@chakra-ui/react';
import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { libraryState } from '~/stores/app';
import Explorer from '../Explorer';

const Tracks = () => {
  const library = useRecoilValue(libraryState);
  const sortData = (sortType: 'title' | 'uploaded_time', sortDirection: 'ascend' | 'descend') => {
    return library!.library.tracks.slice().sort((a, b) => {
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
    <Box h="100%">
      <Explorer
        id={`traks`}
        data={sortData('title', 'ascend').map((value) => {
          return {
            type: 'track',
            fileData: value,
          };
        })}
        onFolderSelect={(folderName) => {
          //history.push(`${path}/${folderName}`);
        }}
      />
    </Box>
  );
};
export default Tracks;
