import React , { FunctionComponent } from 'react';
import * as Styled from './styles';
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'

import RegisterForm from '../../components/register-form/index';


const RegisterPage: FunctionComponent = () => {
  const authCookie = Cookies.get('userLoggedIn');

  return (
    authCookie && authCookie != 'false' ?
    <Redirect path="/" /> : 
    <Styled.RegisterPage>
      <Styled.Container>
        <RegisterForm width="600px" />
      </Styled.Container>
    </Styled.RegisterPage>
  )
} 

export default RegisterPage;