import * as React from 'react';

import { Box, Tabs, Tab } from '@material-ui/core';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { useHistory, useParams } from 'react-router-dom';

import { useQuery } from '~/pages/MainPage/utils/useQuery';
import {
  albumsStateSelector,
  artistsStateSelector,
  tracksStateSelector,
} from '~/stores/library';
import { playerStateAtom } from '~/stores/player';

import Explorer, { ExplorerDataType } from '../Explorer';

const Search = () => {
  const { keyword } = useParams<{ keyword: string }>();
  const history = useHistory();
  const query = useQuery();

  const setPlayerState = useUpdateAtom(playerStateAtom);

  const typeMap = ['track', 'album', 'artist'];
  const initialSearchType = query.get('type');
  const initialTabState = initialSearchType
    ? typeMap.findIndex((v) => v === initialSearchType) ?? 0
    : 0;
  const [tabState, setTabState] = React.useState(initialTabState);

  const tracksState = useAtomValue(tracksStateSelector).filter((trackData) =>
    trackData.title.toLowerCase().includes(keyword.toLowerCase()),
  );
  const albumsState = useAtomValue(albumsStateSelector).filter((albumData) =>
    albumData.name.toLowerCase().includes(keyword.toLowerCase()),
  );
  const artistsState = useAtomValue(artistsStateSelector).filter((artistData) =>
    artistData.name.toLowerCase().includes(keyword.toLowerCase()),
  );

  const searchedAlbumsData: ExplorerDataType = React.useMemo(
    () =>
      albumsState.map((value) => {
        return {
          type: 'folder',
          id: value.id,
          displayName: value.name,
        };
      }),
    [albumsState, keyword],
  );
  const searchedArtistsData: ExplorerDataType = React.useMemo(
    () =>
      artistsState.map((value) => {
        return {
          type: 'folder',
          id: value.id,
          displayName: value.name,
        };
      }),
    [artistsState, keyword],
  );
  const searchedTracksData: ExplorerDataType = React.useMemo(
    () =>
      tracksState.map((value) => {
        return {
          type: 'track',
          fileData: value,
        };
      }),
    [tracksState, keyword],
  );

  return (
    <Box className="flex flex-col h-full">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabState}
          onChange={(_, value) => {
            history.push(`/app/search/${keyword}?type=${typeMap[value]}`);
            setTabState(value);
          }}
          aria-label="Search type">
          <Tab label="Track" />
          <Tab label="Album" />
          <Tab label="Artist" />
        </Tabs>
      </Box>
      <Box className="h-full flex-1">
        <Explorer
          id={`search-${tabState}-${keyword}`}
          onFolderSelect={(id) => {
            history.push(`/app/${typeMap[tabState]}/${id}`);
          }}
          onTrackSelect={(trackData) => {
            setPlayerState({
              queue: tracksState,
              playIndex: tracksState.map((data) => data.id).indexOf(trackData.id),
              play: true,
            });
          }}
          data={
            tabState === 0
              ? searchedTracksData
              : tabState === 1
              ? searchedAlbumsData
              : tabState === 2
              ? searchedArtistsData
              : searchedTracksData
          }
        />
      </Box>
    </Box>
  );
};

export default Search;
