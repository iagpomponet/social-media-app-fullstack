import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { getUsers } from './service/UserService';
import client from './service/client';
import LoginPage from './pages/login/index';
import GlobalStyle from './globalStyles'
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './theme';

function App() {
  const [theme, setTheme] = useState(defaultTheme);

  getUsers();

  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <ThemeProvider theme={theme} >
        <LoginPage />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
