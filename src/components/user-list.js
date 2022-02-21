import React from 'react';

import { List, Typography } from '@mui/material';

import UserItem from './user-item';


function UserList({users, emptyMessage = "No Users Found", ...props}){
  if(!users.length)
    return <Typography variant="body">
      {emptyMessage}
    </Typography>
  const userVal = (user) => {
    let val = 0;
    if(user.isAmbassador) val += 10;
    if(user.isFriend) val += 5;
    if(user.outgoingPendingFriend || user.incomingPendingFriend) val += 1;
    return val;
  }
  users.sort((user1, user2) => userVal(user2) - userVal(user1))
  return (
    <List sx={{width: '100%', overflowY: 'auto'}}>
      {users.map((user, index) => (
        <React.Fragment key={index}>
          <UserItem user={user} divider={index + 1 !== users.length} {...props}/>
        </React.Fragment>
      ))}
    </List>
  )
}

export default UserList;