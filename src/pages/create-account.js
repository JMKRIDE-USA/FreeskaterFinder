import React, { useState, useRef } from 'react';
import { Box, Grid, Paper, TextField, Typography, LinearProgress, Checkbox, FormControlLabel, InputLabel, Select, MenuItem, FormControl } from '@mui/material'
import { useForm, Controller } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';

import { useGetAuthState, useCreateAccount, useGetSelf, usePatchUser} from '@jeffdude/frontend-helpers';
import { socialLinkTypes } from '../constants';
import Page from '../components/page';
import TitleCard from '../components/title-card'
import PageCard from '../components/page-card';
import useMakeLoadingButton from '../components/loading-button'

const LinearProgressWithLabel = ({step, ...props}) => (
  <PageCard sx={{mb: {xs: 2, md: 2}}}>
    <Box sx={{ display: 'flex', alignItems: 'center'}}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={Math.round(100 * (step/3))} {...props} />
      </Box>
      <Box sx={{ minWidth: 85 }}>
        <Typography variant="body2" color="text.secondary">Step {step} of 3</Typography>
      </Box>
    </Box>
  </PageCard>
)

const SocialForm = ({numSocials, register, errors}) => {
  for(let i = 0; i < numSocials; i++) {
    const rowname = "socialrow" + i
    const typename = rowname + "type"
    const linkname = rowname + "link"
    return (
      <Grid item container direction="row" key={linkname}>
        <Box sx={{flexGrow:1}}>
          <FormControl fullWidth>
            <InputLabel id={typename+"label"}>Social Media Site</InputLabel>
            <Select labelId={typename+"label"} label={"Social Media Site"} {...register(typename, {required: 'This field is required'})}>
              {socialLinkTypes.map((linktype, index) => (<MenuItem key={linktype + index} value={linktype}>{linktype}</MenuItem>))}
            </Select>
          </FormControl>
        </Box>
        <TextField label="Link" inputProps={register(linkname, {
          required: 'This field is required',
          pattern: {
            value: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            message: 'Invalid URL.'
          },
        })} error={!!errors[linkname]} helperText={errors[linkname]?.message}/>
      </Grid>
    )
  }
}

const SocialLink = ({key, socialType, control}) => {
  return (
    <Controller control={control} name={socialType.name}
      render={({field, fieldState, formState : {errors, ...restFormState}}) => {
        console.log({field, errors, fieldState, restFormState})
        // field.value: undefined.
        // for some reason onChange is not working here
        return (
        <TextField margin="normal" label={socialType.label + " Link"}
          error={!!errors[socialType.name]} helperText={errors[socialType.name]?.message}
          {...field}
        />
        )}
      } 
      rules={{required: 'required', pattern: {value: socialType.validationRegex, message: 'Invalid URL.'}}}
    />
  )
}

const StepTwo = () => {
  const { handleSubmit, formState: {errors}, control } = useForm({defaultValues: () => ''});
  const patchUser = usePatchUser();
  const { onClick , render: renderButton } = useMakeLoadingButton({
    doAction: (data) => {console.log(data); return ({result: false})},
    buttonText: "Save",
  });
  console.log(errors)
  return (
    <PageCard>
      <form onSubmit={handleSubmit(onClick)}>
        <Grid container direction="column" sx={{p: 1}}>
          <Typography variant="h6">Please add at least one social media account.</Typography>
          {socialLinkTypes.map((socialType, key) => <SocialLink {...{key, socialType, control}}/>)}
        </Grid>
        {renderButton()}
      </form>
    </PageCard>
  )
}
const StepThree = () => {
  return (<p>Step Three</p>)
}

const StepOne = () => {
  const { register, handleSubmit, formState: {errors}, watch}  = useForm();
  const createAccount = useCreateAccount();
  const { onClick, render : renderButton } = useMakeLoadingButton({
    doAction: createAccount,
    buttonText: "Submit",
    preProcessData: ({password2, tos, ...rest}) => rest,
  });
  const tos = useRef({})
  tos.current = watch("tos", "")
  const password = useRef({})
  password.current = watch("password", "")
  return (
    <Paper elevation={4} sx={{p:2, width: {xs: '95vw', md: '500px'}}}>
      <form onSubmit={handleSubmit(onClick)}>
        <Grid container direction="column">
          <Grid item container direction="row">
            <TextField label="First Name" margin="normal" sx={{mr:1}} inputProps={
              register("firstName", {required: 'This field is required.'})
            } error={!!errors.firstName} helperText={errors?.firstName?.message}/>
            <TextField label="Last Name" margin="normal" inputProps={
              register("lastName", {required: 'This field is required.'})
            } error={!!errors.lastName} helperText={errors?.lastName?.message}/>
          </Grid>
          <TextField label="Email" margin="normal" inputProps={
            register("email", {
              required: 'This field is required.',
              pattern: {value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, message: 'Invalid email.'},
            })
          } error={!!errors.email} helperText={errors?.email?.message}/>
          <TextField label="Password" margin="normal" inputProps={{
            ...register("password", {
              required: 'This field is required.',
              pattern: {value: /\w{8,}/, message: 'Password must be 8 characters long or more.'},
            }), type: "password"}
          } error={!!errors.password} helperText={errors?.password?.message}/>
          <TextField label="Repeat Password" margin="normal" inputProps={{
            ...register("password2", {
              required: 'This field is required.',
              validate: value => value === password.current || "The passwords do not match.",
            }), type: "password"}
          } error={!!errors.password2} helperText={errors?.password2?.message}/>
          <FormControlLabel control={
            <Checkbox {...register("tos", {required: true})}/>
          } label={<>I agree to the <Link to="/terms-of-service">Terms of Service.</Link></>}
          />
          {renderButton({disabled: !tos.current})}
        </Grid>
      </form>
    </Paper>
  )
}

function CreateAccountPage() {
  const authState = useGetAuthState();
  const userInfo = useGetSelf();
  const creationStage = (() => {
    if(!authState) return 1;
    if(!userInfo.socialLinks) return 2;
    if(!userInfo.location) return 3;
    return 4;
  })();
  const createComponent = (() => {
    switch(creationStage) {
      case 1:
        return <StepOne/>
      case 2:
        return <StepTwo/>
      case 3:
        return <StepThree/>
      default:
        return <Navigate to="/"/>
    }
  })();

  return (
    <Page>
      <TitleCard title="Create An Account" sx={{mb: 2}}>
        <Typography variant="subtitle1">You need to create an account to access the Freeskater Finder.</Typography>
        <Typography variant="caption">
          Note: You need at least one social media account to participate.
          <br/>This includes Facebook, Instagram, Twitter, Reddit, or TikTok.
        </Typography>
      </TitleCard>
      {<LinearProgressWithLabel step={creationStage}/>}
      {createComponent}
    </Page>
  )
}

export default CreateAccountPage;