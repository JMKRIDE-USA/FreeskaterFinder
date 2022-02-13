import React, { useEffect, useState } from 'react';

import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, IconButton, Menu, List, ListItemButton, ListItemText, ListItemAvatar, ListItem, Divider, ListItemSecondaryAction } from '@mui/material';
import { useGetAuthState, QueryLoader } from '@jeffdude/frontend-helpers';
import { Link } from 'react-router-dom';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import CancelIcon from '@mui/icons-material/Cancel';

import { useGetUserNotifications, useReadNotification } from '../hooks/notifications';
import { notificationReasons } from '../constants';
import UserAvatar from './user-avatar';


function NotificationItem({notification, closeMenu}){
  /*
  //TODO
  challengeStatusChanged: 'CHALLENGE_STATUS_CHANGED',
  referralCodeUsed: 'REFERRAL_CODE_USED'
          import { Link as MuiLink } from '@mui/material';
          <MuiLink variant="caption" onClick={markRead}>Mark As Read</MuiLink>
  */
  const { actor } = notification;
  const markRead = useReadNotification(notification._id)

  const makeFriendNotificationItem = ({action, seeMore}) => {
    return (
      <ListItemButton component={Link} to="/friends" onClick={() => {closeMenu(); markRead();}}>
        <ListItemAvatar>
          <UserAvatar user={actor}/>
        </ListItemAvatar>
        <ListItemText
          primary={actor.firstName + " " + action}
          secondary={"Click to " + seeMore}
          sx={{maxWidth: '80%'}}
        />
        <ListItemSecondaryAction>
          <IconButton onClick={() => markRead()}>
            <CancelIcon/> 
          </IconButton>
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

function LoadedNotificationsMenu({notifications, refetch}) {
  const [ anchorEl, setAnchorEl ] = useState(null);
  const [refreshSwitch, setRefreshSwitch] = useState(true);
  const refreshSelf = () => setRefreshSwitch(!refreshSwitch);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null)
    refetch();
    refreshSelf();
  }
  const [ unread, setUnread ] = useState([])
  useEffect(() => setUnread(notifications.filter(notification => !notification.seen)), [notifications, refreshSwitch])

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
        PaperProps={{style: {width: 'min(80vw, 400px)'}}}
      >
        <List>
          {unread.length
            ? unread.map((notification, index) => {
              return <>
                <NotificationItem notification={notification} key={index} closeMenu={handleClose}/>
                {index + 1 !== unread.length && <Divider variant="inset" component="li"/>}
              </>
            })
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
      </Menu>
    </>
  )
}

function NotificationsMenuLoader(){
  const notificationsQuery = useGetUserNotifications()
  return <QueryLoader query={notificationsQuery} propName="notifications">
    <LoadedNotificationsMenu refetch={notificationsQuery.refetch}/>
  </QueryLoader>
}

function NotificationsMenu(){
  const authState = useGetAuthState();
  if(authState) return <NotificationsMenuLoader/>
  return <div/>
}

export default NotificationsMenu;