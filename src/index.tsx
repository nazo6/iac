import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';

import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';

const root = document.getElementById('root');
ReactDOM.render(
  <RecoilRoot>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </RecoilRoot>,
  root,
);
