import React from 'react';

import { Grid, ListItemAvatar, ListItemText, ListItem, List, Link as MuiLink, ButtonGroup, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CancelIcon from '@mui/icons-material/Cancel';
import { invalidateJFHCache } from '@jeffdude/frontend-helpers';

import UserAvatar from '../components/user-avatar';
import { useAcceptFriendRequest, useIgnoreFriendRequest } from '../hooks/friends';
import useMakeLoadingButton from '../hooks/loading-button';
import UserItem from './user-item';


function RequestItem({request, divider}){
  const { from: user } = request;

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
    <UserItem user={user} showLocation divider={divider}
      action={<>
        <ButtonGroup variant="outline" sx={{ml: 2, display: {xs: 'none', md: 'flex'}}}> 
          {renderAcceptButton({onClick: onClickAccept, sx: {minWidth: undefined, maxWidth: undefined}, variant: "outlined"})}
          {renderIgnoreButton({onClick: onClickIgnore, sx: {minWidth: undefined, maxWidth: undefined}, variant: "outlined"})}
        </ButtonGroup> 
        <Grid container direction="column" sx={{maxWidth: '25vw', justifyContent: 'flex-end', display: {xs: 'flex', md: 'none'}}}> 
          {renderAcceptButton({onClick: onClickAccept, sx: {minWidth: undefined, maxWidth: undefined}, variant: "outlined"})}
          {renderIgnoreButton({onClick: onClickIgnore, sx: {minWidth: undefined, maxWidth: undefined}, variant: "outlined"})}
        </Grid> 
      </>}
    >
      {request.memo 
        ? <Typography variant="body1" sx={{mt: 2}}>- <i>"{request.memo}"</i></Typography>
        : <div/>
      }
    </UserItem>
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