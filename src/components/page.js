import React from 'react';

import { Container, Grid } from '@mui/material'

function Page({children}) {
  return (
    <Container disableGutters sx={{p: 0, m:0, spacing: 0, minWidth: '100%'}}>
      <Grid container alignItems="center" direction="column">
        {children}
      </Grid>
    </Container>
  )
}

export default Page;