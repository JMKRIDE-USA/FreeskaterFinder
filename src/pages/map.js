import React, { useState } from 'react';

import { QueryLoader } from '@jeffdude/frontend-helpers';
import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from '@mui/material';
import { Marker } from '@react-google-maps/api';

import Page from '../components/page';
import PageCard from '../components/page-card';
import Map from '../components/map';
import { useIsAccountComplete } from '../components/outlet';
import blurredMap from '../assets/GMapBlurred.png';
import { useGetAllLocations } from '../hooks/location';

const LoadedMapPage = ({locations, selected, setSelected}) => {
  return (
    <Map fullscreen selected={selected}>
      {locations.map(({users, location}, index) => 
        <Marker position={location} key={index} onClick={() => setSelected({users, location})}/>
      )}
    </Map>
  )
}
const LocationLoader = ({children}) => {
  const locationsQuery = useGetAllLocations();
  return <QueryLoader query={locationsQuery} propName="locations">
    {children}
  </QueryLoader>
}

const UserDisplayItem = ({user}) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar alt={user.firstName + user.lastName}/>
    </ListItemAvatar>
    <ListItemText
      primary={user.firstName + " " + user.lastName}
      secondary="test"
    />
  </ListItem>
)

const SelectedUsersDisplay = ({selected}) => {
  const {users, location } = selected;
  if(!location) return <></>
  return (
    <PageCard sx={{backgroundColor: "white", zIndex: 1}}>
      <Typography variant="h6">Zip Code: {location.zip}</Typography>
      <List sx={{width: '100%'}}>
        {users.map((user, index) => <><UserDisplayItem user={user}/>{index + 1 !== users.length && <Divider variant="inset" component="li"/>}</>)}
      </List>
    </PageCard>
  )
}

const MapPage = () => {
  const accountComplete = useIsAccountComplete();
  const [selected, setSelected] = useState({})
  if(accountComplete) {
    return (
      <Page fullscreen sx={{justifyContent: 'flex-end'}}>
        <LocationLoader><LoadedMapPage selected={selected} setSelected={setSelected}/></LocationLoader>
        <SelectedUsersDisplay selected={selected}/>
      </Page>
    )
  }
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