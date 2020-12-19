import React, { useContext } from 'react';
import Cookies from 'js-cookie'
import { useAuth } from '../../contexts/auth';
import { Redirect } from 'react-router-dom'

const Feed = () => { 
  const authCookie = Cookies.get('userLoggedIn');

  console.log('authCookie :>> ', useAuth());

  return (
    !authCookie ? 
    <Redirect to="/login" /> :
    <div>
      Feed
    </div>
  )
}

export default Feed;
