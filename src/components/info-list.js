import React from 'react';

import { List, ListItem } from '@mui/material';

export function InfoList({object, sx, noStringify}){
  return (
    <List sx={{maxWidth: '100%', textOverflow: 'ellipses', ...sx}}>
      { Object.entries(object).map(([key, value]) => (
        <ListItem dense key={key} sx={{alignItems: 'flex-start'}}>
          <b>{key}</b>: {noStringify ? value : JSON.stringify( value )}
        </ListItem>
      ))}
    </List>
  )
}

export default InfoList;