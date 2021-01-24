import { Flex, Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import * as React from 'react';
import Rocon from 'rocon/react';

const mainAppRoutes = Rocon.Path()
  .exact({
    action: () => <p>This is foo</p>,
  })
  .route('cat', (route) => route.action(() => <p>I love cats</p>))
  .route('dog', (route) => route.action(() => <p>I love dogs</p>));

const Main = () => {
  return (
    <Flex direction="column" h="100%">
      <Box flex="1">
        <Tabs variant="enclosed" h="100%">
          <TabList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
          </TabList>
          <TabPanels>
            <TabPanel h="100%">
              <p>one!</p>
            </TabPanel>
            <TabPanel h="100%">
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Box h="2rem" bg="">
        Player
      </Box>
    </Flex>
  );
};

export default Main;
