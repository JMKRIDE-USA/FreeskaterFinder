import React from 'react';

import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Box } from '@mui/material';

import useGetGMapsKey from '../modules/map-context';
import { bodyHeight } from '../constants';

const fullscreenContainerStyle = {width: '100vw', position: 'absolute', height: bodyHeight};

const CardContainerStyle = {
  width: 'min(90vw, 500px)',
  height: '500px',
  flexGrow: 1,
};

const defaultCenter = {
  lat: 37.945447,
  lng: -39.955620,
};

const defaultZoom = 3;


const MapComponent = ({
  fullscreen = false,
  center = defaultCenter,
  zoom = defaultZoom,
  containerStyle = {},
  interactive = true,
  onLoad,
  children
}) => {
  const googleMapsApiKey = useGetGMapsKey();
  const myContainerStyle = {...(fullscreen ?  fullscreenContainerStyle : CardContainerStyle), ...containerStyle}
  return (
    <Box sx={myContainerStyle}>
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={{width: '100%', height: '100%'}}
          center={center}
          zoom={zoom}
          onLoad={onLoad}
          options={{...{
            maxZoom: 9,
            minZoom: 3,
            streetViewControl: false,
            mapTypeControl: false,
            mapTypeId: 'terrain',
            fullscreenControl: false,
          }, ...(interactive ? {gestureHandling: 'greedy'} : {gestureHandling: 'none', zoomControl: false})
        }}>
          { children }
        </GoogleMap>
      </LoadScript>
    </Box>
  )
}

export default React.memo(MapComponent);
