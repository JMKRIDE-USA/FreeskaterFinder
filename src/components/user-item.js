import React from 'react';

import { ListItem, ListItemText, ListItemAvatar } from '@mui/material';

import UserAvatar from './user-avatar';
import { maxBlurbLength } from '../constants';

const UserItem = ({user}) => {
  user.blurb = "Hey! What's up home-skizzles? This is a long blurb blah blah blah"
  let blurb = user.blurb.substring(0, maxBlurbLength)
  if(user.blurb.length > maxBlurbLength) {
    blurb += "..."
  }
  return (
    <ListItem>
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