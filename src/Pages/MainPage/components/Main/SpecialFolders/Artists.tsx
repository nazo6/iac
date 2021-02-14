import { Box } from '@chakra-ui/react';
import * as React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { libraryState } from '~/stores/app';
import Explorer from '../Explorer';
import AlbumViewer from '../GroupViews/AlbumViewer';

const Artists = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const library = useRecoilValue(libraryState);
  const sortAlbumsData = (sortType: 'name', sortDirection: 'ascend' | 'descend') => {
    return library!.library.artists.slice().sort((a, b) => {
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
            id={`artists`}
            data={sortAlbumsData('name', 'ascend').map((value) => {
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
          <AlbumViewer />
        </Route>
      </Switch>
    </Box>
  );
};
export default Artists;
