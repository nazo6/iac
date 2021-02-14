import * as React from 'react';

import { Box } from '@chakra-ui/react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import Explorer from './Explorer';
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
        data={[
          {
            type: 'folder',
            title: 'Artists',
          },
          {
            type: 'folder',
            title: 'Tracks',
          },
          {
            type: 'folder',
            title: 'Albums',
          },
          {
            type: 'folder',
            title: 'Genre',
          },
          {
            type: 'folder',
            title: 'Custom Folders',
          },
        ]}
        onFolderSelect={(folderName) => {
          switch (folderName) {
            case 'Artists':
              history.push(`${path}/artists`);
              break;
            case 'Tracks':
              history.push(`${path}/tracks`);
              break;
            case 'Albums':
              history.push(`${path}/albums`);
              break;
            case 'Genre':
              history.push(`${path}/genre`);
              break;
            case 'Custom Folders':
              history.push(`${path}/artists`);
              break;
            default:
              break;
          }
        }}
      />
    );
  };

  return (
    <Box h="100%">
      <Switch>
        <Route path={`${path}/artists`}>
          <Artists />
        </Route>
        <Route path={`${path}/albums`}>
          <Albums />
        </Route>
        <Route path={`${path}/genre`}>
          <Genre />
        </Route>
        <Route path={`${path}/tracks`}>
          <Tracks />
        </Route>
        <Route path={`${path}/`}>
          <Top />
        </Route>
      </Switch>
    </Box>
  );
};

export default Main;
