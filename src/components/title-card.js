import React from 'react';
import { Paper, Typography } from '@mui/material'

import titleLogo from '../assets/FreeskaterFinderLogo_WhiteBG.svg';
import titleLogoNoText from '../assets/FreeskaterFinderLogo_WhiteBG_NoText.svg';

function TitleCard({title, children}) {
  return (
    <Paper elevation={5} sx={{p: '20px', m: 1, mb: {xs: 1, md: 3}, mt: {xs: '20px', md: '40px'}, width: {xs: '95vw', md: '600px'}}}>
      <img src={title ? titleLogoNoText : titleLogo} alt="Freeskater Finder Logo" style={{margin: '10px', width: '80%'}}/>
      {title && <Typography variant="h3">{title}</Typography>}
      {children}
    </Paper>
  )
}

export default TitleCard;