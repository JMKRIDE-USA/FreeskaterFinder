import React, { useRef, useState } from 'react';

import { QueryLoader } from '@jeffdude/frontend-helpers';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Marker } from '@react-google-maps/api';

import UserList from '../components/user-list';
import Page from '../components/page';
import Map from '../components/map';
import { useIsAccountComplete } from '../components/outlet';
import blurredMap from '../assets/GMapBlurred.png';
import { useGetAllLocations } from '../hooks/location';

import titleLogo from '../assets/FreeskaterFinderLogo_WhiteBG.svg';
import titleLogoNoText from '../assets/FreeskaterFinderLogo_WhiteBG_NoText.svg';

const LoadedMap = ({locations, setSelected}) => {
  const [mapInstance, setMapInstance] = useState();

  const onClick = ({users, location}) => {
    mapInstance.setZoom(8)
    mapInstance.panTo(
      new window.google.maps.LatLng(location.lat, location.lng)
    );
    setSelected({users, location})
  }
  return (
    <Map fullscreen onLoad={mapInst => setMapInstance(mapInst)}>
      {locations.map(({users, location}, index) => 
        <Marker position={location} key={index} onClick={() => onClick({users, location})}/>
      )}
    </Map>
  )
}
const LocationLoader = ({children}) => {
  const locationsQuery = useGetAllLocations({refetchOnMount: false, refetchOnWindowFocus: false});
  return <QueryLoader query={locationsQuery} propName="locations">
    {children}
  </QueryLoader>
}

const SelectedUsersDisplay = ({selected}) => {
  const {users, location } = selected;
  console.log({users, location })
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('sm'));
  if(!location) return <></>
  return (
    <UserList sx={{backgroundColor: "white", zIndex: 1, m: {xs: 1, md: 5}, mb: {xs: 4, md: 10}}} headerRow header={
      <>
        <img src={isMd ? titleLogo : titleLogoNoText} style={{maxHeight: '100px', maxWidth: '40%'}} alt="JMKRIDE FreeskaterFinder Logo"/>
        <Typography variant="h6">{location.zip}, {location.country} </Typography>
      </>
    } users={users}/>
  )
}

const LoadedMapPage = ({locations}) => {
  console.log({locations})
  const [selected, setSelected] = useState({})
  return (
    <Page fullscreen absoluteChildren={
      <LoadedMap setSelected={setSelected} locations={locations}/>
    } gridStyle={{height: '100%', flexDirection: "column-reverse"}}>
      <SelectedUsersDisplay selected={selected}/>
    </Page>
  )
}

const MapPage = () => {
  const accountComplete = useIsAccountComplete();
  if(accountComplete)
    return <LocationLoader><LoadedMapPage/></LocationLoader>
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