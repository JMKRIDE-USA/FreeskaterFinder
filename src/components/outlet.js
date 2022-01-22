import React from 'react';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useGetAuthState, useGetUserInfo } from '@jeffdude/frontend-helpers';
import { SignInDialog } from './sign-in'

export const useIsAccountComplete = () => { 
  const authState = useGetAuthState();
  const userInfo = useGetUserInfo();
  const { socialLinks, location} = userInfo;
  return (authState && socialLinks && location)
}


const MyOutlet = () => {
  const authState = useGetAuthState();
  const accountComplete = useIsAccountComplete();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() =>{
    if(authState && (!accountComplete && location.pathname !== '/setup-account')){
      navigate("/setup-account", {replace: true})
    }
  }, [authState, accountComplete, location, navigate])

  if(authState && (!accountComplete && location.pathname !== '/setup-account')){
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