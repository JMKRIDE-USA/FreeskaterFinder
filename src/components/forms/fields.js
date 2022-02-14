import React from 'react';

import { Controller } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import { DesktopDatePicker, MobileDatePicker } from '@mui/lab' ;
import { Grid, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';


export const makeTextField = ({key, label, validation, sx={}}) => ({register, errors}) => (
  <TextField multiline label={label} margin="normal" sx={{...{minWidth: {xs: '80vw', md: '400px'}}, ...sx}} inputProps={
      register(key, validation)
    } error={!!errors[key]} helperText={errors[key]?.message}
  />
)

// todo error display (datepicker uses 'onError', not error prop)
export const makeDateField = ({key, label, validation, sx={}}) => ({register, errors}) => (
  <>
    <DesktopDatePicker
      sx={{xs: {display: 'none'}, md: {display: 'flex'}, ...sx}}
      inputFormat="MM/dd/yyyy" 
      renderInput={(params) => <TextField {...params} />}
      {...{...register(key, validation), label}}
    />
    <MobileDatePicker
      sx={{xs: {display: 'flex'}, md: {display: 'none'}, ...sx}}
      inputFormat="MM/dd/yyyy" 
      renderInput={(params) => <TextField {...params} />}
      {...{...register(key, validation), label}}
    />
  </>
)

/* NOTE: must supply formatFn: i => i === 'yes' for useMakeForm */
export const makeYesNoField = ({key, label, validation, sx={}}) => ({control, errors}) => (
  <Controller name={key} control={control} rules={validation}
    render={(props) => (
      <Grid container direction="row" sx={{alignItems: 'center', justifyContent: "space-around"}}>
        <Typography variant="body1" sx={{color: errors[key] ? "#f00" : "#666666"}}>{label}</Typography>
        <div>
          <ToggleButtonGroup
            exclusive
            value={props.field.value}
            onChange={(_, value) => {if(value !== null) props.field.onChange(value)}}
            sx={sx}
          >
            <ToggleButton value={'yes'}>Yes</ToggleButton>
            <ToggleButton value={'no'}>No</ToggleButton>
          </ToggleButtonGroup>
          {errors[key]?.message && <Typography variant="body2" color="error">{errors[key].message}</Typography>}
        </div>
      </Grid>
    )}
  />
)