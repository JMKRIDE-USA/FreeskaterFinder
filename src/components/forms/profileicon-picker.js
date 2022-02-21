import React, { useState } from 'react';

import { Grid, Avatar, Typography, ToggleButtonGroup, ToggleButton, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { usePatchUser } from '@jeffdude/frontend-helpers';

import ProfileIcons from '../profile-icon';
import PageCard from '../page-card';


const ProfileIconPickerCard = ({onSuccess, title}) => {

  const [selectedCategory, setSelectedCategory] = useState('JMK');

  const selectedIconNames = Object.keys(ProfileIcons).filter(
    (iconName) => ProfileIcons[iconName].category === selectedCategory
  )

  const patchUser = usePatchUser();
  const makeOnClick = (iconName) => () => {
    patchUser({profileIconName: iconName});
    onSuccess();
  }


  return (
    <PageCard sx={{maxWidth: 'min(1000px, 95vw)'}} title={title}>
      <ToggleButtonGroup
        value={selectedCategory} exclusive
        onChange={(_,value) => setSelectedCategory(value)}
        sx={{mb: 3, maxWidth: '100%', overFlowX: 'scroll', display: {xs: 'none', md: 'flex'}}}
      >
        <ToggleButton value="JMK" aria-label="JMKRIDE">
          JMKRIDE
        </ToggleButton>
        <ToggleButton value="Animals" aria-label="Animals">
          Animals
        </ToggleButton>
        <ToggleButton value="Planets" aria-label="Planets">
          Planets
        </ToggleButton>
        <ToggleButton value="Dogs" aria-label="Dogs">
          Dogs
        </ToggleButton>
        <ToggleButton value="Cats" aria-label="Cats">
          Cats
        </ToggleButton>
      </ToggleButtonGroup>
      <FormControl sx={{display: {xs: 'flex', md: 'none'}, mb: 3}}>
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          label="Category" color="secondary"
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <MenuItem value="JMK">JMKRIDE</MenuItem>
          <MenuItem value="Animals">Animals</MenuItem>
          <MenuItem value="Planets">Planets</MenuItem>
          <MenuItem value="Dogs">Dogs</MenuItem>
          <MenuItem value="Cats">Cats</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={2}>
        {selectedIconNames.map((iconName, index) => {
          const icon = ProfileIcons[iconName]
          return (
            <Grid key={index} item xs={3} md={1}>
              <Grid item container direction="column" sx={{alignItems: "center"}}>
                <Avatar sx={{width: 50, height: 50, bgcolor: icon.backgroundColor, padding: 4 + (icon.padding || 0 * 2) + "px"}} onClick={makeOnClick(iconName)}>
                  <img src={icon.svg} alt={iconName} style={{maxWidth: '100%', maxHeight: '100%'}}/>
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