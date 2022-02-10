import React from 'react';

import { Grid, Avatar, Typography } from '@mui/material';

import ProfileIcons from '../profile-icon';
import PageCard from '../page-card';


const ProfileIconPickerCard = () => {
  return (
    <PageCard>
      <Grid container spacing={2}>
        {Object.keys(ProfileIcons).map((iconName, index) => {
          const icon = ProfileIcons[iconName]
          return (
            <Grid key={index} item xs={1}>
              <Grid item container direction="column" sx={{alignItems: "center"}}>
                <Avatar sx={{width: 50, height: 50, bgcolor: icon.backgroundColor, padding: 4 + (icon.padding || 0 * 2) + "px"}}>
                  <img src={icon.svg} alt={iconName}/>
                </Avatar>
                <Typography variant="caption" noWrap sx={{textOverflow: "ellipses", maxWidth: 70}}>{iconName}</Typography>
              </Grid>
            </Grid>
          )
        })}
      </Grid>
    </PageCard>
  )
}

export default ProfileIconPickerCard;