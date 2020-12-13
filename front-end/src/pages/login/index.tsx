import React, { FunctionComponent } from 'react';
import LoginForm from '../../components/login-form/index';
import * as Styled from './styles'

const LoginPage: FunctionComponent = () => <Styled.Container>
                  '                          <Styled.Login>
                                             <LoginForm />
                                             </Styled.Login>
                                          </Styled.Container>

export default LoginPage;