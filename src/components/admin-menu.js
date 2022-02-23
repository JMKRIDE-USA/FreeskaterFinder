import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { Button, Menu, List, ListItemButton } from '@mui/material'
import { useGetAuthState } from '@jeffdude/frontend-helpers';


function AdminMenu(){
  const [ anchorEl, setAnchorEl ] = useState(null);
  const navigate = useNavigate();
  const authState = useGetAuthState();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  if(authState < 500) return <></>
  return <>
    <Button onClick={handleOpen} sx={{color: "white"}}>
      Admin
    </Button>
    <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}
      anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
      transformOrigin={{vertical: 'top', horizontal: 'left'}}
    >
      <List>
        {Object.entries({
          Dashboard: "/admin",
          Submissions: "/submissions",
          Users: "/users",
          Transactions: "/transactions",
          "Referral Codes": "/referral-codes",
        }).map(([key, value]) => (
          <ListItemButton key={key} onClick={() => {navigate(value); handleClose()}}>{ key }</ListItemButton>
        ))}
          
      </List>
    </Menu>
  </>
}

export default AdminMenu;