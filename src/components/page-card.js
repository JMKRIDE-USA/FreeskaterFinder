import React from 'react';
import Paper from '@mui/material/Paper';

const PageCard = ({children, sx, ...props}) => (
  <Paper elevation={4} sx={{...{p:2, width: {xs: '95vw', md: '500px'}}, ...sx}} {...props}>
    {children}
  </Paper>
)
export default PageCard;