import React from 'react';

import { Typography } from '@mui/material'

import PageCard from '../page-card';

export function TableCard({length, title, children}){
  return (
    <PageCard headerRow header={<Typography variant="h6">{title}</Typography>} sx={{display: 'flex', height: 'min(70vh, ' + parseInt(300 + 50 * length) + 'px)', width: '100%'}}>
      <div style={{height: '100%', width: '100%', display: 'flex'}}>
        <div style={{flexGrow: 1}}>
          {children}
        </div>
      </div>
    </PageCard>
  )
}