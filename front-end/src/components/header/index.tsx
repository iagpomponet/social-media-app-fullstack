import React, { useEffect, FunctionComponent } from 'react';
import { gql, useMutation } from '@apollo/client';

import * as Styled from './styles';
import { useAuth } from '../../contexts/auth';
import { useHistory } from 'react-router-dom';

import { ReactComponent as Logout} from '../../icons/logout.svg'

const Header = () => {
  const userData = useAuth();
  const history = useHistory();
  const LOGOUT = gql`
    mutation logoutUser{
      logout
    }
  `

  const [logout] = useMutation(LOGOUT);

  const { user, setUser } = userData;
  const { signed, username, profilePic } = user;









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
    signed ?
    <Styled.Header>
        {
          signed ?
          <Styled.Container>
              <Styled.ProfileArea>
                {
                  profilePic ?
                  <img width="30px" height="30px" src={profilePic}></img> :
                  ''
                }
                <span>Olá {username}</span>
              </Styled.ProfileArea>
              <Styled.Logout>
                <Logout  onClick={handleLogout} />
              </Styled.Logout>
            </Styled.Container> :
            <Styled.Container>
            </Styled.Container>
        }

    </Styled.Header> :
    <div></div>
  );
}

export default Header;
