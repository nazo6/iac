import { Flex, Box, Spacer, Input, Switch, useColorMode } from '@chakra-ui/react';
import * as React from 'react';
import Player from './Player';

const Header = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const changeColorMode = () => {
    if (colorMode === 'light') {
      localStorage.setItem('app-colorMode', 'dark');
    } else {
      localStorage.setItem('app-colorMode', 'white');
    }
    toggleColorMode();
  };
  return (
    <Flex h="100%" alignItems="center" boxShadow="md" paddingX="1rem">
      {/*<Box>
        <Input placeholder="Search" />
      </Box>
      <Spacer />*/}
      <Box>
        <Flex direction="row">
          <Player />
        </Flex>
      </Box>
      <Spacer />
      <Box>
        <Switch
          onChange={() => {
            changeColorMode();
          }}
          defaultChecked={colorMode === 'dark'}
        />
      </Box>
    </Flex>
  );
};

export default Header;
