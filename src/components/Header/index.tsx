import { Flex, Box, Spacer, Input, Switch, Text, useColorMode } from '@chakra-ui/react';
import * as React from 'react';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex h="100%" alignItems="center" boxShadow="md" paddingX="1rem">
      <Box>
        <Input placeholder="Search" />
      </Box>
      <Spacer />
      <Text>Dark mode</Text>
      <Box>
        <Switch
          id="email-alerts"
          onChange={() => {
            toggleColorMode();
          }}
        />
      </Box>
    </Flex>
  );
};

export default Header;
