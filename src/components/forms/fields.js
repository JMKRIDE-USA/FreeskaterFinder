import React from 'react';

import TextField from '@mui/material/TextField';


export const makeTextField = ({key, label, validation, sx={}}) => ({register, errors}) => (
  <TextField label={label} margin="normal" sx={{...{minWidth: {xs: '80vw', md: '400px'}}, ...sx}} inputProps={
      register(key, validation)
    } error={!!errors[key]} helperText={errors[key]?.message}
  />
)