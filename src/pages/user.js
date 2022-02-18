import React from 'react';

import { useParams } from 'react-router-dom';
import { QueryLoader } from '@jeffdude/frontend-helpers';
import { Typography } from '@mui/material';

import { useGetUserById } from '../hooks/users';
import { DetailCardSkeleton } from '../components/loading-page';
import Page from '../components/page';
import TitleCard from '../components/title-card';
import UserItem from '../components/user-item';
import PageCard from '../components/page-card';


function LoadedSingleUserCard({user}){
  console.log({user});
  return <PageCard header={<Typography variant="h6">User: {user.fullName}</Typography>}>
    <UserItem user={user} showAction={false}/>
  </PageCard>
}

function SingleUserCard({userId}){
  const userQuery = useGetUserById(userId)
  return <QueryLoader query={userQuery} propName="user" loading={() => <DetailCardSkeleton/>}>
    <LoadedSingleUserCard/>
  </QueryLoader>
}

function UserPage(){
  const { userId } = useParams();
      // : <AllUsersLoader><UsersTable title="All Users"/></AllUsersLoader>
  return <Page>
    <TitleCard/>
    {userId
      ? <SingleUserCard userId={userId}/>
      : <></>
    }
  </Page>
}

export default UserPage;