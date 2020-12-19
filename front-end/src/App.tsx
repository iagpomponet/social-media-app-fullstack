import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { getUsers } from './service/UserService';
import Feed from '../src/pages/feed/index';
import client from './service/client';
import LoginPage from './pages/login/index';
import GlobalStyle from './globalStyles'
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './theme';
import AuthProvider from "./contexts/auth";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [theme] = useState(defaultTheme);

  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <ThemeProvider theme={theme} >
        <AuthProvider>
          <Router>
            <Route path="/">
              <Feed />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
