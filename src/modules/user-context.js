import { createContext, useContext } from 'react';

import { useGetSelf, QueryLoader, useGetAuthState } from '@jeffdude/frontend-helpers';


const FFUserContext = createContext();
FFUserContext.displayName = "FFUserContext"

const LoadedFFUserProvider = ({userInfo, children}) => {
  return (
    <FFUserContext.Provider value={userInfo}>
      {children}
    </FFUserContext.Provider>
  )
}

export const FFUserProvider = ({children}) => {
  const authState = useGetAuthState();
  const userInfoQuery = useGetSelf();
  return (authState
    ? <QueryLoader query={userInfoQuery} propName="userInfo">
        <LoadedFFUserProvider>
          {children}
        </LoadedFFUserProvider>
      </QueryLoader>
    : children
  )
}

export function useGetFFUserInfo(){
  return useContext(FFUserContext);
}