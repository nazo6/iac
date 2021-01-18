import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';

import { ChakraProvider } from '@chakra-ui/react';

const root = document.getElementById('root');
ReactDOM.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  root,
);
