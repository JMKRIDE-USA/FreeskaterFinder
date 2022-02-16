import React from 'react';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useGetAuthState, useGetUserInfo, useGetAccessToken } from '@jeffdude/frontend-helpers';
import { SignInDialog } from './sign-in'

export const useGetAccountStatus = () => { 
  const authState = useGetAuthState();
  const accessToken = useGetAccessToken();
  const userInfo = useGetUserInfo();
  const { socialLinks, location} = userInfo;

  if(!accessToken) return 'logged out'
  if(accessToken && !authState) return 'loading';
  if(authState && !(socialLinks && location)) return 'incomplete'
  return 'logged in'
}


const MyOutlet = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const accountStatus = useGetAccountStatus();

  React.useEffect(() =>{
    if(accountStatus === 'incomplete' && location.pathname !== '/setup-account'){
      navigate("/setup-account", {replace: true})
    }
  }, [accountStatus, location, navigate])

  if(accountStatus === 'logged out') return (
    <>
      <Outlet/>
      {accountStatus === 'logged out' && !(['/create-account', '/setup-account'].includes(location.pathname)) && <SignInDialog open={true}/>}
    </>
  )
  return <Outlet/>
}

export default MyOutlet;