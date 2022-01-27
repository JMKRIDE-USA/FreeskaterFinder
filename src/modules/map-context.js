import React from 'react';
import { ACTIONS, useGetDispatch, QueryLoader, useGetQuery } from '@jeffdude/frontend-helpers';
import { useGetAuthState } from '@jeffdude/frontend-helpers/dist/hooks/auth';

const GMapsAPIKeyContext = React.createContext();
GMapsAPIKeyContext.displayName = "GMapsAPIKeyContext";

const LoadedGMapsAPIKeyProvider = ({googleMapsApiKey, children}) => (
  <GMapsAPIKeyContext.Provider value={googleMapsApiKey}>{children}</GMapsAPIKeyContext.Provider>
)

const KeyLoader = ({children}) => {
  const dispatch = useGetDispatch();
  const gMapsKeyQuery = useGetQuery(
    "location/googleMapsKey", "APIKey",
    {
      refetchOnWindowFocus: false, refetchOnMount: false, refetchOnReconnect: false,
      onError: () => dispatch({type: ACTIONS.resetAuth})
    }
  );
  return (
    <QueryLoader query={gMapsKeyQuery} propName="googleMapsApiKey">
      <LoadedGMapsAPIKeyProvider>
        {children}
      </LoadedGMapsAPIKeyProvider>
    </QueryLoader>
  )
}

export const GMapsAPIKeyProvider = ({children}) => {
  const authState = useGetAuthState();
  if(!authState){
    return <div>{children}</div>
  }
  return <KeyLoader> {children} </KeyLoader>;
}

const useGetGMapsKey = () => React.useContext(GMapsAPIKeyContext);
export default useGetGMapsKey;