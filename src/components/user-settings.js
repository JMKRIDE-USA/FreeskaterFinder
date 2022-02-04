import React from 'react';

import { Divider, Switch, List, ListItemText, ListItem, Typography, Grid } from '@mui/material';
import { usePatchUser } from '@jeffdude/frontend-helpers';

import { useGetUserSettings } from '../hooks/user';
import PageCard from './page-card';
import useMakeLoadingButton from '../hooks/loading-button';

const VisibilitySwitch = ({FFMapVisibility : visible}) => {
  const patchUser = usePatchUser();
  const { loading, submissionResult, onClick, render : renderIcon } = useMakeLoadingButton({
    doAction: (data) => patchUser({settings: {FFMapVisibility: data}}),
    preProcessData: () => !visible,
    iconButton: true,
    isFormButton: false,
  })
  return <Grid container direction="column" sx={{alignItems: 'center'}}>
    { (!!loading || submissionResult !== undefined)
      ? renderIcon({disabled: true})
      : <>
        <Switch checked={visible} onChange={onClick}/>
        <Typography variant="caption">
          {visible ? "Visible" : "Hidden"}
        </Typography>
      </>
    }
  </Grid>
}


const UserSettingsCard = (...props) => {
  const userSettings = useGetUserSettings();

  return <PageCard small headerRow header={
    <>
      <Typography variant="h6">My Settings</Typography>
    </>
  } {...props}>
    <List>
      <ListItem secondaryAction={<VisibilitySwitch FFMapVisibility={userSettings.FFMapVisibility}/>}>
        <ListItemText
          primary="Map Visibility"
          secondary="This controls whether you're visible on the map for others to see."
          sx={{maxWidth: '80%'}}
        />
      </ListItem>
      <Divider/>
    </List>
  </PageCard>
}

export default UserSettingsCard;