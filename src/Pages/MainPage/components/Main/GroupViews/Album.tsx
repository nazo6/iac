import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Text } from '@chakra-ui/react';
import { tracksStateSelector } from '~/stores/library';
import Explorer from '../Explorer';
import { TrackType } from '~/api/types/LibraryResponseType';
import { useAtomValue } from 'jotai/utils';
import { useAtom } from 'jotai';
import { playerStateAtom } from '~/stores/queue';
import {
  useFindAlbumDataById,
  useFindTrackDataById,
} from '~/Pages/MainPage/utils/usefindData';

const Album = () => {
  const [, setPlayerState] = useAtom(playerStateAtom);

  const tracksData = useAtomValue(tracksStateSelector);
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
              queue: tracksData,
              playIndex: tracksData.map((data) => data.id).indexOf(trackData.id),
              play: true,
            });
          }}
        />
      </Box>
    </Flex>
  );
};
export default Album;
