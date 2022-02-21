import React from 'react';

import { List, ListItem } from '@mui/material';

export function InfoList({object, sx}){
  return (
    <List sx={{maxWidth: '100%', textOverflow: 'ellipses', ...sx}}>
      { Object.entries(object).map(([key, value]) => (
        <ListItem dense key={key}>
          <b>{key}</b>: {JSON.stringify( value )}
        </ListItem>
      ))}
    </List>
  )
}

export default InfoList;