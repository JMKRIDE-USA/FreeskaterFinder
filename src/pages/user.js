import React, { useState } from 'react';

import { useParams, Link } from 'react-router-dom';
import { QueryLoader, ISOToReadableString, permissionLevelToAuthState, invalidateJFHCache, useCreatePasswordResetToken } from '@jeffdude/frontend-helpers';
import { Button, Grid, Link as MuiLink, Typography } from '@mui/material';
import { Marker } from '@react-google-maps/api';

import { useGetUserById, useGetAllUsers } from '../hooks/users';
import { ListCardSkeleton } from '../components/loading-page';
import Page from '../components/page';
import TitleCard from '../components/title-card';
import UserItem from '../components/user-item';
import PageCard from '../components/page-card';
import UserTable from '../components/tables/users';
import TransactionsTable from '../components/tables/transactions';
import MapComponent from '../components/map';
import InfoList from '../components/info-list';
import useMakeForm from '../hooks/form';
import { makeTextField } from '../components/forms/fields';
import { useGetUserTransactions } from '../hooks/transactions';
import { useCreateReferralCode } from '../hooks/referral-codes';
import { AmbassadorDetailCard } from '../components/ambassador-card';


function UserDetailCard({user}){
  const {
    friends, firstName, lastName, location, bio, fullName, 
    id, _id, socialLinks, profileIconName, updatedAt, 
    balance, referralCode, __v, password,
    ...userDetails
  } = user;
  user.createdAt = ISOToReadableString(user.createdAt)

  return (
    <PageCard headerRow title="User Details">
      <InfoList object={userDetails} sx={{width: '100%'}}/>
    </PageCard>
  )
}

function ReferralCodeCreationForm({user}){
  const createReferralCode = useCreateReferralCode();
  const renderForm = useMakeForm({
    actionFn: (data) => createReferralCode({owner: user._id, ...data}),
    onSuccess: invalidateJFHCache,
    stateList: [
      {
        key: 'code', label: 'Code', initialState: '', formatFn: i => i,
        component: makeTextField({key: 'code', label: 'Code', validation: {required: 'This field is required'}}),
      },
      {
        key: 'percent', label: 'Percentage', initialState: '5', formatFn: i => parseInt(i),
        component: makeTextField(
          {key: 'percent', label: 'Percentage', validation: {
            required: 'This field is required',
            validate: value => {const num = parseInt(value); return (0 < num && num < 100)},
          }}
        ),
      },
    ]
  })
  return (<>
    <Typography variant="body1">Create Ambassador Referral Code:</Typography>
    {renderForm()}
  </>)
}

function SingleUserCards({user}){
  user.authState = permissionLevelToAuthState(user.permissionLevel)
  const useTransactionsQuery = () => useGetUserTransactions(user._id)
  const [pwResetToken, setPwResetToken] = useState('')

  const [copied, flipCopied] = React.useReducer(state => !state, false)
  React.useEffect(() => setTimeout(() => {if(copied) flipCopied()}, 1000), [copied, flipCopied]);

  const createPasswordResetToken = useCreatePasswordResetToken({createMutationCallOptions: {onSuccess: ({ result }) => {if(result) setPwResetToken(result?.key)}}});

  const domain = window.location.origin
  const onCopyLink = () => {
    navigator.clipboard.writeText(domain + "/reset-password/" + pwResetToken)
    flipCopied();
  }
  return <>
    <Grid container direction="row" sx={{m: 1, justifyContent: 'center', "& > *": {m: 1}, maxWidth: 'min(100vw, 2000px)'}}>
      <Grid item container direction="column" xs='auto' sx={{alignItems: 'stretch', '& > *': {m: 1}}}>
        <PageCard headerRow title={"User: " + user.fullName} xs="auto">
          <UserItem user={{isFriend: true, ...user}}/>
          {pwResetToken 
            ? <Button variant="contained" color="neutral" onClick={onCopyLink}>{copied ? "Copied!" : "Copy PW Reset Link"}</Button>
            : <Button variant="contained" color="neutral" onClick={() => createPasswordResetToken({userId: user._id})}>Generate PW Reset Token</Button>
          }
        </PageCard>
        <UserDetailCard user={user}/>
        {user.authState > 1 && <AmbassadorDetailCard user={user} noReferralCodeElement={<ReferralCodeCreationForm user={user}/>}/>}
      </Grid>
      <Grid item container direction="column" xs='auto' sx={{alignItems: 'stretch', '& > *': {m: 1}}}>
        <PageCard headerRow title={user.firstName + "'s location:"} header={
          user.location ? <MuiLink component={Link} to={"/location/" + user.location._id}>{user.location.zip}, {user.location.country}</MuiLink> : undefined
        }>
          {user.location
            ? <MapComponent center={user.location} containerStyle={{minHeight: '300px'}} zoom={6} interactive={false}>
              <Marker position={user.location}/>
            </MapComponent>
            : <Typography variant="body1">No Location</Typography>
          }
        </PageCard>
        {user.friends.length ? <UserTable users={user.friends} title={user.firstName + "'s friends"} basic/> : <></>}
      </Grid>
      {user.authState > 1 && <QueryLoader query={useTransactionsQuery} propName="transactions" generateQuery>
        <TransactionsTable title={user.fullName + "'s Transactions"}/>
      </QueryLoader>}
    </Grid>
  </>
}

function UserPage(){
  const { userId } = useParams();
  const useGetUserQuery = () => useGetUserById(userId);
  return <Page>
    <TitleCard>{userId && <MuiLink component={Link} to={"/users"}>View All Users</MuiLink>}</TitleCard>
    {userId
      ? <QueryLoader
        query={useGetUserQuery} propName="user" generateQuery
        loading={() => <ListCardSkeleton length={1}/>}
      ><SingleUserCards/></QueryLoader>
      : <QueryLoader
        query={useGetAllUsers} propName="users" generateQuery
        loading={() => <ListCardSkeleton/>}
      ><UserTable title="All Users"/></QueryLoader>
    }
  </Page>
}

export default UserPage;