import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';

import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';

import 'focus-visible/dist/focus-visible';
import { Global, css } from '@emotion/react';
const GlobalStyles = css`
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;
const root = document.getElementById('root');
ReactDOM.render(
  <RecoilRoot>
    <ChakraProvider>
      <Global styles={GlobalStyles} />
      <App />
    </ChakraProvider>
  </RecoilRoot>,
  root,
);
