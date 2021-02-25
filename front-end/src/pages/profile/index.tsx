import React, { useState ,useEffect } from 'react';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom'

import { getUser } from '../../service/UserService';

import {
  useParams
} from "react-router-dom";

interface Iparams {
  id: string
}

interface userDataI {
  user: {
    username: string
  }
}

const ProfilePage: React.FC = () => {
  const authCookie = Cookies.get('userLoggedIn');
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<userDataI>();
  const { id } = useParams<Iparams>();

  const getUserOnRender = async () => {
    const { data, loading } = await getUser(id);

    setUserData(data);
    setLoading(loading);
  }

  useEffect(() => {
    getUserOnRender();
  });

  const user = userData?.user;



  console.log('id :>> ', id);
  console.log('loading :>> ', loading);
  console.log('userData :>> ', userData);


  if(!authCookie) return <Redirect to="/" />

  return loading ? <div>...Loading User</div> :
  <main>
    {user?.username}
  </main>;
}

export default ProfilePage;
