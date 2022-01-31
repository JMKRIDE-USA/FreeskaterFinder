import React from 'react';

import { Avatar } from '@mui/material';

function UserAvatar({user}) {
  return (
    <Avatar alt={user?.firstName}>
      {user?.firstName?.charAt(0)}
    </Avatar>
  )
}

export default UserAvatar;