import React from 'react';

import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { QueryLoader, useGetQuery } from '@jeffdude/frontend-helpers/dist/data';
import useGetGMapsKey from '../modules/map-context';

const fullscreenContainerStyle = {
  width: '100vw',
  height: '800px',
  display: 'absolute',
};

const CardContainerStyle = {
  maxWidth: '100vw',
  minWidth: '100%',
  maxHeight: '80vh',
  minHeight: '500px',
  flexGrow: 1,
};

const defaultCenter = {
  lat: 37.945447,
  lng: -39.955620,
};

const defaultZoom = 3;

const MapComponent = ({fullscreen = false, center = defaultCenter, zoom = defaultZoom, children}) => {
  const googleMapsApiKey = useGetGMapsKey();
  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={fullscreen ? fullscreenContainerStyle : CardContainerStyle}
        center={center}
        zoom={zoom}
        options={{
          maxZoom: 9,
          minZoom: 2,
          streetViewControl: false,
          mapTypeControl: false,
          mapTypeId: 'terrain',
          fullscreenControl: false,
        }}
      >
        { children }
      </GoogleMap>
    </LoadScript>
  )
}

const KeyLoader = ({children}) => {
  const gMapsKeyQuery = useGetQuery("location/googleMapsKey", "GET", {refetchOnWindowFocus: false, refetchOnMount: false, refetchOnReconnect: false});
  return <QueryLoader query={gMapsKeyQuery} propName="googleMapsApiKey">{children}</QueryLoader>
}

export default React.memo(MapComponent);
