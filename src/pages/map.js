import React, { useState } from 'react';

import { QueryLoader } from '@jeffdude/frontend-helpers';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { GoogleMap, Marker } from '@react-google-maps/api';

import UserList from '../components/user-list';
import Page from '../components/page';
import PageCard from '../components/page-card';
import Map from '../components/map';
import { useIsAccountComplete } from '../components/outlet';
import blurredMap from '../assets/GMapBlurred.png';
import { useGetAllLocations } from '../hooks/location';

import FFMarkerDefault from '../assets/FF_MarkerDefault.svg'
import FFMarkerAmbassador from '../assets/FF_MarkerAmbassador.svg'
import FFMarkerFriend from '../assets/FF_MarkerFriend.svg'
import FFMarkerAmbassadorAndFriend from '../assets/FF_MarkerAmbassadorAndFriend.svg'

import titleLogo from '../assets/FreeskaterFinderLogo_WhiteBG.svg';
import titleLogoNoText from '../assets/FreeskaterFinderLogo_WhiteBG_NoText.svg';

const LoadedMap = ({locations, setSelected}) => {
  const [mapInstance, setMapInstance] = useState();

  function panToOffsetCenter(latlng, offsety) {
    // offsety is the distance you want that point to move upwards, in pixels
    // offset can be negative

    var scale = Math.pow(2, mapInstance.getZoom());
    var worldCoordinateCenter = mapInstance.getProjection().fromLatLngToPoint(latlng);
    var pixelOffset = new window.google.maps.Point(0, (offsety/scale) ||0);
    var worldCoordinateNewCenter = new window.google.maps.Point(
        worldCoordinateCenter.x,
        worldCoordinateCenter.y + pixelOffset.y
    );
    var newCenter = mapInstance.getProjection().fromPointToLatLng(worldCoordinateNewCenter);
    mapInstance.panTo(newCenter);
  }

  const getIcon = ({users}) => {
    const friend = users.some(user => user.isFriend)
    const ambassador = users.some(user => user.isAmbassador)
    const url = (() => {
      if(friend && ambassador) return FFMarkerAmbassadorAndFriend; 
      if(ambassador) return FFMarkerAmbassador; 
      if(friend) return FFMarkerFriend; 
      return FFMarkerDefault; 
    })()
    return {url, scaledSize: new window.google.maps.Size(...(friend || ambassador) ? [65, 65] : [57, 57])}
  }

  const onClick = ({users, location}) => {
    if(mapInstance.getZoom() < 8)
      mapInstance.setZoom(8)

    panToOffsetCenter(
      new window.google.maps.LatLng(location.lat, location.lng),
      Math.min(users.length * 100, 0.2 * (window.innerHeight))
    );
    setSelected({users, location})
  }
  return (
    <Map fullscreen onLoad={mapInst => setMapInstance(mapInst)}>
      {mapInstance && locations.map(({users, location}, index) => 
        <Marker
          position={location} key={index} onClick={() => onClick({users, location})}
          icon={getIcon({users})}
        />
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

const SelectedUsersDisplay = ({selected : {users, location}}) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('sm'));
  if(!location) return <></>
  return (
    <PageCard sx={{backgroundColor: "white", zIndex: 1, m: {xs: 1, md: 5}, maxHeight: '40vh'}} headerRow header={
      <>
        <img src={isMd ? titleLogo : titleLogoNoText} style={{maxHeight: '100px', maxWidth: '40%'}} alt="JMKRIDE FreeskaterFinder Logo"/>
        <Typography variant="h6">{location.zip}, {location.country} </Typography>
      </>
    }>
      <UserList users={users}/>
    </PageCard>
  )
}

const LoadedMapPage = ({locations}) => {
  const [selected, setSelected] = useState({})
  React.useEffect(() => {
    if(selected?.location){
      for(let location of locations){
        if(location.location._id === selected.location.id)
          setSelected(location)
      }
    }
  }, 
  [locations, selected, setSelected])
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