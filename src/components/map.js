import React, { useState } from 'react';

import { QueryLoader, useGetQuery } from '@jeffdude/frontend-helpers/dist/data';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useGetAuthState } from '@jeffdude/frontend-helpers/dist/hooks/auth';
import { Container } from '@mui/material';

import blurredMap from '../assets/GMapBlurred.png'
import { SignInDialog } from './log-in';

const containerStyle = {
  width: '100vw',
  height: '800px',
  display: 'absolute',
};

const center = {
  lat: 37.945447,
  lng: -39.955620,
};
const MyMapComponent = ({googleMapsApiKey, children}) => (
  <LoadScript googleMapsApiKey={googleMapsApiKey}>
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={3}
      options={{maxZoom: 9}}
    >
      { children }
    </GoogleMap>
  </LoadScript>
)

const KeyLoader = ({children}) => {
  const gMapsKeyQuery = useGetQuery({endpoint: "location/googleMapsKey", method: "GET"});
  return <QueryLoader query={gMapsKeyQuery}>{children}</QueryLoader>
}

const MapComponent = () => {
  const authState = useGetAuthState();
  const [open, setOpen] = useState(!authState)
  if(authState) return <KeyLoader><MyMapComponent/></KeyLoader>
  return (
    <Container disableGutters
      sx={{p: 0, m:0, spacing: 0, minHeight: '50vh', maxHeight: '75vh', minWidth: '100vw'}}
    >
      <img
        src={blurredMap} alt="Freeskater Finder Map Preview"
        style={{ objectFit: 'center', minWidth: '100%', flexGrow: 1, minHeight: '50vh', margin: '0 -100%'}}
      />
      <SignInDialog open={open}/>
    </Container>
  )
}

export default MapComponent;