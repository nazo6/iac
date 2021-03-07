import * as React from 'react';

const audio = new Audio();

export const useAudio = () => {
  const [playerEnabled, setPlayerEnabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const setLoadingFalse = () => setLoading(false);
  const setLoadingTrue = () => setLoading(true);
  const [, _forceUpdate] = React.useState(false);
  const forceUpdate = () => _forceUpdate((prevState) => !prevState);

  React.useEffect(() => {
    audio.addEventListener('play', forceUpdate);
    audio.addEventListener('pause', forceUpdate);
    audio.addEventListener('ended', forceUpdate);
    audio.addEventListener('timeupdate', forceUpdate);
    audio.addEventListener('loadstart', setLoadingTrue);
    audio.addEventListener('loadeddata', setLoadingFalse);
    audio.addEventListener('seeking', setLoadingTrue);
    audio.addEventListener('seeked', setLoadingFalse);

    return () => {
      audio.removeEventListener('play', forceUpdate);
      audio.removeEventListener('pause', forceUpdate);
      audio.removeEventListener('ended', forceUpdate);
      audio.removeEventListener('timeupdate', forceUpdate);
      audio.removeEventListener('loadstart', setLoadingTrue);
      audio.removeEventListener('loadeddata', setLoadingFalse);
      audio.removeEventListener('seeking', setLoadingTrue);
      audio.removeEventListener('seeked', setLoadingFalse);
    };
  }, []);

  const play = () => audio.play();
  const pause = () => audio.pause();
  const jump = (value: number) => (audio.currentTime = value);
  const setSrc = (
    filePath: string,
    title?: string,
    artist?: string,
    album?: string,
    artworkPath?: string,
  ) => {
    setPlayerEnabled(true);
    audio.src = 'https://streaming.ibroadcast.com' + filePath;
    if (navigator.mediaSession) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title,
        artist,
        album,
        artwork: artworkPath ? [{ src: artworkPath }] : undefined,
      });
    }
  };

  return {
    loading,
    enabled: playerEnabled,
    playing: !audio.paused,
    src: audio.src,
    currentTime: isNaN(audio.currentTime) ? null : audio.currentTime,
    duration: isNaN(audio.duration) ? null : audio.duration,
    play,
    pause,
    jump,
    setSrc,
    setPlayerEnabled,
  };
};
