import React from 'react';

import { Grid, ListItem, ListItemText, ListItemAvatar, Button, TextField, IconButton, ButtonGroup } from '@mui/material';
import { useGetUserInfo, invalidateJFHCache } from '@jeffdude/frontend-helpers';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

import UserAvatar from './user-avatar';
import { maxBlurbLength } from '../constants';
import useMakeLoadingButton from '../hooks/loading-button';
import { useCreateFriendRequest } from '../hooks/friends';

const SocialLinkIcons = ({socialLinkData}) => {
  return <>friends!</>
}

const ThisIsYou = () => <Button aria-label="Go To Profile" endIcon={<ManageAccountsIcon/>} component={Link} to="/my-account">Manage Account</Button>

const FriendRequestForm = ({user, setClicked}) => {
  const createFriendRequest = useCreateFriendRequest();

  const { handleSubmit, register, reset } = useForm({defaultValues: {memo: ''}})
  const { render : renderSubmit, onClick } = useMakeLoadingButton({
    doAction: (data) => createFriendRequest({toUserId: user._id, ...data}),
    iconButton: true,
    icon: <CheckIcon/>,
    color: "success",
    thenFn: () => {invalidateJFHCache(); setClicked(false)},
  })

  const onCancel = () => {
    reset()
    setClicked(false);
  }

  return (
    <form onSubmit={handleSubmit(onClick)}>
      <Grid container direction="row" sx={{flexGrow: 1, alignItems: "center", justifyContent: "flex-end", "& > *": {m:1}}}>
        <TextField label="Add a note" inputProps={register('memo')}/>
        <ButtonGroup>
          { renderSubmit() }
          <IconButton aria-label="cancel" onClick={onCancel} color="primary"><CancelIcon/></IconButton>
        </ButtonGroup>
      </Grid>
    </form>
  )
}
const FriendRequester = ({user}) => {
  const [clicked, setClicked] = React.useState(false);
  if(clicked) return <FriendRequestForm setClicked={setClicked} user={user}/>
  return <Button aria-label="Friend Request" endIcon={<PersonAddIcon/>} onClick={() => setClicked(true)}>Add Friend</Button>
}

const OutgoingPendingFriend = () => <>pending</>

const IncomingPendingFriend = () => <>incoming pending</>

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
    if(user.incomingPendingFriend)
      return <IncomingPendingFriend/>
    if(user.outgoingPendingFriend)
      return <OutgoingPendingFriend/>

    return <FriendRequester key={user._id} user={user}/>
  })();

  return (
    <ListItem secondaryAction={showAction ? secondaryAction : null}>
      <ListItemAvatar>
        <UserAvatar user={user}/>
      </ListItemAvatar>
      <ListItemText
        primary={user.firstName + " " + user.lastName}
        secondary={blurb}
        sx={{maxWidth: '200px'}}
      />
    </ListItem>
  )
}

export default UserItem;