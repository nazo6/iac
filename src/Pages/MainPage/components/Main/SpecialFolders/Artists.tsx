import { Box } from '@chakra-ui/react';
import { useAtomValue } from 'jotai/utils';
import * as React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { artistsStateAtom } from '~/stores/library';
import Explorer from '../Explorer';
import Artist from '../GroupViews/Artist';

const Artists = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const artistsData = useAtomValue(artistsStateAtom);
  const sortData = (sortType: 'name', sortDirection: 'ascend' | 'descend') => {
    return artistsData.slice().sort((a, b) => {
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
        <Route path={`${path}/:artistId`}>
          <Artist />
        </Route>
      </Switch>
    </Box>
  );
};
export default Artists;
