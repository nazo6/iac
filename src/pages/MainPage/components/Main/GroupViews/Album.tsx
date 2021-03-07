import * as React from 'react';

import { Box, Typography } from '@material-ui/core';
import { useUpdateAtom } from 'jotai/utils';
import { useParams } from 'react-router-dom';

import {
  useFindAlbumDataById,
  useFindTrackDataById,
} from '~/pages/MainPage/utils/useFindData';
import { playerStateAtom } from '~/stores/player';
import type { TrackType } from '~/types/DataTypes';

import Explorer from '../Explorer';

const Album = () => {
  const setPlayerState = useUpdateAtom(playerStateAtom);

  const { albumId } = useParams<{ albumId: string }>();
  const albumData = useFindAlbumDataById()(albumId);
  const findTrackData = useFindTrackDataById();
  const albumTracksData = albumData.tracks.map((trackId) =>
    findTrackData(trackId.toString()),
  );
  return (
    <Box display="flex" height="100%" flexDirection="column">
      <Box height="4rem">
        <Typography fontSize="4xl">{albumData.name}</Typography>
      </Box>
      <Box flex="1" minHeight="0">
        <Explorer
          id={`album-${albumId}`}
          data={albumTracksData.map((value) => {
            return {
              type: 'track',
              fileData: value as TrackType,
            };
          })}
          onTrackSelect={(trackData) => {
            setPlayerState({
              queue: albumTracksData,
              playIndex: albumTracksData.map((data) => data.id).indexOf(trackData.id),
              play: true,
            });
          }}
        />
      </Box>
    </Box>
  );
};
export default Album;
