import { addDecorator, addParameters, configure } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from 'themes';
import GlobalStyle from '../src/GlobalStyle';

const req = require.context('../src/components', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const withThemeProvider = (storyFn) => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <GlobalStyle />
      {storyFn()}
    </React.Fragment>
  </ThemeProvider>
);

addDecorator(withThemeProvider);

addParameters({
  backgrounds: [
    { name: 'Dark', value: '#333', default: true },
    { name: 'Light', value: '#ccc', default: true },
  ],
});

configure(loadStories, module);
