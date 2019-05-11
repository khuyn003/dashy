import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }

  body {
    font: 400 16px/1.5 ${props => props.theme.fonts.primary};
    color: #fff;
  }

  #root {
    height: 100%;
  }
`

export default GlobalStyle;
