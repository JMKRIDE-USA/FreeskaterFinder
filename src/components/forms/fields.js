import React from 'react';

import { Controller } from 'react-hook-form';
import Select from 'react-select';
import DatePicker from 'react-datepicker';

import TextField from '@mui/material/TextField';
import { Grid, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import "react-datepicker/dist/react-datepicker.css";
import "./react-datepicker-overrides.css";


export const makeTextField = ({key, label, validation, sx={}, password=false}) => ({register, errors}) => (
  <TextField label={label} margin="normal" sx={{...{minWidth: {xs: '80vw', md: '400px'}}, ...sx}} inputProps={
      register(key, validation)
    } error={!!errors[key]} helperText={errors[key]?.message} {...password ? {type: "password"} : {multiline: true}}
  />
)

export const makeMonthPickerField = ({key, label, validation, sx={}}) => ({control, errors}) => (
  <Controller name={key} control={control} rules={validation}
    render={(props) => (
      <Grid container direction="row" sx={{alignItems: 'center', justifyContent: "space-around", ...sx}}>
        <Typography variant="body1" sx={{color: errors[key] ? "#f00" : "#666666"}} xs='auto'>{label}</Typography>
        <Grid item container direction="column" sx={{alignItems: 'center', justifyContent: 'center'}} xs='auto'>
          <DatePicker selected={props.field.value} dateFormat="MM/yyyy" showMonthYearPicker onChange={props.field.onChange}/>
          {errors[key]?.message && <Typography variant="body2" color="error">{errors[key].message}</Typography>}
        </Grid>
      </Grid>
    )}
  />
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

export const makeSelectField = ({key, label, options, validation, sx={}}) => ({control, errors}) => (
  <Controller name={key} control={control} rules={validation}
    render={({field : {ref, value, onChange}}) => (
      <Grid container direction="row" sx={{alignItems: 'center', justifyContent: "space-around"}}>
        <Typography variant="body1" sx={{color: errors[key] ? "#f00" : "#666666"}}>{label}:</Typography>
        <div style={{flexGrow: 1, marginLeft: '20px'}}>
          <Select inputRef={ref} isSearchable
            value={value ? options.find(c => c.value === value) : null}
            onChange={val => onChange(val.value)}
            options={options}
            styles={{control: (base, _) => ({...base, background: "#f3f3f3"})}}
          />
        </div>
      </Grid>
    )}
  />
)