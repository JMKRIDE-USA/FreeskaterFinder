import React, { useState } from 'react';

import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, IconButton, Menu, List, ListItemButton, ListItemText, ListItemAvatar, ListItem, Divider, ListItemSecondaryAction } from '@mui/material';
import { Link as MuiLink } from '@mui/material';
import { useGetAuthState, QueryLoader } from '@jeffdude/frontend-helpers';
import { Link } from 'react-router-dom';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

import { useGetUserNotifications, useReadNotification } from '../hooks/notifications';
import { notificationReasons } from '../constants';
import UserAvatar from './user-avatar';


function NotificationItem({notification}){
  /*
  //TODO
  challengeStatusChanged: 'CHALLENGE_STATUS_CHANGED',
  referralCodeUsed: 'REFERRAL_CODE_USED'
  */
  const { actor } = notification;
  const markRead = useReadNotification(notification._id)

  const makeFriendNotificationItem = ({action, seeMore}) => {
    return (
      <ListItemButton component={Link} to="/friends">
        <ListItemAvatar>
          <UserAvatar user={actor}/>
        </ListItemAvatar>
        <ListItemText
          primary={actor.firstName + " " + action}
          secondary={"Click to " + seeMore}
          sx={{maxWidth: '60%'}}
        />
        <ListItemSecondaryAction sx={{maxWidth: '40%'}}>
          <MuiLink onClick={() => markRead()}>Mark As Read</MuiLink>
        </ListItemSecondaryAction>
      </ListItemButton>
    )
  }

  switch (notification.reason) {
    case (notificationReasons.friendRequestCreated):
      return makeFriendNotificationItem({
        action: "would like to be your friend.",
        seeMore: "approve or deny."
      });
    case (notificationReasons.friendAdded):
      return makeFriendNotificationItem({
        action: "is now your friend!",
        seeMore: "see more."
      });
    default:
      throw new Error("Unkown Notification Type Detected")
  }
}

function LoadedNotificationsMenu({notifications}) {
  console.log({notifications})

  const [ anchorEl, setAnchorEl ] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = (event) => {
    setAnchorEl(null)
  }

  const unread = notifications.filter(notification => !notification.read)

  return (
    <>
      <IconButton onClick={handleOpen} sx={{mr: 2}}>
        <Badge badgeContent={unread.length} invisible={!unread.length} color="error">
          <NotificationsIcon color="neutral"/>
        </Badge>
      </IconButton>
      <Menu
        id="menu-notifications" keepMounted 
        anchorEl={anchorEl}
        open={!!anchorEl} onClose={handleClose}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
        PaperProps={{style: {width: 'min(80vw, 450px)'}}}
      >
        <List>
          {notifications.length
            ? notifications.filter(notification => !notification.read).map((notification, index) => {
              return <>
                <NotificationItem notification={notification} key={index}/>
                {index + 1 !== notifications.length && <Divider variant="inset" component="li"/>}
              </>
            })
            : <ListItem>
              <ListItemAvatar>
                <InsertEmoticonIcon/>
              </ListItemAvatar>
              <ListItemText
                primary={"Nothing to see here."}
                secondary={"Check back later to view notifications."}
              />
            </ListItem>
          }
        </List>
      </Menu>
    </>
  )
}

function NotificationsMenuLoader(){
  const notificationsQuery = useGetUserNotifications()
  return <QueryLoader query={notificationsQuery} propName="notifications">
    <LoadedNotificationsMenu/>
  </QueryLoader>
}

function NotificationsMenu(){
  const authState = useGetAuthState();
  if(authState) return <NotificationsMenuLoader/>
  return <div/>
}

export default NotificationsMenu;