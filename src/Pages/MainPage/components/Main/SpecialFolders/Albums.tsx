import { Box } from '@chakra-ui/react';
import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { libraryState } from '~/stores/app';
import Explorer from '../Explorer';

const Albums = () => {
  const library = useRecoilValue(libraryState);
  const sortAlbumsData = (sortType: 'name', sortDirection: 'descend' | 'ascend') => {
    return library?.library.albums.slice().sort((a, b) => {
      let sortPair = ['', ''];
      switch (sortType) {
        case 'name':
          sortPair = [a.name, b.name];
          break;
      }
      switch (sortDirection) {
        case 'descend':
          if (sortPair[0] > sortPair[1]) {
            return 1;
          } else {
            return -1;
          }
        case 'ascend':
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
        data={sortAlbumsData('name', 'descend')!.map((value) => {
          return {
            type: 'folder',
            title: value.name,
          };
        })}
      />
    </Box>
  );
};
export default Albums;
