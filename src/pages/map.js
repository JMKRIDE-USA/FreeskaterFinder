import React, { useState, useEffect } from 'react';

import { QueryLoader } from '@jeffdude/frontend-helpers';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Marker } from '@react-google-maps/api';
import { useParams } from 'react-router-dom';

import UserList from '../components/user-list';
import Page from '../components/page';
import PageCard from '../components/page-card';
import Map from '../components/map';
import { useGetAccountStatus } from '../components/outlet';
import blurredMap from '../assets/GMapBlurred.png';
import { useGetAllLocations } from '../hooks/location';

import FFMarkerDefault from '../assets/FF_MarkerDefault.svg'
import FFMarkerAmbassador from '../assets/FF_MarkerAmbassador.svg'
import FFMarkerFriend from '../assets/FF_MarkerFriend.svg'
import FFMarkerAmbassadorAndFriend from '../assets/FF_MarkerAmbassadorAndFriend.svg'

import titleLogo from '../assets/FreeskaterFinderLogo_WhiteBG.svg';
import titleLogoNoText from '../assets/FreeskaterFinderLogo_WhiteBG_NoText.svg';

const LoadedMap = ({locations, selected, setSelected, unsetSelected}) => {
  const [mapInstance, setMapInstance] = useState();
  const [initialized, setInitialized] = useState(false);

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

  const getMarkerIcon = ({users}) => {
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

  const panToLocation = ({users, location}) => {
    if(mapInstance.getZoom() < 8)
      mapInstance.setZoom(8)

    panToOffsetCenter(
      new window.google.maps.LatLng(location.lat, location.lng),
      Math.min(users.length * 100, 0.2 * (window.innerHeight))
    );
  }

  useEffect(() => {
    if(selected?.location && mapInstance && initialized) panToLocation(selected)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, mapInstance, initialized])

  return (
    <Map fullscreen
      onLoad={mapInst => setMapInstance(mapInst)}
      onProjectionChanged={() => setInitialized(true)}
      onClick={unsetSelected}
    >
      {mapInstance && locations.map(({users, location}, index) => 
        <Marker
          position={location} key={index} onClick={() => setSelected({users, location})}
          icon={getMarkerIcon({users})} draggable={false} shape={{
            coords: [15, 10, 50, 80],
            type: "rect",
          }} options={{shape: {coords: [15, 10, 50, 80], type: "rect"}}}
        />
      )}
    </Map>
  )
}

const SelectedUsersDisplay = ({selected : {users, location} = {}}) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('sm'));
  if(!location) return <></>
  return (
    <PageCard sx={{backgroundColor: "white", zIndex: 1, mb: {xs: 5, md: 10}, m: {xs: 1, md: 5}, maxHeight: '40vh'}} headerRow header={
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
  const { locationId } = useParams();
  const [selected, setSelectedState] = useState()

  const setSelected = (newSelected) => {
    window.history.replaceState(null, '', '/location/' + newSelected.location._id)
    setSelectedState(newSelected)
  }
  const unsetSelected = () => {
    window.history.replaceState(null, '', '/')
    setSelectedState({})
  }
  React.useEffect(() => {
    if(locationId){
      setSelectedState(locations.find(l => l.location._id === locationId))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationId, setSelectedState])

  React.useEffect(() => {
    if(selected?.location){
      setSelectedState(locations.find(l => l.location._id === selected.location._id))
    }
  }, 
  [locations, selected, setSelectedState])

  return (
    <Page fullscreen absoluteChildren={
      <LoadedMap {...{selected, setSelected, unsetSelected, locations}}/>
    } gridStyle={{height: '100%', flexDirection: "column-reverse"}}>
      <SelectedUsersDisplay selected={selected}/>
    </Page>
  )
}

const MapPage = () => {
  const accountStatus = useGetAccountStatus();
  const useGetAllLocationQuery = () => useGetAllLocations({refetchOnMount: false, refetchOnWindowFocus: false});
  if(accountStatus === 'logged in')
    return (
      <QueryLoader query={useGetAllLocationQuery} propName="locations" generateQuery>
        <LoadedMapPage/>
      </QueryLoader>
    )
  return (
    <Page>
      <Box sx={{p: 0, m:0, height: '95vh', width: '100vw', margin: {xs: '0 -100%', lg: 0}}}>
        <img
          src={blurredMap} alt="Freeskater Finder Map Preview"
          style={{ objectFit: 'center', minWidth: '100%', flexGrow: 1, minHeight: '50vh', margin: '0 -100%'}}
        />
      </Box>
    </Page>
  )
}

export default MapPage;