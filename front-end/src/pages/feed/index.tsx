import React from 'react';
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'

const Feed = () => { 
  const authCookie = Cookies.get('userLoggedIn');

  console.log('authCookie :>> ', authCookie);

  return (
    !authCookie ? 
    <Redirect to="/login" /> :
    <div>
      Feed
    </div>
  )
}

export default Feed;
