import * as React from 'react';

import { Box, Flex, IconButton } from '@chakra-ui/react';
import { createRef } from 'react';
import { ArrowBackIcon, ArrowForwardIcon, CloseIcon } from '@chakra-ui/icons';
import { playerState } from '~/stores/player';
import { useAtom } from 'jotai';

const Player = () => {
  const ref = createRef<HTMLAudioElement>();
  const [playerData, setPlayerData] = useAtom(playerState);

  React.useEffect(() => {
    if (playerData.enabled) {
      if (ref.current) {
        ref.current.src = playerData.src;
        if (playerData.playing) {
          ref.current.play();
        } else {
          ref.current.pause();
        }
      }
    }
  }, [playerData]);

  return (
    <>
      <Box w="100%">
        <Flex>
          <Box>
            <IconButton aria-label="Back" icon={<ArrowBackIcon />} disabled={!playerData.enabled} />
          </Box>
          <Box>
            <IconButton aria-label="Back" icon={<CloseIcon />} disabled={!playerData.enabled} />
          </Box>
          <Box>
            <IconButton aria-label="Back" icon={<ArrowForwardIcon />} disabled={!playerData.enabled} />
          </Box>
        </Flex>
      </Box>
      <audio ref={ref} hidden />
    </>
  );
};

export default Player;
