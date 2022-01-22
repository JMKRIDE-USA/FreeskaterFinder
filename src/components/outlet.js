import React from 'react';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useGetAuthState, useGetUserInfo } from '@jeffdude/frontend-helpers';
import { SignInDialog } from './sign-in'

const MyOutlet = () => {
  const authState = useGetAuthState();
  const userInfo = useGetUserInfo();
  const location = useLocation();
  const navigate = useNavigate();
  if(authState && (!userInfo.socialLinks || !userInfo.location) && (location.pathname !== '/setup-account')){
    navigate("/setup-account", {replace: true})
    return <></>
  } else {
    return (
      <>
        <Outlet/>
        {!authState && !(['/create-account', '/setup-account'].includes(location.pathname)) && <SignInDialog open={true}/>}
      </>
    )
  }
}

export default MyOutlet;