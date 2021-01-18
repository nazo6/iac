import { Flex, Box, Text } from '@chakra-ui/react';
import * as React from 'react';

import Header from './components/Header';
import Main from './components/Main';

const App = () => {
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

export default App;
