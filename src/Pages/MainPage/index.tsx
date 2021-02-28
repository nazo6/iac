import { Box, Flex, Text } from '@chakra-ui/react';
import * as React from 'react';
import { getLibraryData } from './library';
import Header from './components/Header';
import Main from './components/Main';
import { authStateAtom } from '../../stores/app';
import { libraryState } from '../../stores/library';
import { useAtomValue } from 'jotai/utils';
import { useAtom } from 'jotai';
import WebSocketProvider from './WebSocketProvider';

const MainPage = () => {
  const authData = useAtomValue(authStateAtom);
  const [libraryData, setLibraryData] = useAtom(libraryState);

  const getLibrary = async (token: string, userId: string) => {
    const data = await getLibraryData(token, userId);
    if (data) {
      setLibraryData(data);
    }
  };
  React.useEffect(() => {
    if (authData) {
      getLibrary(authData.user.token, authData.user.userid);
    }
  }, []);
  return !libraryData ? (
    <Text>Loading</Text>
  ) : (
    <Flex w="100%" direction="column">
      <WebSocketProvider />
      <Box h="3rem">
        <Header />
      </Box>
      <Box flex="1">
        <Main />
      </Box>
    </Flex>
  );
};

export default MainPage;
