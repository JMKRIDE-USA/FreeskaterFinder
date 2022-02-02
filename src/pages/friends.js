import React from 'react';

import { Typography } from '@mui/material';
import { useGetUserInfo } from '@jeffdude/frontend-helpers';
import { QueryLoader } from '@jeffdude/frontend-helpers/dist/data';
import GroupIcon from '@mui/icons-material/Group';

import { useGetIncomingPendingFriends } from '../hooks/friends';
import Page from '../components/page';
import PageCard from '../components/page-card';
import TitleCard from '../components/title-card';
import UserList from '../components/user-list';
import RequestList from '../components/request-list';


function LoadedPendingFriendsCard({pendingFriends}) {
  if(!pendingFriends.length)
    return <></>
  return (
    <PageCard sx={{mb:2}} headerRow header={
      <Typography variant="h6">Friend Requests</Typography>
    }>
      <RequestList requests={pendingFriends}/>
    </PageCard>
  )
}

function PendingFriendsCard() {
  const pendingFriendsQuery = useGetIncomingPendingFriends()
  return <QueryLoader query={pendingFriendsQuery} propName="pendingFriends">
    <LoadedPendingFriendsCard/>
  </QueryLoader>
}

function FriendsCard() {
  const { friends } = useGetUserInfo();
  friends.forEach(friend => friend.isFriend = true);
  return (
    <PageCard sx={{mb:2}} headerRow header={
      <>
        <GroupIcon/> 
        <Typography variant="h4">My Friends</Typography>
        <div/>
      </>
    }>
      <UserList users={friends} emptyMessage="Go to the map and add some friends!"/>
    </PageCard>
  )
}

function FriendsPage() {
  const userInfo = useGetUserInfo();
  return <Page>
    <TitleCard title={userInfo.firstName + "'s Freeskate Family"}/>
    <PendingFriendsCard/>
    <FriendsCard/>
  </Page>
}

export default FriendsPage;