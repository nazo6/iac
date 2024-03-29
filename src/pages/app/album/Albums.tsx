import * as React from 'react';

import { Box } from '@material-ui/core';
import { useAtomValue } from 'jotai/utils';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Explorer from '~/components/Explorer';
import { albumsStateSelector } from '~/stores/library';

import Album from './Album';

const Albums = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const albumsData = useAtomValue(albumsStateSelector);
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
    <Box className="w-full">
      <Switch>
        <Route exact path={`${path}`}>
          <Explorer
            id={`albums`}
            data={sortData('name', 'ascend').map((value) => {
              return {
                type: 'folder',
                id: value.id,
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
