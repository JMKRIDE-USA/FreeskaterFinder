import React from 'react';

import { Divider, List, Typography } from '@mui/material';

import UserItem from './user-item';


function UserList({users, emptyMessage = "No Users Found"}){
  if(!users.length)
    return <Typography variant="body">
      {emptyMessage}
    </Typography>
  return (
    <List sx={{width: '100%', overflowY: 'auto'}}>
      {users.map((user, index) => (
        <React.Fragment key={index}>
          <UserItem user={user}/>
          {index + 1 !== users.length && <Divider variant="inset" component="li"/>}
        </React.Fragment>
      ))}
    </List>
  )
}

export default UserList;