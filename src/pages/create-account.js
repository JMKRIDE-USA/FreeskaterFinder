import React, { useRef } from 'react';
import { Box, Grid, Paper, TextField, Typography, LinearProgress, Checkbox, FormControlLabel } from '@mui/material'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import Page from '../components/page';
import TitleCard from '../components/title-card'
import useMakeLoadingButton from '../components/loading-button'
import { useGetAuthState, useCreateAccount } from '@jeffdude/frontend-helpers';

const LinearProgressWithLabel = ({step, ...props}) => (
  <Paper elevation={4} sx={{p:2, width: {xs: '95vw', md: '500px'}, mb: {xs: 2, md: 2}}}>
    <Box sx={{ display: 'flex', alignItems: 'center'}}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={Math.round(100 * (step/3))} {...props} />
      </Box>
      <Box sx={{ minWidth: 85 }}>
        <Typography variant="body2" color="text.secondary">Step {step} of 3</Typography>
      </Box>
    </Box>
  </Paper>
)

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
              register("firstname", {required: 'This field is required.'})
            } error={!!errors.firstname} helperText={errors?.firstname?.message}/>
            <TextField label="Last Name" margin="normal" inputProps={
              register("lastname", {required: 'This field is required.'})
            } error={!!errors.lastname} helperText={errors?.lastname?.message}/>
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
  return (
    <Page>
      <TitleCard title="Create An Account" sx={{mb: 2}}>
        <Typography variant="subtitle1">You need to create an account to access the Freeskater Finder.</Typography>
        <Typography variant="caption">
          Note: You need at least one social media account to participate.
          <br/>This includes Facebook, Instagram, Twitter, Reddit, or TikTok.
        </Typography>
      </TitleCard>
      {!authState && <LinearProgressWithLabel step={1}/>}
      {!authState && <StepOne/>}
    </Page>
  )
}

export default CreateAccountPage;