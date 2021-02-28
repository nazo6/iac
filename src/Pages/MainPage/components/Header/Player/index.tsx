import * as React from 'react';

import { Box, Center, Flex, IconButton, Spacer, Spinner, Text } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useAudio } from './useAudio';
import Icon from '@mdi/react';
import { mdiPause, mdiPlay } from '@mdi/js';
import { withImmer } from 'jotai/immer';
import { playerStateAtom } from '~/stores/player';
import { useAtom } from 'jotai';
import Queue from '../Queue';

const playerStateAtomWithImmer = withImmer(playerStateAtom);

const Player = () => {
  const audio = useAudio();
  const [playerState, setPlayerState] = useAtom(playerStateAtomWithImmer);
  const currentSongData = playerState?.queue[playerState?.playIndex];
  React.useEffect(() => {
    if (playerState) {
      if (currentSongData) {
        audio.setSrc(currentSongData.file);
        if (playerState.play) {
          audio.play();
        } else {
          audio.pause();
        }
      }
    }
  }, [playerState?.playIndex, playerState?.queue]);

  React.useEffect(() => {
    if (playerState && playerState.play) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [playerState?.play]);

  return (
    <>
      <Box w="100%">
        <Flex>
          <Box>
            <IconButton
              aria-label="Back"
              icon={<ArrowBackIcon />}
              disabled={!audio.enabled}
            />
          </Box>
          <Box>
            <IconButton
              aria-label="Back"
              icon={
                audio.loading ? (
                  <Spinner />
                ) : (
                  <Icon path={audio.playing ? mdiPause : mdiPlay} />
                )
              }
              disabled={!audio.enabled}
              onClick={() => {
                if (audio.playing) {
                  audio.pause();
                  setPlayerState((c) => {
                    c!.play = false;
                  });
                } else {
                  audio.play();
                  setPlayerState((c) => {
                    c!.play = true;
                  });
                }
              }}
            />
          </Box>
          <Box>
            <IconButton
              aria-label="Back"
              icon={<ArrowForwardIcon />}
              disabled={!audio.enabled}
            />
          </Box>
          <Queue />
          <Spacer />
          <Center>
            <Flex>
              <Text>{currentSongData?.title ?? 'Not playing'}</Text>
            </Flex>
          </Center>
        </Flex>
      </Box>
    </>
  );
};

export default Player;
