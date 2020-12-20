import React, { useEffect, FunctionComponent } from 'react';
import { gql, useMutation } from '@apollo/client';

import * as Styled from './styles';
import { useAuth } from '../../contexts/auth';
import { useHistory } from 'react-router-dom';

import { ReactComponent as Logout} from '../../icons/logout.svg'

const Header: FunctionComponent = () => {
  const { user, setUser } = useAuth();
  const { signed, username } = user;
  const history = useHistory();

  console.log('history :>> ', user);
  

  const LOGOUT = gql`
    mutation logoutUser{
      logout
    }
  `

  const [logout] = useMutation(LOGOUT);


  useEffect(() => {
    const userData = localStorage.getItem('userData');

    if(userData){
      if(!user?.signed){
        setUser(JSON.parse(userData))
      }
    }
  });

  const handleLogout = async () => {
    try {
      await logout();

      setUser({
        signed: false
      })

      localStorage.removeItem('userData');

      history.push('/login');

    }
    catch(err){
      throw new Error(err);
    }
  }

  return (
    <Styled.Header>
        {
          signed ? 
          <Styled.Container>
              <span>Olá {username}</span>
              <Styled.Logout  >
                <Logout  onClick={handleLogout} />
              </Styled.Logout>
            </Styled.Container> :
            <Styled.Container>
              Faça login
            </Styled.Container>
        }
      
    </Styled.Header>
  );
}

export default Header;
