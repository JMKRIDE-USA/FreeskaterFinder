import React, { useState } from 'react';

import { TextField, Grid, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useForm } from 'react-hook-form';
import { usePatchUser } from '@jeffdude/frontend-helpers';

import PageCard from '../page-card';
import useMakeLoadingButton from '../../hooks/loading-button';
import { allLinkTypes, getSocialLinkObject } from '../../modules/links';


const SocialsPickerCard = ({socialLinkData, onSuccess = () => null}) => {
  const socialLinkObject = getSocialLinkObject(socialLinkData, {includeBlank: true}) 

  const { handleSubmit, formState: {isDirty, errors}, register } = useForm({ defaultValues: Object.assign({}, ...Object.entries(socialLinkObject).map(([key, obj]) => ({[key]: obj.value}))) });
  const patchUser = usePatchUser();
  const [showError, setShowError] = useState(false);
  const { onClick , render: renderButton } = useMakeLoadingButton({
    doAction: (data) => {
      if(!data.length || data.some(({link}) => !link)) {
        setShowError(true);
        return {result: false};
      }
      if(isDirty) return patchUser({socialLinks: data})
      return {result: true}
    },
    preProcessData: (data) => Object.entries(data).map(([type, link]) => (
      (link && type) ? {type, link: new allLinkTypes[type](link).link} : undefined
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
            {Object.keys(allLinkTypes).map((type, key) => socialLinkObject[type].getTextField({register, errors, key}))}
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