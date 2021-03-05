import * as React from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';
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
    <Flex h="100%" direction="column">
      <Box h="4rem">
        <Text fontSize="4xl">{albumData.name}</Text>
      </Box>
      <Box flex="1" minH={0}>
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
    </Flex>
  );
};
export default Album;
