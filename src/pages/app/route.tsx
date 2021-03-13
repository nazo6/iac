import * as React from 'react';

import { Box } from '@material-ui/core';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Explorer from '~/components/Explorer';

import Albums from './album/Albums';
import Artists from './artist/Artists';
import Folder from './folder';
import Genre from './genre/Genre';
import Search from './search';
import Tracks from './track/Tracks';

const MainRoute = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const Top = () => {
    return (
      <Explorer
        id="top"
        data={[
          {
            type: 'folder',
            id: 'Artists',
          },
          {
            type: 'folder',
            id: 'Tracks',
          },
          {
            type: 'folder',
            id: 'Albums',
          },
          {
            type: 'folder',
            id: 'Genre',
          },
          {
            type: 'folder',
            id: 'Custom Folders',
          },
        ]}
        onFolderSelect={(folderName) => {
          switch (folderName) {
            case 'Artists':
              history.push(`${path}/artist`);
              break;
            case 'Tracks':
              history.push(`${path}/track`);
              break;
            case 'Albums':
              history.push(`${path}/album`);
              break;
            case 'Genre':
              history.push(`${path}/genre`);
              break;
            case 'Custom Folders':
              history.push(`${path}/folder/`);
              break;
            default:
              break;
          }
        }}
      />
    );
  };

  return (
    <Box className="flex-1 flex">
      <Switch>
        <Route path={`${path}/artist`}>
          <Artists />
        </Route>
        <Route path={`${path}/album`}>
          <Albums />
        </Route>
        <Route path={`${path}/genre`}>
          <Genre />
        </Route>
        <Route path={`${path}/track`}>
          <Tracks />
        </Route>
        <Route path={`${path}/folder/*`}>
          <Folder />
        </Route>
        <Route path={`${path}/search/:keyword`}>
          <Search />
        </Route>
        <Route path={`${path}/`}>
          <Top />
        </Route>
      </Switch>
    </Box>
  );
};

export default MainRoute;
