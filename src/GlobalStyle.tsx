import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;  
  }

  html, body {
  height: 100%;
  }

  p {
    margin: 0;
    padding: 0;  
  }

  body {
    line-height: 1.5;
  }
`

export default GlobalStyle
