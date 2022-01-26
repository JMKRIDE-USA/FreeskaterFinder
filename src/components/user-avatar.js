import React from 'react';

import { Avatar } from '@mui/material';

import { useGetUserInfo } from '@jeffdude/frontend-helpers';

function UserAvatar() {
  const userInfo = useGetUserInfo();
  return (
    <Avatar alt={userInfo?.firstName}>
      {userInfo?.firstName.charAt(0)}
    </Avatar>
  )
}

export default UserAvatar;