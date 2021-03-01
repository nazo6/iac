import { Box, Flex, Text } from '@chakra-ui/react';
import * as React from 'react';
import { getLibraryData, useUpdateLibrary } from './library';
import Header from './components/Header';
import Main from './components/Main';
import { authStateAtom } from '../../stores/app';
import { libraryStateAtom } from '../../stores/library';
import { useAtomValue } from 'jotai/utils';
import WebSocketProvider from './WebSocketProvider';

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
