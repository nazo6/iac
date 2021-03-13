import * as React from 'react';

import { Box, Typography } from '@material-ui/core';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { useHistory, useParams } from 'react-router-dom';

import Explorer, { ExplorerDataType } from '~/components/Explorer';
import { albumsStateSelector } from '~/stores/library';
import { playerStateAtom } from '~/stores/player';
import { TrackType } from '~/types/DataTypes';
import { useFindArtistDataById, useFindTrackDataById } from '~/utils/hooks/useFindData';

const Artist = () => {
  const setPlayerState = useUpdateAtom(playerStateAtom);
  const history = useHistory();

  const { artistId } = useParams<{ artistId: string }>();
  const artistData = useFindArtistDataById()(artistId);
  const findTrackData = useFindTrackDataById();
  const albumsState = useAtomValue(albumsStateSelector);
  const artistTracksData = artistData.tracks.map((trackId) =>
    findTrackData(trackId.toString()),
  );
  const artistAlbumData: ExplorerDataType = albumsState
    .filter((value) => value.artist_id.toString() === artistId)
    .map((value) => {
      return {
        type: 'folder',
        id: value.id,
        displayName: value.name,
      };
    });
  return (
    <Box className="h-full flex flex-col">
      <Box height="4rem">
        <Typography fontSize="4xl">{artistData.name}</Typography>
      </Box>
      <Box flex="1" minHeight="0">
        <Explorer
          id={`artist-${artistId}`}
          data={artistAlbumData.concat(
            artistTracksData.map((value) => {
              return {
                type: 'track',
                fileData: value as TrackType,
              };
            }),
          )}
          onFolderSelect={(folderId) => {
            history.push(`/app/album/${folderId}`);
          }}
          onTrackSelect={(trackData) => {
            setPlayerState({
              queue: artistTracksData,
              playIndex: artistTracksData.map((data) => data.id).indexOf(trackData.id),
              play: true,
            });
          }}
        />
      </Box>
    </Box>
  );
};
export default Artist;
