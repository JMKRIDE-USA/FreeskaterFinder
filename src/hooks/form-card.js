import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { Grid, Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';

import useMakeLoadingButton from './loading-button';
import PageCard from '../components/page-card';

function useMakeFormCard(
  {actionFn, onSuccess = () => null, stateList, validateData = () => ([]), cardHeader}
){
  let initialState = {}
  stateList.forEach(item => initialState[item.key] = item.initialState)

  const { handleSubmit, formState: {isDirty, errors}, register } = useForm(
    { defaultValues: initialState }
  );
  const [showError, setShowError] = useState(false);
  const [validationErrors, setErrors] = useState([]);

  const closeError = () => {
    setShowError(false);
    setErrors(false);
  }

  const { onClick , render: renderButton } = useMakeLoadingButton({
    doAction: (data) => {
      console.log({ data })
      const vErrors = validateData(JSON.parse(JSON.stringify(data)))
      if(vErrors.length) {
        setErrors(errors)
        setShowError(true)
        return {result: false}
      }
      if(isDirty) return actionFn(data);
      return {result: true}
    },
    preProcessData: (data) => {
      let result = {};
      stateList.forEach(({key, formatFn}) =>
        result[key] = formatFn(data[key])
      )
      console.log({result})
      return result;
    },
    buttonText: "Save",
    thenFn: (result) => {if(result) onSuccess(result)},
  });
  return () => (
    <>
      <form onSubmit={handleSubmit(onClick)}>
        <Grid container direction="column" sx={{p: 1}}>
          {stateList.map(({component}) => component({register, errors}))}
        </Grid>
        {renderButton()}
      </form>
      <Dialog open={showError} onClose={closeError}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <ul>
            {validationErrors && validationErrors.map((error, key) => <li key={key}>{error}</li>)}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default useMakeFormCard;