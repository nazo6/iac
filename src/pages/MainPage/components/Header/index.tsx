import * as React from 'react';

import {
  Box,
  Center,
  Flex,
  IconButton,
  Spacer,
  Spinner,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useAudio } from './useAudio';
import Icon from '@mdi/react';
import { mdiPause, mdiPlay } from '@mdi/js';
import { withImmer } from 'jotai/immer';
import { playerStateAtom } from '~/stores/player';
import { useAtom } from 'jotai';
import Queue from './Queue';
import { secondsToHms } from '../../utils/convertTime';

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
      <Box w="100%" boxShadow="md">
        <Flex flexDirection="column" pos="relative" p="5px">
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
            <Center>
              <Text>
                {audio.enabled && !audio.loading
                  ? secondsToHms(audio.currentTime) + '/' + secondsToHms(audio.duration)
                  : '--/--'}
              </Text>
            </Center>
            <Spacer />
            <Center>
              <Flex>
                <Text>{currentSongData ? currentSongData.title : 'Not playing'}</Text>
              </Flex>
            </Center>
          </Flex>
          <Box
            margin={0}
            pos="absolute"
            bottom="0"
            w="100vw"
            left="0"
            transform="translate(0, 50%)">
            <Slider
              margin={0}
              aria-label="Progress slider"
              colorScheme="pink"
              defaultValue={0}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Player;