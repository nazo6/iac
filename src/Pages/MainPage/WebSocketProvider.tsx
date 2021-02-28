import * as React from 'react';
import { useAtom } from 'jotai';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { authStateAtom } from '~/stores/app';
import { playerStateAtom } from '~/stores/player';
import { useFindTrackDataById } from './utils/useFindData';

import { appInfo } from '~/appInfo';

type SongId = number;

type WsResponseType =
  | {
      command: 'set_state';
      message: 'ok';
      result: boolean;
      role: 'player';
      timestamp: number;
    }
  | {
      command: 'set_state';
      current_song: SongId; //song id
      data: { play_from: 'tracks'; play_index: number };
      message: 'ok';
      name: string;
      pause: boolean;
      play_next: SongId[];
      result: true;
      role: 'player';
      shuffle: false;
      start_position: number; //113.390654
      start_time: number; //1614259032.324
      timestamp: number; //1614469929.74567
      tracks: SongId[];
      volume: number;
    }
  | {
      command: 'update_library';
      lastmodified: 'string'; //'2021-02-14 04:52:30'
      message: 'ok';
      result: boolean;
    }
  | { command: 'end_session' }
  | { command: 'message'; value: any }
  | { command: 'sessions'; value: any }
  | { command: 'none' };

const WebSocketProvider = () => {
  const socketUrl = 'wss://queue.ibroadcast.com/ws';
  const authState = useAtomValue(authStateAtom);
  const [playerState, setPlayerState] = useAtom(playerStateAtom);
  const findTrackData = useFindTrackDataById();

  const { sendMessage, lastJsonMessage } = useWebSocket(socketUrl, {
    onOpen: () => {
      sendMessage(
        JSON.stringify({
          user_id: authState!.user.id,
          token: authState!.user.token,
          client: appInfo.client,
          version: appInfo.version,
          device_name: appInfo.deviceName,
          session_uuid: authState!.user.session.session_uuid,
          local_addr: 'undetermined',
          command: 'get_state',
        }),
      );
    },
    shouldReconnect: () => true,
  });
  useEffect(() => {
    if (lastJsonMessage) {
      const message = lastJsonMessage as WsResponseType;
      if (message.command === 'set_state' && 'data' in message) {
        setPlayerState({
          playIndex: message.data.play_index,
          queue: message.tracks.map((trackId) => findTrackData(trackId.toString())),
          play: !message.pause,
        });
      }
    }
  }, [lastJsonMessage]);
  useEffect(() => {
    if (playerState) {
      console.log(playerState);
      const current_song = playerState.queue[playerState.playIndex];
      sendMessage(
        JSON.stringify({
          user_id: authState!.user.id,
          token: authState!.user.token,
          client: appInfo.client,
          version: '0.1',
          device_name: appInfo.deviceName,
          session_uuid: authState!.user.session.session_uuid,
          local_addr: 'undetermined',
          command: 'set_state',
          value: {
            command: 'set_state',
            current_song: current_song.title,
            data: { play_from: 'tracks', play_index: playerState.playIndex },
            message: 'ok',
            name: current_song.title,
            pause: !playerState.play,
            play_next: [],
            result: true,
            role: 'player',
            shuffle: false,
            start_position: 0,
            start_time: 0,
            timestamp: 0,
            tracks: playerState.queue.map((trackData) => Number(trackData.id)),
            volume: 0,
          },
        }),
      );
    }
  }, [playerState]);
  return <></>;
};

export default WebSocketProvider;
