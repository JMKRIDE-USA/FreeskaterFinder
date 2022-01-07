import React from 'react';

import { QueryLoader, useGetQuery } from '@jeffdude/frontend-helpers/dist/data';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useGetAuthState } from '@jeffdude/frontend-helpers/dist/hooks/auth';

import blurredMap from '../assets/GMapBlurred.png'

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
  if(authState) return <KeyLoader><MyMapComponent/></KeyLoader>
  return (
    <img
      src={blurredMap} alt="Freeskater Finder Map Preview"
      style={{ objectFit: 'cover', width: '100vw', minHeight: '50vh'}}
    />
  )
}

export default MapComponent;