import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import { getUsers } from '../../service/UserService';
import { Redirect, Link } from 'react-router-dom'

const Feed = () => {
  const authCookie = Cookies.get('userLoggedIn');
  const [users, setUsers] = useState({
    users: []
  });

  const handleFeed = async () => {
    const users = await getUsers();
    const { data } = users;

    setUsers(data);
  }

  useEffect(() => {
    handleFeed();
  }, []);

  console.log('users :>> ', users);

  return (
    !authCookie || authCookie == 'false' ?
    <Redirect to="/login" /> :
    <div>
      {users?.users && users.users.map(user => {
        return <article>
          <Link to={`/users/${user?._id}`}>
            <div>{user?.username}</div>
          </Link>

        </article>
      })}
    </div>
  )
}

export default Feed;
