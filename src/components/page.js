import React from 'react';

import { Container, Grid } from '@mui/material'

import { bodyHeight } from '../constants';

      // ...(fullscreen ? {height: '100vh'} : {}),
function Page({sx = {}, fullscreen = false, children}) {
  return (
    <Container disableGutters sx={{
      ...{p: 0, m:0, spacing: 0, minWidth: '100%'},
       ...(fullscreen ? {height: bodyHeight} : {}), 
      ...sx,
    }}>
      <Grid container alignItems="center" direction="column">
        {children}
      </Grid>
    </Container>
  )
}

export default Page;