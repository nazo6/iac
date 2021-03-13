import * as React from 'react';

class AudioData {
  static audio = new Audio()
}

export const useAudio = () => {
  const [playerEnabled, setPlayerEnabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const setLoadingFalse = () => setLoading(false);
  const setLoadingTrue = () => setLoading(true);
  const [, _forceUpdate] = React.useState(false);
  const forceUpdate = () => _forceUpdate((prevState) => !prevState);


  React.useEffect(() => {
    AudioData.audio.addEventListener('play', forceUpdate);
    AudioData.audio.addEventListener('pause', forceUpdate);
    AudioData.audio.addEventListener('ended', forceUpdate);
    AudioData.audio.addEventListener('timeupdate', forceUpdate);
    AudioData.audio.addEventListener('loadstart', setLoadingTrue);
    AudioData.audio.addEventListener('loadeddata', setLoadingFalse);
    AudioData.audio.addEventListener('seeking', setLoadingTrue);
    AudioData.audio.addEventListener('seeked', setLoadingFalse);

    return () => {
      AudioData.audio.removeEventListener('play', forceUpdate);
      AudioData.audio.removeEventListener('pause', forceUpdate);
      AudioData.audio.removeEventListener('ended', forceUpdate);
      AudioData.audio.removeEventListener('timeupdate', forceUpdate);
      AudioData.audio.removeEventListener('loadstart', setLoadingTrue);
      AudioData.audio.removeEventListener('loadeddata', setLoadingFalse);
      AudioData.audio.removeEventListener('seeking', setLoadingTrue);
      AudioData.audio.removeEventListener('seeked', setLoadingFalse);
    };
  }, []);

  const play = () => AudioData.audio.play();
  const pause = () => AudioData.audio.pause();
  const jump = (value: number) => {AudioData.audio.currentTime = value};
  const setSrc = (
    filePath: string,
    title?: string,
    artist?: string,
    album?: string,
    artworkPath?: string,
  ) => {
    setPlayerEnabled(true);
    if(AudioData.audio.src !== 'https://streaming.ibroadcast.com' + filePath) {
      AudioData.audio.src = 'https://streaming.ibroadcast.com' + filePath;
      if (navigator.mediaSession) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title,
          artist,
          album,
          artwork: artworkPath ? [{ src: artworkPath }] : undefined,
        });
      }
    }
  };

  return {
    loading,
    enabled: playerEnabled,
    playing: !AudioData.audio.paused,
    src: AudioData.audio.src,
    currentTime: isNaN(AudioData.audio.currentTime) ? null : AudioData.audio.currentTime,
    duration: isNaN(AudioData.audio.duration) ? null : AudioData.audio.duration,
    play,
    pause,
    jump,
    setSrc,
    setPlayerEnabled,
  };
};
