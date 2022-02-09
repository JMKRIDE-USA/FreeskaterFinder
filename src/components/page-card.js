import React from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';


const HeaderRow = ({sx = {}, children, ...props}) => (
  <Grid container direction="row" sx={{...{alignItems: "center", width: '100%', justifyContent: "space-between"}, ...sx}} {...props}>
    {children}
  </Grid>
)

const HeaderColumn = ({sx = {}, children, ...props}) => (
  <Grid container direction="column" sx={{...{alignItems: "center", width: '100%'}, ...sx}} {...props}>
    {children}
  </Grid>
)

const PageCard = ({children, header, headerRow = false, small = false, sx, ...props}) => {
  const HeaderContainer = headerRow ? HeaderRow : HeaderColumn;
  return (
    <Paper elevation={4} sx={{...{
      p:2, minWidth: (small ? {xs: '95vw', md: '300px'} : {xs: '95vw', md: '600px'}),
      maxWidth: '95vw',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    }, ...sx}} {...props}>
      {header && 
        <>
          <HeaderContainer>
            {header}
          </HeaderContainer>
          <Divider variant="middle" sx={{width: '100%', mt: 1, mb: 2}}/>
        </>
      }
      {children}
    </Paper>
  )
}
export default PageCard;