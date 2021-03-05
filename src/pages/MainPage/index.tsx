import * as React from 'react';

import { Text, Box, Flex } from '@chakra-ui/react';
import { useAtomValue } from 'jotai/utils';

import { authStateAtom } from '../../stores/app';
import { libraryStateAtom } from '../../stores/library';
import WebSocketProvider from './WebSocketProvider';
import Header from './components/Header';
import Main from './components/Main';
import { useUpdateLibrary } from './library';

const MainPage = () => {
  const authData = useAtomValue(authStateAtom);
  const libraryData = useAtomValue(libraryStateAtom);
  const updateLibrary = useUpdateLibrary();

  React.useEffect(() => {
    const f = async () => {
      if (authData) {
        await updateLibrary(authData.user.token, authData.user.userid);
      }
    };
    f();
  }, []);
  return !libraryData ? (
    <Text>Loading</Text>
  ) : (
    <Flex w="100%" direction="column">
      <WebSocketProvider />
      <Box>
        <Header />
      </Box>
      <Box flex="1">
        <Main />
      </Box>
    </Flex>
  );
};

export default MainPage;
