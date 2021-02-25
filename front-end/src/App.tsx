import React, { useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';

import client from './service/client';

import GlobalStyle from './globalStyles'
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './theme';
import AuthProvider, { useAuth } from "./contexts/auth";
import Header from './components/header/index';

import Routes from './routes/index';


import {
  BrowserRouter as Router,
  Route
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
            <Routes />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
