import React from 'react';

import { useGetAuthState } from '@jeffdude/frontend-helpers/dist/hooks/auth';
import { Box } from '@mui/material';

import Page from '../components/page';
import Map from '../components/map';
import blurredMap from '../assets/GMapBlurred.png';
import { useGetAllLocations } from '../hooks/location';

const LoadedMapPage = ({locations}) => {
  <Map fullscreen/>
}

const LocationLoader = ({children}) => {
  const locations = useGetAllLocations();
}

const MapPage = () => {
  const authState = useGetAuthState();
  if(authState) return  <></>
  return (
    <Page>
      <Box sx={{p: 0, m:0, minHeight: '50vh', maxHeight: '75vh', width: '100vw', margin: {xs: '0 -100%', lg: 0}}}>
        <img
          src={blurredMap} alt="Freeskater Finder Map Preview"
          style={{ objectFit: 'center', minWidth: '100%', flexGrow: 1, minHeight: '50vh', margin: '0 -100%'}}
        />
      </Box>
    </Page>
  )
}

export default MapPage;