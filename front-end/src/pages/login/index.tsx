import React, { FunctionComponent } from 'react';
import LoginForm from '../../components/login-form/index';
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import * as Styled from './styles'

const LoginPage: FunctionComponent = () => {
   const authCookie = Cookies.get('userLoggedIn');


   return (
      authCookie && authCookie != 'false' ?
      <Redirect path="/" /> : 
      <Styled.Container>
         <Styled.Login>
         <LoginForm />
         </Styled.Login>
      </Styled.Container>
   )
}

export default LoginPage;