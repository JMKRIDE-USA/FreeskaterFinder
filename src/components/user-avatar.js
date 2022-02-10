import React from 'react';

import { Avatar } from '@mui/material';


function UserAvatar({user}) {
  return (
    <Avatar alt={user?.firstName} sx={{bgcolor: "white"}}/>
  )
}

export default UserAvatar;