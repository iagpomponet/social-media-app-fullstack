import React from 'react';
import {
  Route
} from "react-router-dom";

import Feed from '../pages/feed/index';
import RegisterPage from '../pages/register/index';
import LoginPage from '../pages/login/index';
import ProfilePage from '../pages/profile/index';


const Routes: React.FC = () => {
  return <>
          <Route exact path="/">
            <Feed />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/user/:id">
            <ProfilePage/>
          </Route>
        </>;
}

export default Routes;
