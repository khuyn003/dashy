import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import * as serviceWorker from 'serviceWorker';

import Page from 'pages';
import theme from 'themes';
import GlobalStyle from 'GlobalStyle';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <GlobalStyle />
      <Page />
    </React.Fragment>
  </ThemeProvider>,
  document.getElementById('root')
);

serviceWorker.register();
