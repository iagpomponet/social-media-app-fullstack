import React, { useContext } from 'react';
import Cookies from 'js-cookie'
import { useAuth } from '../../contexts/auth';
import { Redirect } from 'react-router-dom'

const Feed = () => { 
  const authCookie = Cookies.get('userLoggedIn');

  return (
    !authCookie || authCookie == 'false' ? 
    <Redirect to="/login" /> :
    <div>
      Feed
    </div>
  )
}

export default Feed;
