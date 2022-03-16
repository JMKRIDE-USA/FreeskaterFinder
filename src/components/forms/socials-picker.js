import React, { useState } from 'react';

import { TextField, Grid, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useForm } from 'react-hook-form';
import { usePatchUser } from '@jeffdude/frontend-helpers';

import PageCard from '../page-card';
import useMakeLoadingButton from '../../hooks/loading-button';
import { socialLinkTypes } from '../../constants';


const SocialLink = ({socialType, register, errors}) => {
  return (
    <TextField label={socialType.label} margin="normal" inputProps={
        register(socialType.name, {
          pattern: {value: socialType.validationRegex, message: 'Invalid URL.'}
        })
      } error={!!errors[socialType.name]} helperText={errors[socialType.name]?.message}
    />
  )
}

const SocialsPickerCard = ({socialLinkData, onSuccess = () => null}) => {
  const socialLinkObject = {}
  if(socialLinkData) {
    socialLinkData.forEach(({type, link}) => socialLinkObject[type] = link) // populate existing data
  }
  socialLinkTypes.forEach(({name}) => { // fill in the rest
    if(!socialLinkObject[name]) socialLinkObject[name] = '';
  });

  const { handleSubmit, formState: {isDirty, errors}, register } = useForm({ defaultValues: socialLinkObject });
  const patchUser = usePatchUser();
  const [showError, setShowError] = useState(false);
  const { onClick , render: renderButton } = useMakeLoadingButton({
    doAction: (data) => {
      if(!data.length) {
        setShowError(true);
        return {result: false};
      }
      if(isDirty) return patchUser({socialLinks: data})
      return {result: true}
    },
    preProcessData: (data) => Object.entries(data).map(([type, link]) => (
      link.length ? {type, link} : undefined
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
            {socialLinkTypes.map((socialType, key) => <SocialLink {...{key, socialType, register, errors}}/>)}
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