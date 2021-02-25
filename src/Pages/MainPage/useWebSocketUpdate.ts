import { useAtomValue } from 'jotai/utils';
import useWebSocket from 'react-use-websocket';
import { authStateAtom } from '~/stores/app';

const useWebSocketUpdate = () => {
  const socketUrl = 'wss://queue.ibroadcast.com/ws';
  const authState = useAtomValue(authStateAtom);

  const { sendMessage } = useWebSocket(socketUrl, {
    onOpen: () => {
      sendMessage(
        JSON.stringify({
          user_id: '2213580',
          token: authState!.user.token,
          client: 'ianothercast',
          version: '0.1',
          device_name: 'Website (Chrome, Win32)',
          session_uuid: authState?.user.session.session_uuid,
          local_addr: 'undetermined',
          command: 'get_state',
        }),
      );
    },
    shouldReconnect: () => true,
  });
};

export default useWebSocketUpdate;
