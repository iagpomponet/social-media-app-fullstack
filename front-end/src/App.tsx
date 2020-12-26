import React, { useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';

import Feed from '../src/pages/feed/index';
import client from './service/client';
import LoginPage from './pages/login/index';
import GlobalStyle from './globalStyles'
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './theme';
import AuthProvider, { useAuth } from "./contexts/auth";
import Header from './components/header/index';
import RegisterPage from '../src/pages/register/index';


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
            <Header />
            <Route exact path="/">
              <Feed />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
