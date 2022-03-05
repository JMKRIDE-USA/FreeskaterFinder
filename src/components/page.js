import React from 'react';

import { Container, Grid } from '@mui/material'

import { useGetBodyHeight } from '../modules/window-context';

function Page({sx = {}, gridStyle = {}, absoluteChildren = null, fullscreen = false, children}) {
  const bodyHeight = useGetBodyHeight();
  return (
    <Container disableGutters sx={{
      ...{p: 0, m:0, spacing: 0, minWidth: '100%'},
       ...(fullscreen ? {height: bodyHeight} : {}), 
      ...sx,
    }}>
      {absoluteChildren}
      <Grid container sx={{...{alignItems: "center", flexDirection: "column"}, ...gridStyle}}>
        {children}
      </Grid>
    </Container>
  )
}

export default Page;