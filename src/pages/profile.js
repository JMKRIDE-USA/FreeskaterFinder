import React from 'react';

import { useGetUserInfo } from '@jeffdude/frontend-helpers';
import { Grid, Typography, Divider, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Marker } from '@react-google-maps/api';

import MapComponent from '../components/map';
import Page from '../components/page';
import TitleCard from '../components/title-card';
import PageCard from '../components/page-card';
import UserItem from '../components/user-item';

function MyAccountCard() {
  const userInfo = useGetUserInfo();
  return (
    <PageCard small headerRow header={
      <>
        <Typography variant="h6" sx={{ml: 1}}>My Account</Typography>
        <Button variant="contained" color="neutral" component={Link} to="/edit-profile" sx={{alignSelf: "flex-end"}}>Edit</Button>
      </>
    }>
      <Grid container direction="row" sx={{alignItems: "center", justifyContent: "space-between"}}>
        <UserItem user={userInfo}/>
      </Grid>
    </PageCard>
  )
}

function MyLocationCard() {
  const userInfo = useGetUserInfo()
  return (
    <PageCard sx={{minWidth: '400px', minHeight: '300px'}} small headerRow header={
      <>
        <Typography variant="h6" sx={{ml: 1}}>My Location</Typography>
        <Button variant="contained" color="neutral" component={Link} to="/edit-location" sx={{alignSelf: "flex-end"}}>Edit</Button>
      </>
    }>
      <Typography variant="body" alignSelf="flex-start" mb={1}><b>Location:</b> {userInfo.location.zip}, {userInfo.location.country}</Typography>
      <MapComponent center={userInfo.location} containerStyle={{minHeight: '300px'}} zoom={6} interactive={false}>
        <Marker position={userInfo.location}/>
      </MapComponent>
    </PageCard>
  )
}

function ProfilePage() {
  const userInfo = useGetUserInfo();
  return (
    <Page>
      <TitleCard title={"Welcome, " + userInfo.firstName + "!"}>
        <Typography variant="subheader">Manage your profile, privacy, and settings here.</Typography>
      </TitleCard>
      <Grid item container sx={{justifyContent: "center", alignItems: "flex-start", "& > *": {m: 1}}}>
        <MyAccountCard/>
        <MyLocationCard/>
      </Grid>
    </Page>
  )
}

export default ProfilePage;