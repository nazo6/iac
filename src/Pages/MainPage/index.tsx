import { Box, Flex } from '@chakra-ui/react';
import * as React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getLibraryData } from '../../api/library';
import Header from '../../components/Header';
import Main from '../../components/Main';
import { authState, libraryState } from '../../stores/app';

const MainPage = () => {
  const authData = useRecoilValue(authState);
  const setLibraryData = useSetRecoilState(libraryState);

  const getLibrary = async (token: string, userId: string) => {
    const data = await getLibraryData(token, userId);
    if (data) {
      setLibraryData(data);
    }
  };
  React.useEffect(() => {
    if (authData) {
      getLibrary(authData.token, authData.userId);
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
