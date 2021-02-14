import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { albumsState, tracksState } from '~/stores/library';
import Explorer from '../Explorer';
import { TrackType } from '~/api/types/LibraryResponseType';

const Album = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const albumData = useRecoilValue(albumsState).find((value) => value.id === albumId);
  const tracksData = useRecoilValue(tracksState);
  if (!albumData) {
    return <Text>Error!</Text>;
  }
  let isError = false;
  const albumTracksData = albumData.tracks.map((trackId) => {
    const trackData = tracksData.find((v) => v.id === trackId.toString());
    if (!trackData) {
      isError = true;
    }
    return trackData;
  });
  if (isError) {
    return <Text>Error! 2</Text>;
  }
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
        />
      </Box>
    </Flex>
  );
};
export default Album;
