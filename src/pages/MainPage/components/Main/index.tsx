import * as React from 'react';

import { Box } from '@material-ui/core';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Explorer from './Explorer';
import Folder from './Folder';
import Albums from './SpecialFolders/Albums';
import Artists from './SpecialFolders/Artists';
import Genre from './SpecialFolders/Genre';
import Tracks from './SpecialFolders/Tracks';

const Main = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const Top = () => {
    return (
      <Explorer
        id="top"
        data={[
          {
            type: 'folder',
            name: 'Artists',
          },
          {
            type: 'folder',
            name: 'Tracks',
          },
          {
            type: 'folder',
            name: 'Albums',
          },
          {
            type: 'folder',
            name: 'Genre',
          },
          {
            type: 'folder',
            name: 'Custom Folders',
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
              history.push(`${path}/folder`);
              break;
            default:
              break;
          }
        }}
      />
    );
  };

  return (
    <Box height="100%">
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
        <Route path={`${path}/folder`}>
          <Folder />
        </Route>
        <Route path={`${path}/`}>
          <Top />
        </Route>
      </Switch>
    </Box>
  );
};

export default Main;
