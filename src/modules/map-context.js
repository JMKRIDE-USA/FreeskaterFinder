import React, { useEffect, useState } from 'react';
import { ACTIONS, useGetDispatch, useGetQuery, useGetAuthState, useGetHeader } from '@jeffdude/frontend-helpers';

const GMapsAPIKeyContext = React.createContext();
GMapsAPIKeyContext.displayName = "GMapsAPIKeyContext";

const KeyLoader = ({children, accessToken}) => {
  const [key, setKey] = useState('');
  const dispatch = useGetDispatch();
  const { refetch } = useGetQuery(
    "location/googleMapsKey", "APIKey",
    {
      enabled: false,
      onSettled: (data, error) => {
        if(error || !data?.result) {
          console.log("[!] Error fetching googleMapsKey:", error, data?.result);
          dispatch({type: ACTIONS.resetAuth});
        }
        if(data?.result){
          setKey(data.result)
        }
      },
    }
  );
  useEffect(() => refetch(), [refetch, accessToken]);
  return (
    <GMapsAPIKeyContext.Provider value={key}>
      {children}
    </GMapsAPIKeyContext.Provider>
  );
}

export const GMapsAPIKeyProvider = ({children}) => {
  const accessToken = useGetHeader();
  const authState = useGetAuthState();
  if(!authState){
    return <div>{children}</div>
  }
  return <KeyLoader accessToken={accessToken}> {children} </KeyLoader>;
}

const useGetGMapsKey = () => React.useContext(GMapsAPIKeyContext);

export default useGetGMapsKey;