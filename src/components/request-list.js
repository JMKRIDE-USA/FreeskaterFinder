import React from 'react';

import { ListItemAvatar, ListItemText, ListItem, List, Divider, ButtonGroup } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CancelIcon from '@mui/icons-material/Cancel';
import { invalidateJFHCache } from '@jeffdude/frontend-helpers';

import UserAvatar from '../components/user-avatar';
import { useAcceptFriendRequest, useIgnoreFriendRequest } from '../hooks/friends';
import useMakeLoadingButton from '../hooks/loading-button';
import { maxBlurbLength } from '../constants';


function RequestItem({request}){
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
    <ListItem secondaryAction={
      <ButtonGroup variant="outline"> 
        {renderAcceptButton({onClick: onClickAccept, sx: {minWidth: undefined, maxWidth: undefined}, variant: "outlined"})}
        {renderIgnoreButton({onClick: onClickIgnore, sx: {minWidth: undefined, maxWidth: undefined}, variant: "outlined"})}
      </ButtonGroup> 
    }>
      <ListItemAvatar>
        <UserAvatar user={user}/>
      </ListItemAvatar>
      <ListItemText
        primary={<><b>{user.firstName + " " + user.lastName}</b>{" - \"" + request.memo + "\""}</>}
        secondary={blurb}
        sx={{maxWidth: '200px'}}
      />
    </ListItem>
  )
}

function RequestList({requests}){
  return (
    <List sx={{width: '100%'}}>
      {requests.map(( request, index ) => (
        <React.Fragment key={index}>
          <RequestItem request={request} key={index}/>
          {index + 1 < requests.length && <Divider variant="inset" component="li"/>}
        </React.Fragment>
      ))}
    </List>
  )
}

export default RequestList;