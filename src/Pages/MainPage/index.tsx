import { Box, Flex } from '@chakra-ui/react';
import * as React from 'react';
import { getLibraryData } from '../../api/library';
import Header from './components/Header';
import Main from './components/Main';
import { authStateAtom } from '../../stores/app';
import { libraryState } from '../../stores/library';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import useWebSocketUpdate from './useWebSocketUpdate';

const MainPage = () => {
  const authData = useAtomValue(authStateAtom);
  const setLibraryData = useUpdateAtom(libraryState);

  useWebSocketUpdate();

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
  return (
    <Flex w="100%" direction="column">
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
