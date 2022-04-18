import React, { useState } from 'react';

import { TextField, Grid, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useForm } from 'react-hook-form';
import { usePatchUser } from '@jeffdude/frontend-helpers';

import PageCard from '../page-card';
import useMakeLoadingButton from '../../hooks/loading-button';
import { allLinkTypes } from '../../modules/links';


const SocialsPickerCard = ({socialLinkData, onSuccess = () => null}) => {
  const socialLinkObject = {}
  if(socialLinkData) {
    socialLinkData.forEach(({type, link}) => socialLinkObject[type] = new allLinkTypes[type](link)) // populate existing data
  }
  Object.entries(allLinkTypes).forEach(([type, obj]) => { // fill in the rest
    if(!socialLinkObject[type]) socialLinkObject[type] = new obj("");
  });

  const { handleSubmit, formState: {isDirty, errors}, register } = useForm({ defaultValues: Object.assign({}, ...Object.entries(socialLinkObject).map(([key, obj]) => ({[key]: obj.value}))) });
  const patchUser = usePatchUser();
  const [showError, setShowError] = useState(false);
  const { onClick , render: renderButton } = useMakeLoadingButton({
    doAction: (data) => {
      console.log({data})
      if(!data.length) {
        setShowError(true);
        return {result: false};
      }
      if(isDirty) return patchUser({socialLinks: data})
      return {result: true}
    },
    preProcessData: (data) => Object.entries(data).map(([type, link]) => (
      link.length ? {type, link: link.toLowerCase()} : undefined
    )).filter(o => o !== undefined),
    buttonText: "Save",
    thenFn: (result) => {if(result) onSuccess()},
  });
  return (
    <>
      <PageCard header={
        <>
          <Typography variant="h6">How can people contact you?</Typography>
          <Typography variant="subtitle1">Please add at least one social media account.</Typography>
          <Typography variant="subtitle1" sx={{mt: -1}}>Use full URLS e.g. 'https://facebook.com/jmkride'</Typography>
        </>
      }>
        <form onSubmit={handleSubmit(onClick)}>
          <Grid container direction="column" sx={{minWidth: 'min(600px, 90vw)', p: 1}}>
            {Object.entries(socialLinkObject).map(([type, obj], key) => obj.getTextField({register, errors, key}))}
          </Grid>
          {renderButton()}
        </form>
      </PageCard>
      <Dialog open={showError} onClose={() => setShowError(false)}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          Please add at least one social media account. 
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SocialsPickerCard;