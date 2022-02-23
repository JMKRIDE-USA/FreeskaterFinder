import React from 'react';

import { Badge, Grid, ListItem, ListItemText, ListItemAvatar, Button, TextField, IconButton, ButtonGroup, Typography, Link as MuiLink } from '@mui/material';
import { useGetUserInfo, invalidateJFHCache } from '@jeffdude/frontend-helpers';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import StarIcon from '@mui/icons-material/Star';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';

import UserAvatar from './user-avatar';
import { getSocialLinkTypeByName, maxBlurbLength } from '../constants';
import useMakeLoadingButton from '../hooks/loading-button';
import { useCreateFriendRequest } from '../hooks/friends';
import { useGetAuthState } from '@jeffdude/frontend-helpers/dist/hooks/auth';


const SocialLinkIcons = ({socialLinkData}) => {
  return <ButtonGroup>
    {socialLinkData.map(({link, type}, index) => {
      const Icon = getSocialLinkTypeByName(type)?.icon;
      return <IconButton key={index} href={link} target="_blank" color="primary"><Icon/></IconButton>
    })}
  </ButtonGroup>
}

const ThisIsYou = () => <Button aria-label="Go To Profile" endIcon={<ManageAccountsIcon/>} component={Link} to="/my-account">Manage Account</Button>

const FriendRequestForm = ({user, setClicked}) => {
  const createFriendRequest = useCreateFriendRequest();

  const { handleSubmit, register, reset } = useForm({defaultValues: {memo: ''}})
  const { render : renderSubmit, onClick } = useMakeLoadingButton({
    doAction: (data) => createFriendRequest({toUserId: user._id, ...data}),
    iconButton: true,
    icon: <CheckIcon/>,
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

const ConfirmAddFriend = ({user, setClicked}) => {
  const createFriendRequest = useCreateFriendRequest();
  const { render } = useMakeLoadingButton({
    doAction: () => createFriendRequest({toUserId: user._id}),
    buttonText: "Confirm?",
    isFormButton: false,
    thenFn: () => {invalidateJFHCache(); setClicked(false)},
  })
  return render({
    variant: "text", 
    endIcon: <PersonAddIcon/>,
  })
}

const FriendRequester = ({user}) => {
  const [clicked, setClicked] = React.useState(false);
  if(user.isPublic) console.log({user});
  if(clicked){
    if(user.isPublic) {
      return <ConfirmAddFriend setClicked={setClicked} user={user}/>
    } else {
      return <FriendRequestForm setClicked={setClicked} user={user}/>
    }
  }
  return <Button aria-label="Friend Request" endIcon={<PersonAddIcon/>} onClick={() => setClicked(true)}>Add Friend</Button>
}

const OutgoingPendingFriend = () => <Grid container direction="column" sx={{alignItems: "center"}}><PendingIcon/><Typography variant="body2">Requested</Typography></Grid>

const IncomingPendingFriend = () => {
  return <Button startIcon={<PersonAddIcon/>} component={Link} to="/friends">Approve Friend</Button>
}

const UserItem = ({user, showLocation = false, showAction = true, editableAvatar = false, sx={}, divider = false}) => {
  const adminView = useGetAuthState() === 500;

  let blurb = user.bio ? user.bio.substring(0, maxBlurbLength) : ''
  if(blurb.length > maxBlurbLength) {
    blurb += "..."
  }
  const isAmbassador = user.permissionLevel === "ambassador" || user?.isAmbassador
  const userInfo = useGetUserInfo();
  const secondaryAction = (() => {
    if(!showAction) return <></>
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

  const AmbassadorBadge = isAmbassador
    ? ({children}) => <Badge overlap='circular' badgeContent={
          <StarIcon fontSize='medium' stroke="#000" stroke-width={1} sx={{color: "#fbb03b"}}/>
        }>{children}</Badge>
    : ({children}) => children

  return (
    <ListItem sx={{minWidth: 'min(80vw, 400px)', ...sx}} divider={divider} secondaryAction={secondaryAction}>
      <ListItemAvatar>
        <AmbassadorBadge>
          <UserAvatar user={user} editable={editableAvatar}/>
        </AmbassadorBadge>
      </ListItemAvatar>
      <ListItemText
        primary={<>{isAmbassador && <><b>Ambassador</b> {" - "}</>} {user.firstName + " " + user.lastName}</>}
        secondary={blurb}
        sx={{maxWidth: '200px'}}
      />
      {showLocation && <MuiLink component={Link} to={"/location/" + user.location._id}>{user.location.zip}, {user.location.country}</MuiLink>}
      {adminView && <MuiLink component={Link} to={"/user/" + user._id}>View</MuiLink>}
    </ListItem>
  )
}

export default UserItem;