import React, { useState } from 'react';

import { useTheme, Badge, Grid, ListItem, ListItemAvatar, Button, TextField, IconButton, ButtonGroup, Typography, Link as MuiLink } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
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
import { maxBlurbLength } from '../constants';
import useMakeLoadingButton from '../hooks/loading-button';
import { useCreateFriendRequest } from '../hooks/friends';
import { useGetAuthState } from '@jeffdude/frontend-helpers/dist/hooks/auth';
import { getSocialLinkObject } from '../modules/links';


const SocialLinkIcons = ({socialLinkData}) => {
  const socialLinkObject = getSocialLinkObject(socialLinkData);
  return <Grid item container direction="row" xs='auto' sx={{alignItems: 'center', justifyContent: {xs: 'flex-start', sm: 'flex-end'}}}>
    {Object.values(socialLinkObject).map((socialLink, key) => socialLink.getIcon({key}))}
  </Grid>
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
        <TextField label="Add a note" inputProps={{autoComplete: "off", ...register('memo')}}/>
        <ButtonGroup>
          { renderSubmit({key: user._id}) }
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
    key: user._id,
    variant: "text", 
    endIcon: <PersonAddIcon/>,
  })
}

const FriendRequester = ({user}) => {
  const [clicked, setClicked] = React.useState(false);
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
  return <Button startIcon={<PersonAddIcon/>} component={Link} to="/friends">Review Request</Button>
}

const UserBio = ({bio}) => {
  const [expanded, setExpanded] = useState(!(bio && bio.length > maxBlurbLength))
  const bioText = bio
    ? bio.length > maxBlurbLength 
    ? expanded
    ? bio
    : bio.substring(0, maxBlurbLength) + "..."
    : bio
    : ''

  return (
    <>
      <Typography variant="body2" sx={{maxWidth: 'min(50vw, 350px)'}}>{bioText}</Typography>
      {!expanded && <MuiLink variant="body2" onClick={() => setExpanded(true)}>See more</MuiLink>}
    </>
  )
}

const UserItem = ({user, showLocation = false, action, showSocials = false, editableAvatar = false, sx={}, divider = false, children}) => {
  const adminView = useGetAuthState() === 500;
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('sm'));

  const isAmbassador = user.permissionLevel === "ambassador" || user?.isAmbassador
  const userInfo = useGetUserInfo();
  const secondaryAction = (() => {
    if(action) return action
    if(user.isFriend || showSocials)
      return <SocialLinkIcons socialLinkData={user.socialLinks}/>;
    if(userInfo.id === user.id) 
      return <ThisIsYou/>;
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
  
  const skaterSinceToString = (dateString) => {
    const date = new Date(dateString);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
      "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return monthNames[date.getMonth()] + " " + date.getFullYear();
  }
            // {user?.skaterSince && <Typography variant="caption" sx={{ml: 2}} xs='auto'>Freeskater since {skaterSinceToString(user.skaterSince)}</Typography>}
  return (
    <ListItem sx={{padding: 'min(10px, 2vh) min(5px, 2vw)', minWidth: 'min(80vw, 400px)', ...sx}} divider={divider}>
      <ListItemAvatar sx={{pl: 0}}>
        <AmbassadorBadge>
          <UserAvatar user={user} editable={editableAvatar}/>
        </AmbassadorBadge>
      </ListItemAvatar>
      <Grid container direction="column" sx={{width: '100%'}}>
        <Grid item container direction="row" sx={{width: '100%', justifyContent: 'space-between', alignItems: 'center', '&>*': {xs: 'auto'} }}>
          <Grid item container direction="column" xs='auto'>
            <Typography variant="body1" xs='auto'>{
              <>
                <b>{user.firstName + " " + user.lastName}</b>
                {isAmbassador && <>{" - "} Ambassador</>}
                {user?.skaterSince && <Typography variant="caption">{" - Skater Since " + skaterSinceToString(user.skaterSince)}</Typography>}
              </>
            }</Typography>
            <UserBio bio={user?.bio} key={user._id}/>
          </Grid>
          {adminView && <MuiLink component={Link} to={"/user/" + user._id}>View</MuiLink>}
          <Grid item container direction="column" xs='auto' sx={{alignItems: isMd ? 'flex-end' : 'flex-start'}}>
            {showLocation && <MuiLink component={Link} to={"/location/" + user.location._id}>{user.location.zip}, {user.location.country}</MuiLink>}
            {secondaryAction}
          </Grid>
        </Grid>
        {children}
      </Grid>
    </ListItem>
  )
}

export default UserItem;