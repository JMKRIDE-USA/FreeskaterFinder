import React from 'react';

import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

import Page from './page';
import TitleCard from './title-card';
import PageCard from './page-card';
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

function ListItemSkeleton() {
  const primaryWidth = Math.random() * (400 - 200) + 200;
  const secondaryWidth = Math.random() * (450 - 300) + 300;
  return (
    <ListItem sx={{maxWidth: '85vw'}}>
      <ListItemAvatar><Skeleton variant="circular" width={50} height={50}/></ListItemAvatar>
      <ListItemText disableTypography
        primary={<Skeleton variant="text" sx={{width: 'min(70vw, ' + primaryWidth + 'px)'}}/>}
        secondary={<Skeleton variant="text" sx={{width: 'min(70vw, ' + secondaryWidth + 'px)'}}/>}
      />
    </ListItem>
  )
}

export function ListCardSkeleton({length = 6, sx = {}}) {
  return (
    <PageCard xs={12} md={4} headerRow header={<Skeleton variant="text" width={'min(90vw, ' + 400 + 'px)'}/>} sx={{m: 2, ...sx}}>
      <List>
        {Array.from(Array(length).keys()).map(index => <ListItemSkeleton key={index}/>)}
      </List>
    </PageCard>
  )
}

export function DetailCardSkeleton({sx = {}}) {
  return (
    <PageCard xs={12} md={4} headerRow header={<Skeleton variant="text" sx={{width: 'min(90vw, ' + 400 + 'px)'}}/>} sx={{m: 2, ...sx}}>
      <Grid item container direction="row">
        <Skeleton variant="rectangle" width={'min(80vw, ' + 450 + 'px)'} height={300}/>
      </Grid>
    </PageCard>
  )
}

export function RawCardSkeleton({sx = {}}) {
  return (
    <PageCard xs={12} md={4} sx={{m: 2, ...sx}}>
      <Skeleton variant="rectangle" sx={{width: 'min(90vw, ' + 500 + 'px)'}} height={650}/>
    </PageCard>
  )
}

export function ProfileLoadingPage() {
  return <Page>
    <TitleCard/>
    <Grid container direction="row" sx={{justifyContent: 'center'}}>
      <Grid item container direction="column" xs='auto' sx={{alignItems: 'stretch', '& > *': {mb: 1, mt: 1}}}>
        <DetailCardSkeleton/>
        <DetailCardSkeleton/>
      </Grid>
      <RawCardSkeleton/>
    </Grid>
  </Page>
}

export function FriendsLoadingPage() {
  return <Page>
    <TitleCard/>
    <ListCardSkeleton length={2}/>
    <ListCardSkeleton/>
  </Page>
}