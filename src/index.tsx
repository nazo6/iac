import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import { Provider } from 'jotai';

import { BrowserRouter as Router } from 'react-router-dom';

import 'focus-visible/dist/focus-visible';
import { Global, css } from '@emotion/react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
const GlobalStyles = css`
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;
const root = document.getElementById('root');
const colorMode = localStorage.getItem('app-colorMode') as null | undefined | 'light' | 'dark';

ReactDOM.render(
  <Provider>
    <ChakraProvider>
      <Router>
        <ColorModeScript initialColorMode={colorMode != null ? colorMode : 'light'} />
        <Global styles={GlobalStyles} />
        <App />
      </Router>
    </ChakraProvider>
  </Provider>,
  root,
);
