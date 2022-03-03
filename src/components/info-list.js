import React from 'react';

import { List, ListItem, Typography } from '@mui/material';

export function InfoList({object, sx, noStringify}){
  return (
    <List sx={{maxWidth: '100%', ...sx}}>
      { Object.entries(object).map(([key, value]) => (
        <ListItem dense key={key} sx={{alignItems: 'flex-start'}}>
          <Typography variant="body1" sx={{overflowWrap: 'break-word', maxWidth: '100%'}}>
            <b>{key}</b>:
            {noStringify ? value : JSON.stringify( value )}
          </Typography>
        </ListItem>
      ))}
    </List>
  )
}

export default InfoList;