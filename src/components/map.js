import React from 'react';

import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Box } from '@mui/material';
import { QueryLoader, useGetQuery } from '@jeffdude/frontend-helpers/dist/data';

import useGetGMapsKey from '../modules/map-context';
import { bodyHeight } from '../constants';

const fullscreenContainerStyle = {
  width: '100vw',
  minHeight: '100%',
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

const MapComponent = ({selected = undefined, fullscreen = false, center = defaultCenter, zoom = defaultZoom, children}) => {
  const googleMapsApiKey = useGetGMapsKey();
  return (
    <Box sx={{width: '100vw', position: 'absolute', height: bodyHeight}}>
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={fullscreen ? fullscreenContainerStyle : CardContainerStyle}
          center={center}
          zoom={zoom}
          options={{
            maxZoom: 9,
            minZoom: 3,
            streetViewControl: false,
            mapTypeControl: false,
            mapTypeId: 'terrain',
            fullscreenControl: false,
            restriction: {
              latLngBounds: {
                north: 85,
                south: -85,
                east: -180,
                west: 180,
              }
            }
          }}
        >
          { children }
        </GoogleMap>
      </LoadScript>
    </Box>
  )
}

export default React.memo(MapComponent);
