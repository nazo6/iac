import { Flex, Box } from '@chakra-ui/react';
import * as React from 'react';

const Main = () => {
  return (
    <Flex direction="column" h="100%">
      <Box h="2rem">1</Box>
      <Box flex="1">2</Box>
    </Flex>
  );
};

export default Main;
