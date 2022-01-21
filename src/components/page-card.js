import React from 'react';
import Paper from '@mui/material/Paper';

const PageCard = ({children, sx, ...props}) => (
  <Paper elevation={4} sx={{...{
    p:2, minWidth: {xs: '95vw', md: '600px'},
    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
  }, ...sx}} {...props}>
    {children}
  </Paper>
)
export default PageCard;