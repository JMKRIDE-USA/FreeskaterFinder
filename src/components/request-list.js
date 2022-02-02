import React from 'react';

import { ListItemAvatar, ListItemText, ListItem, List, Divider } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { invalidateJFHCache } from '@jeffdude/frontend-helpers';

import UserAvatar from '../components/user-avatar';
import { useAcceptFriendRequest } from '../hooks/friends';
import useMakeLoadingButton from '../hooks/loading-button';
import { maxBlurbLength } from '../constants';


function RequestItem({request}){
  const { from: user } = request;

  let blurb = user.bio ? user.bio.substring(0, maxBlurbLength) : ''
  if(blurb.length > maxBlurbLength) {
    blurb += "..."
  }

  const acceptRequest = useAcceptFriendRequest(request._id);

  const { onClick, render } = useMakeLoadingButton({
    doAction: () => acceptRequest(),
    buttonText: "Accept",
    icon: <PersonAddIcon/>,
    isFormButton: false,
    thenFn: invalidateJFHCache,
  })

  return (
    <ListItem secondaryAction={render({onClick, sx: {minWidth: undefined, maxWidth: undefined}})}>
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
        <>
          <RequestItem request={request} key={index}/>
          {index + 1 < requests.length && <Divider variant="inset" component="li"/>}
        </>
      ))}
    </List>
  )
}

export default RequestList;