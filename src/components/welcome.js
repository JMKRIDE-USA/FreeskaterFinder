import React from 'react';

import { Link } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import MuiLink from '@mui/material/Link';


function WelcomeDialog({open, onClose}){
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Welcome to the JMKRIDE Freeskater Finder!
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please read and abide by <MuiLink component={Link} to="/rules">the rules</MuiLink>.<br/>
          Before meeting up with anyone IRL, please read and follow the <MuiLink component={Link} to="/safety">Safety Suggestions</MuiLink>.<br/>
        </DialogContentText>
        <DialogActions>
          <Button onClick={onClose}>I Agree</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default WelcomeDialog;