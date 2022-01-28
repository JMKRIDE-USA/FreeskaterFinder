import React from 'react';

import { ListItem, ListItemText, ListItemAvatar, Button } from '@mui/material';
import { useGetUserInfo } from '@jeffdude/frontend-helpers';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import UserAvatar from './user-avatar';
import { maxBlurbLength } from '../constants';

const SocialLinkIcons = ({socialLinkData}) => {
  return <>friends!</>
}

const ThisIsYou = () => <Button aria-label="Go To Profile" endIcon={<ManageAccountsIcon/>}>Manage Account</Button>

const FriendRequester = ({user}) => {
  return <Button aria-label="Friend Request" endIcon={<PersonAddIcon/>}>Add Friend</Button>
}

const PendingRequest = () => <>pending</>

const UserItem = ({user, showAction = true}) => {
  let blurb = user.bio ? user.bio.substring(0, maxBlurbLength) : ''
  if(blurb.length > maxBlurbLength) {
    blurb += "..."
  }
  const userInfo = useGetUserInfo();

  const secondaryAction = (() => {
    if(userInfo.id === user.id) 
      return <ThisIsYou/>;
    if(userInfo.friends.includes(user.id))
      return <SocialLinkIcons socialLinkData={user.socialLinks}/>;
    if(userInfo.pendingRequests.map(r => r.to).includes(user.id))
      return <PendingRequest/>

    return <FriendRequester/>
  })();

  return (
    <ListItem secondaryAction={showAction ? secondaryAction : null}>
      <ListItemAvatar>
        <UserAvatar/>
      </ListItemAvatar>
      <ListItemText
        primary={user.firstName + " " + user.lastName}
        secondary={blurb}
        sx={{maxWidth: '200px'}}
      />
    </ListItem>
  )
}

export default UserItem