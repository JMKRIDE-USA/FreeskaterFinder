import React from 'react';

import { ListItem, ListItemText, ListItemAvatar } from '@mui/material';

import UserAvatar from './user-avatar';
import { maxBlurbLength } from '../constants';

const UserItem = ({user}) => {
  let blurb = user.bio ? user.bio.substring(0, maxBlurbLength) : ''
  if(blurb.length > maxBlurbLength) {
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