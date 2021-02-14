import { Box } from '@chakra-ui/react';
import * as React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { libraryState } from '~/stores/app';
import Explorer from '../Explorer';
import AlbumViewer from '../GroupViews/AlbumViewer';

const Tracks = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const library = useRecoilValue(libraryState);
  const sortAlbumsData = (sortType: 'title' | 'uploaded_time', sortDirection: 'ascend' | 'descend') => {
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
      <Switch>
        <Route exact path={`${path}`}>
          <Explorer
            id={`traks`}
            data={sortAlbumsData('title', 'ascend').map((value) => {
              return {
                type: 'folder',
                name: value.id,
                displayName: value.title,
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
export default Tracks;
