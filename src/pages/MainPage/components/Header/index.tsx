import * as React from 'react';

import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  Hidden,
  InputBase,
} from '@material-ui/core';
import {
  ArrowBack,
  ArrowForward,
  Close,
  Home,
  Pause,
  PlayArrow,
  Search,
} from '@material-ui/icons';
import { useAtom } from 'jotai';
import { withImmer } from 'jotai/immer';
import { useHistory } from 'react-router-dom';

import { playerStateAtom } from '~/stores/player';

import { secondsToHms } from '../../utils/convertTime';
import Queue from './Queue';
import ProgressSlider from './Slider';
import { useAudio } from './useAudio';

const playerStateAtomWithImmer = withImmer(playerStateAtom);

const Player = () => {
  const audio = useAudio();
  const history = useHistory();
  const [playerState, setPlayerState] = useAtom(playerStateAtomWithImmer);
  const [showSearchBarState, setShowSearchbarState] = React.useState(false);
  const toggleSearchBarState = () =>
    showSearchBarState ? setShowSearchbarState(false) : setShowSearchbarState(true);
  const currentSongData = playerState?.queue[playerState?.playIndex];
  React.useEffect(() => {
    if (playerState) {
      if (currentSongData) {
        audio.setSrc(currentSongData.file, currentSongData.title);
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
    <Box position="relative">
      <Box className="w-full px-2 flex items-center">
        <IconButton
          aria-label="Home"
          onClick={() => {
            history.push('/app');
            setShowSearchbarState(false);
          }}>
          <Home />
        </IconButton>
        <IconButton aria-label="Search" onClick={toggleSearchBarState} color="inherit">
          {showSearchBarState ? <Close /> : <Search />}
        </IconButton>
        {showSearchBarState ? (
          <InputBase
            autoFocus
            classes={{ root: 'w-full', input: 'p-1 w-full' }}
            placeholder="Search..."
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const searchText = (e.target as any).value as string;
                history.push('/app/search/' + searchText);
              }
            }}
          />
        ) : (
          <>
            <IconButton aria-label="Back" disabled={!audio.enabled} color="inherit">
              <ArrowBack />
            </IconButton>
            <Box className="w-48px h-48px flex justify-center items-center">
              {audio.loading ? (
                <CircularProgress size={35} />
              ) : (
                <IconButton
                  aria-label="Play/Pause"
                  disabled={!audio.enabled}
                  color="inherit"
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
                  }}>
                  {audio.playing ? <Pause /> : <PlayArrow />}
                </IconButton>
              )}
            </Box>
            <IconButton aria-label="Forward" disabled={!audio.enabled} color="inherit">
              <ArrowForward />
            </IconButton>
            <Hidden only="xs">
              <Queue />
            </Hidden>
            <Hidden only="xs">
              <Typography>
                {audio.currentTime && audio.duration
                  ? secondsToHms(audio.currentTime) + '/' + secondsToHms(audio.duration)
                  : '--:--/--:--'}
              </Typography>
            </Hidden>
            <div className="flex-grow"></div>
            <div className="text-center">
              <Typography className="text-left inline-block">
                {currentSongData ? currentSongData.title : 'Not playing'}
              </Typography>
            </div>
          </>
        )}
      </Box>

      <ProgressSlider
        loading={audio.loading}
        enabled={audio.enabled}
        currentTime={audio.currentTime}
        duration={audio.duration}
        changePosition={(sec) => audio.jump(sec)}
      />
    </Box>
  );
};

export default Player;
