import React from 'react';

import { Divider, List } from '@mui/material';

import PageCard from './page-card';
import UserItem from './user-item';


function UserList({users, sx, ...props}){
  return (
    <PageCard sx={{...{}, ...sx}} {...props}>
      <List sx={{width: '100%'}}>
        {users.map((user, index) => (
          <React.Fragment key={index}>
            <UserItem user={user}/>
            {index + 1 !== users.length && <Divider variant="inset" component="li"/>}
          </React.Fragment>
        ))}
      </List>
    </PageCard>
  )
}

export default UserList;