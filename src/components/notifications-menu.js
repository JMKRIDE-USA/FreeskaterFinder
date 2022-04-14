import React, { useState } from 'react';

import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link as MuiLink, Badge, IconButton, Menu, List, ListItemButton, ListItemText, ListItemAvatar, ListItem, Grid } from '@mui/material';
import { useGetAccessToken, QueryLoader, useGetUserInfo } from '@jeffdude/frontend-helpers';
import { Link } from 'react-router-dom';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

import { useGetUserNotifications, useReadNotification, useReadAllNotifications } from '../hooks/notifications';
import { notificationReasons } from '../constants';
import UserAvatar from './user-avatar';


function NotificationItem({notification, closeMenu, divider}){
  /*
  //TODO
  challengeStatusChanged: 'CHALLENGE_STATUS_CHANGED',
  referralCodeUsed: 'REFERRAL_CODE_USED'
  */
  const userInfo = useGetUserInfo();
  const { actor, payload } = notification;
  const markRead = useReadNotification(notification._id)

  const makeFriendNotificationItem = ({action, seeMore}) => {
    return (
      <ListItemButton component={Link} to="/friends" onClick={() => {closeMenu(); markRead();}} divider={divider}>
        <ListItemAvatar>
          <UserAvatar user={actor}/>
        </ListItemAvatar>
        <ListItemText
          primary={actor.firstName + " " + action}
          secondary={"Click to " + seeMore}
          sx={{maxWidth: '80%'}}
        />
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
    case (notificationReasons.challengeStatusChanged):
      return (
        <ListItemButton
          component={Link}
          to={"/submission/" + payload}
          onClick={() => {closeMenu(); markRead();}}
          divider={divider}
        >
          <ListItemAvatar>
            <UserAvatar user={userInfo}/>
          </ListItemAvatar>
          <ListItemText
            primary="Your submission's status has changed."
            secondary="Click to see more."
          />
        </ListItemButton>
      )
    case (notificationReasons.referralCodeUsed):
      return (
        <ListItemButton
          component={Link}
          to={"/referral-code/" + payload}
          onClick={() => {closeMenu(); markRead();}}
          divider={divider}
        >
          <ListItemAvatar>
            <UserAvatar user={userInfo}/>
          </ListItemAvatar>
          <ListItemText
            primary="You have a new referral code usage!"
            secondary="Click to view details."
          />
        </ListItemButton>
      )
    default:
      throw new Error("Unkown Notification Type Detected")
  }
}

function LoadedNotificationsMenu({notifications}) {
  const [ anchorEl, setAnchorEl ] = useState(null);
  const clearAllNotifications = useReadAllNotifications() 

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <IconButton onClick={handleOpen} sx={{mr: 2}}>
        <Badge badgeContent={notifications.length} invisible={!notifications.length} color="error">
          <NotificationsIcon color="neutral"/>
        </Badge>
      </IconButton>
      <Menu
        id="menu-notifications" keepMounted 
        anchorEl={anchorEl}
        open={!!anchorEl} onClose={handleClose}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
        PaperProps={{style: {width: 'min(80vw, 400px)'}}}
      >
        <List>
          {notifications.length
            ? notifications.map((notification, index) => (
              <NotificationItem
                key={index}
                notification={notification}
                closeMenu={handleClose}
                divider={index + 1 !== notifications.length}
              />
            ))
            : <ListItem>
              <ListItemAvatar sx={{ml: 2}}>
                <InsertEmoticonIcon/>
              </ListItemAvatar>
              <ListItemText
                primary={"Nothing to see here."}
                secondary={"Check back later to view notifications."}
              />
            </ListItem>
          }
        </List>
        {notifications.length
          ? <Grid container direction="row" sx={{justifyContent: "center"}}>
            <MuiLink onClick={() => clearAllNotifications()} variant="button">Clear All</MuiLink>
          </Grid>
          : <div/>
        }
      </Menu>
    </>
  )
}

function NotificationsMenu(){
  const accessToken = useGetAccessToken();
  if(accessToken) {
    return (
      <QueryLoader query={useGetUserNotifications} propName="notifications" generateQuery>
        <LoadedNotificationsMenu/>
      </QueryLoader>
    )
  }
  return <div/>
}

export default NotificationsMenu;