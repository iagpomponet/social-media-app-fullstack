import { createGlobalStyle } from 'styled-components'


const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700;900&display=swap');

  * {
    margin:0;
    padding: 0;
    outline: 0;
    box-shadow: 0;
    border: 0;
  }

  body {
    padding: 0;
    margin: 0;
    height: 100%;
    font-family: Roboto, sans-serif;
  }
`



export default GlobalStyle;