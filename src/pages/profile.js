import React from 'react';

import { useGetUserInfo, useLogout } from '@jeffdude/frontend-helpers';
import { Grid, Typography, Divider, Button, ButtonGroup } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Marker } from '@react-google-maps/api';

import { ProfileLoadingPage } from '../components/loading-page';
import MapComponent from '../components/map';
import Page from '../components/page';
import TitleCard from '../components/title-card';
import PageCard from '../components/page-card';
import UserItem from '../components/user-item';
import UserSettingsCard from '../components/user-settings';
import AmbassadorCard from '../components/ambassador-card';

function MyAccountCard() {
  const userInfo = useGetUserInfo();
  const logout = useLogout();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/")
  }
  return (
    <PageCard small headerRow header={
      <>
        <Typography variant="h6" sx={{ml: 1}}>My Account</Typography>
        <ButtonGroup sx={{'&>*': {mr: 1}}}>
          <Button variant="contained" color="neutral" component={Link} to="/edit-profile">Edit</Button>
          <Button variant="contained" color="error" onClick={onLogout}>Log Out</Button>
        </ButtonGroup>
      </>
    }>
      <Grid container direction="row" sx={{alignItems: "center", justifyContent: "space-between"}}>
        <UserItem user={userInfo} showAction={false} editableAvatar/>
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

function ContactCard() {
  // fix header Divider alignment
  return <PageCard headerRow header={
    <Typography variant="h6">Contact JMK</Typography>
  } sx={{'& > *': {maxWidth: 'min(90vw, 590px)'}}}>
    <Typography variant="body1" sx={{mb: 2}}>
      Please reach out to me about any issues with the website, its users, your account, or anything else at all.
    </Typography>
    <Typography variant="h5" sx={{alignSelf: 'center'}} href="mailto:jeff@jmkride.com">
      jeff@jmkride.com
    </Typography>
    <Divider sx={{mt: 2, mb: 2, width: '100%'}}/>
    <Typography variant="body2" color="text.secondary">
      Thank you for using the JMKRIDE Freeskater Finder.
      This website was a labor of love by me, Jeff Milling. 
      It is my gift to the freeskating community. I sincerely hope that this site helps to connect freeskaters with
      other freeskaters in their area in a way that is safe and beneficial to all parties.
    </Typography> 
  </PageCard>
}

function ProfilePage() {
  const userInfo = useGetUserInfo();
  if(!userInfo.id){
    return <ProfileLoadingPage/>
  }
  return (
    <Page>
      <TitleCard title={"Welcome, " + userInfo.firstName + "!"}>
        <Typography variant="subheader">Manage your profile, privacy, and settings here.</Typography>
      </TitleCard>
      <Grid item container direction="row" sx={{justifyContent: 'center', "& > *": {m: 1}}}>
        <Grid item container direction="column" xs='auto' sx={{alignItems: 'stretch', '& > *': {mb: 1, mt: 1}}}>
          <MyAccountCard/>
          <UserSettingsCard/>
          <ContactCard/>
        </Grid>
        <Grid item container direction="column" xs='auto' sx={{ml: 2, alignItems: 'stretch', '& > *': {mb: 1, mt: 1}}}>
          <MyLocationCard md={6} xs={12}/>
          <AmbassadorCard/>
        </Grid>
      </Grid>
    </Page>
  )
}

export default ProfilePage;