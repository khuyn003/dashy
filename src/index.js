import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import Router from 'Router';
import theme from 'themes';
import GlobalStyle from 'GlobalStyle';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <GlobalStyle />
      <Router />
    </React.Fragment>
  </ThemeProvider>,
  document.getElementById('root')
);
