import React from 'react';

import { Divider, List, ListItemText, ListItem } from '@mui/material';
import { usePatchUser } from '@jeffdude/frontend-helpers';

import { useGetUserSettings } from '../hooks/user';
import PageCard from './page-card';
import { FFMapVisibility, FFUserPrivacy } from '../constants';
import Switch from './forms/switch';

const VisibilitySwitch = ({FFMapVisibility : visibility, userSettings}) => {
  const patchUser = usePatchUser();
  const visible = visibility === FFMapVisibility.visible;
  return <Switch
    checked={visible}
    caption={visible ? "Visible" : "Hidden"}
    doAction={(data) => patchUser({settings: {...userSettings, ...{FFMapVisibility: data}}})}
    preProcessData={() => visible ? FFMapVisibility.hidden : FFMapVisibility.visible}
  />
}

const PrivacySwitch = ({FFUserPrivacy : privacy, userSettings}) => {
  const patchUser = usePatchUser();
  const isPublic = privacy === FFUserPrivacy.public;
  return <Switch
    checked={isPublic}
    caption={isPublic ? "Public" : "Private"}
    doAction={(data) => patchUser({settings: {...userSettings, ...{FFUserPrivacy: data}}})}
    preProcessData={() => isPublic ? FFUserPrivacy.private : FFUserPrivacy.public}
  />
}


const UserSettingsCard = () => {
  const userSettings = useGetUserSettings();

  return <PageCard small headerRow title="My Settings">
    <List>
      <ListItem secondaryAction={<VisibilitySwitch FFMapVisibility={userSettings.FFMapVisibility} userSettings={userSettings}/>}>
        <ListItemText
          primary="Map Visibility"
          secondary="This controls whether you're visible on the map for others to see."
          sx={{maxWidth: 'min(80vw, 500px)'}}
        />
      </ListItem>
      <Divider/>
      <ListItem secondaryAction={<PrivacySwitch FFUserPrivacy={userSettings.FFUserPrivacy} userSettings={userSettings}/>}>
        <ListItemText
          primary="Profile Privacy"
          secondary={
            "By default, your account is private, " +
            "which means you must approve friends for them to see your social media links. " +
            "Set to 'Public' to allow people to see your social media links without friend requests."
          } sx={{maxWidth: 'min(80vw, 500px)', mr: 4}}
        />
      </ListItem>
    </List>
  </PageCard>
}

export default UserSettingsCard;