import React from 'react';

import { Grid, ListItem, ListItemText, ListItemAvatar, Button, TextField, IconButton } from '@mui/material';
import { useGetUserInfo } from '@jeffdude/frontend-helpers';
import { useForm } from 'react-hook-form';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

import UserAvatar from './user-avatar';
import { maxBlurbLength } from '../constants';
import useMakeLoadingButton from '../hooks/loading-button';
import { useCreateFriendRequest } from '../hooks/user';

const SocialLinkIcons = ({socialLinkData}) => {
  return <>friends!</>
}

const ThisIsYou = () => <Button aria-label="Go To Profile" endIcon={<ManageAccountsIcon/>}>Manage Account</Button>

const FriendRequestForm = ({user, setClicked}) => {
  const createFriendRequest = useCreateFriendRequest();

  const { handleSubmit, register, reset } = useForm({defaultValues: {memo: ''}})
  const { render : renderSubmit, onClick } = useMakeLoadingButton({doAction: createFriendRequest, button: () => <CheckIcon/> })

  const onCancel = () => {
    reset()
    setClicked(false);
  }

  return (
    <form onSubmit={handleSubmit(onClick)}>
      <Grid container direction="row" sx={{flexGrow: 1, alignItems: "center", justifyContent: "flex-end", "& > *": {m:1}}}>
        <TextField label="memo" inputProps={register('memo')}/>
        { renderSubmit({sx: { maxWidth: undefined, minWidth: undefined} }) }
        <IconButton aria-label="cancel" onClick={onCancel}><CancelIcon/></IconButton>
      </Grid>
    </form>
  )
}
const FriendRequester = ({user}) => {
  const [clicked, setClicked] = React.useState(false);
  if(clicked) return <FriendRequestForm setClicked={setClicked}/>
  return <Button aria-label="Friend Request" endIcon={<PersonAddIcon/>} onClick={() => setClicked(true)}>Add Friend</Button>
}

const PendingFriend = () => <>pending</>

const UserItem = ({user, showAction = true}) => {
  let blurb = user.bio ? user.bio.substring(0, maxBlurbLength) : ''
  if(blurb.length > maxBlurbLength) {
    blurb += "..."
  }
  const userInfo = useGetUserInfo();

  const secondaryAction = (() => {
    if(userInfo.id === user.id) 
      return <ThisIsYou/>;
    if(user.isFriend)
      return <SocialLinkIcons socialLinkData={user.socialLinks}/>;
    if(user.isPendingFriend)
      return <PendingFriend/>

    return <FriendRequester/>
  })();

  return (
    <ListItem secondaryAction={showAction ? secondaryAction : null}>
      <ListItemAvatar>
        <UserAvatar/>
      </ListItemAvatar>
      <ListItemText
        primary={user.firstName + " " + user.lastName}
        secondary={blurb}
        sx={{maxWidth: '200px'}}
      />
    </ListItem>
  )
}

export default UserItem