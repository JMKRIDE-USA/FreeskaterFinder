import React from 'react';

import { Grid, ListItemAvatar, ListItemText, ListItem, List, Link as MuiLink, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CancelIcon from '@mui/icons-material/Cancel';
import { invalidateJFHCache } from '@jeffdude/frontend-helpers';

import UserAvatar from '../components/user-avatar';
import { useAcceptFriendRequest, useIgnoreFriendRequest } from '../hooks/friends';
import useMakeLoadingButton from '../hooks/loading-button';
import { maxBlurbLength } from '../constants';


function RequestItem({request, divider}){
  const { from: user } = request;

  let blurb = user.bio ? user.bio.substring(0, maxBlurbLength) : ''
  if(blurb.length > maxBlurbLength) {
    blurb += "..."
  }

  const acceptRequest = useAcceptFriendRequest(request._id);
  const ignoreRequest = useIgnoreFriendRequest(request._id);

  const { onClick : onClickAccept, render : renderAcceptButton } = useMakeLoadingButton({
    doAction: () => acceptRequest(),
    buttonText: "Accept",
    icon: <PersonAddIcon/>,
    isFormButton: false,
    thenFn: invalidateJFHCache,
  })
  const { onClick : onClickIgnore, render : renderIgnoreButton } = useMakeLoadingButton({
    doAction: () => ignoreRequest(),
    buttonText: "Ignore",
    icon: <CancelIcon/>,
    isFormButton: false,
    thenFn: invalidateJFHCache,
  })

  return (
    <ListItem divider={divider}>
      <ListItemAvatar>
        <UserAvatar user={user}/>
      </ListItemAvatar>
      <ListItemText
        primary={<><b>{user.firstName + " " + user.lastName}</b>{" - \"" + request.memo + "\""}</>}
        secondary={blurb}
        sx={{maxWidth: '80vw', flexGrow: 1}}
      />
      <MuiLink component={Link} to={"/location/" + user.location._id} sx={{ml: 2, flexGrow: 1}}>{user.location.zip}, {user.location.country}</MuiLink>
      <>
        <ButtonGroup variant="outline" sx={{ml: 2, display: {xs: 'none', md: 'flex'}}}> 
          {renderAcceptButton({onClick: onClickAccept, sx: {minWidth: undefined, maxWidth: undefined}, variant: "outlined"})}
          {renderIgnoreButton({onClick: onClickIgnore, sx: {minWidth: undefined, maxWidth: undefined}, variant: "outlined"})}
        </ButtonGroup> 
        <Grid container direction="row" sx={{maxWidth: '25vw', "&>*": {xs: 'auto'}, display: {xs: 'flex', md: 'none'}}}> 
          {renderAcceptButton({onClick: onClickAccept, sx: {minWidth: undefined, maxWidth: undefined}, variant: "outlined"})}
          {renderIgnoreButton({onClick: onClickIgnore, sx: {minWidth: undefined, maxWidth: undefined}, variant: "outlined"})}
        </Grid> 
      </>
    </ListItem>
  )
}

function RequestList({requests}){
  return (
    <List sx={{width: '100%'}}>
      {requests.map(( request, index ) => (
        <RequestItem request={request} key={index} divider={index + 1 < requests.length}/>
      ))}
    </List>
  )
}

export default RequestList;