import * as React from 'react';
import { useEffect } from 'react';

import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import useWebSocket from 'react-use-websocket';

import { appInfo } from '~/appInfo';
import { authStateAtom } from '~/stores/app';
import { libraryStateAtom } from '~/stores/library';
import { playerStateAtom } from '~/stores/player';

import { useUpdateLibrary } from './library';
import { useFindTrackDataById } from './utils/useFindData';

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
      current_song: number; //song id
      data: { play_from: 'tracks'; play_index: number };
      message: 'ok';
      name: string;
      pause: boolean;
      play_next: number[];
      result: true;
      role: 'player';
      shuffle: false;
      start_position: number; //113.390654
      start_time: number; //1614259032.324
      timestamp: number; //1614469929.74567
      tracks: number[];
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
  const libraryState = useAtomValue(libraryStateAtom);
  const authData = useAtomValue(authStateAtom);
  const updateLibrary = useUpdateLibrary();

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
        const queue: any[] = [];
        let isError = false;
        message.tracks.forEach((trackId) => {
          try {
            queue.push(findTrackData(trackId.toString()));
          } catch {
            isError = true;
          }
        });
        if (isError) {
          console.log('[WebSocketProvider] Trackid from ws not found.');
          setPlayerState(null);
        } else {
          setPlayerState({
            playIndex: message.data.play_index,
            queue,
            play: !message.pause,
          });
        }
      } else if (message.command === 'update_library') {
        const lastUpdatedDate = dayjs(libraryState!.status.lastmodified);
        const requiredDate = dayjs(message.lastmodified);
        if (requiredDate.diff(lastUpdatedDate) > 0) {
          const f = async () => {
            if (authData) {
              await updateLibrary(authData.user.token, authData.user.userid);
            }
          };
          f();
        }
      }
    }
  }, [lastJsonMessage]);
  useEffect(() => {
    if (playerState) {
      const current_song = playerState.queue[playerState.playIndex];
      sendMessage(
        JSON.stringify({
          user_id: authState!.user.id,
          token: authState!.user.token,
          client: appInfo.client,
          version: appInfo.version,
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
