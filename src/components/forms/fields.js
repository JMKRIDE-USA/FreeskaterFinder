import React from 'react';

import TextField from '@mui/material/TextField';


export const makeTextField = ({key, label, validation}) => ({register, errors}) => (
  <TextField label={label} margin="normal" inputProps={
      register(key, validation)
    } error={!!errors[key]} helperText={errors[key]?.message}
  />
)