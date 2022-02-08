import React from 'react';

import { Grid, Switch as MUISwitch, Typography } from '@mui/material';

import useMakeLoadingButton from '../../hooks/loading-button';


const Switch = ({checked, caption, doAction, preProcessData}) => {
  const { loading, submissionResult, onClick, render : renderIcon } = useMakeLoadingButton({
    doAction, preProcessData,
    iconButton: true,
    isFormButton: false,
  })

  return <Grid container direction="column" sx={{alignItems: 'center'}}>
    { (!!loading || submissionResult !== undefined)
      ? renderIcon({disabled: true})
      : <>
        <MUISwitch checked={checked} onChange={onClick}/>
        <Typography variant="caption">{caption}</Typography>
      </>
    }
  </Grid>
}

export default Switch;