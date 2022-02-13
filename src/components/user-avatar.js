import React, { useState } from 'react';

import { Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import ProfileIcons from './profile-icon';
import { useNavigate } from 'react-router-dom';


function UserAvatar({user, editable = false}) {
  const userIcon = user?.profileIconName ? ProfileIcons[user.profileIconName] : null;
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  return (
    <Avatar alt={user?.firstName}
      sx={{ width: 50, height: 50,
        ...userIcon 
          ? {bgcolor: userIcon?.backgroundColor, padding: 4 + (userIcon.padding || 0 * 2) + "px"}
          : {}, 
        ...isHovering && editable ? {bgcolor: 'black'} : {},
      }} {...editable 
        ? {onMouseOver: () => setIsHovering(true), onMouseOut: () => setIsHovering(false),
            onClick: () => navigate('/edit-profileicon')} 
        : {}
      }
    >
      {isHovering && editable
        ? <EditIcon/>
        : userIcon && 
          <img src={userIcon.svg} alt={user.profileIconName} style={{maxWidth: '100%', maxHeight: '100%'}}/>
      }
    </Avatar>
  )
}

export default UserAvatar;