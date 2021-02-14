import { Box } from '@chakra-ui/react';
import * as React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { albumsState } from '~/stores/library';
import Explorer from '../Explorer';
import Album from '../GroupViews/Album';

const Albums = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const albumsData = useRecoilValue(albumsState);
  const sortData = (sortType: 'name', sortDirection: 'ascend' | 'descend') => {
    return albumsData.slice().sort((a, b) => {
      let sortPair = ['', ''];
      switch (sortType) {
        case 'name':
          sortPair = [a.name, b.name];
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
      <Switch>
        <Route exact path={`${path}`}>
          <Explorer
            id={`albums`}
            data={sortData('name', 'ascend').map((value) => {
              return {
                type: 'folder',
                name: value.id,
                displayName: value.name,
              };
            })}
            onFolderSelect={(folderName) => {
              history.push(`${path}/${folderName}`);
            }}
          />
        </Route>
        <Route path={`${path}/:albumId`}>
          <Album />
        </Route>
      </Switch>
    </Box>
  );
};
export default Albums;
