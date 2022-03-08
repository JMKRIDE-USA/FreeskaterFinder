import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, Grid, Paper, TextField, Typography, LinearProgress,
  Checkbox, FormControlLabel, IconButton,
} from '@mui/material'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ReCAPTCHA from "react-google-recaptcha";

import { useGetUserInfo, useGetAuthState, useCreateAccount } from '@jeffdude/frontend-helpers';
import Page from '../components/page';
import TitleCard from '../components/title-card'
import PageCard from '../components/page-card';
import useMakeLoadingButton from '../hooks/loading-button'

import LocationPickerCard from '../components/forms/location-picker'
import SocialsPickerCard from '../components/forms/socials-picker';
import EditProfileCard from '../components/forms/edit-profile';
import ProfileIconPickerCard from '../components/forms/profileicon-picker';


const LinearProgressWithLabel = ({firstTimeSetup, stepState, numSteps, ...props}) => {
  const [step, setStep] = stepState;
  return (
    <PageCard sx={{mb: 2}}>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%'}}>
        {step > 2 && 
          <IconButton aria-label="Go back" fontSize="small" sx={{mr:1}} onClick={() => setStep(step-1)}>
            <ArrowBackIosNewIcon color="primary" fontSize="small"/>
          </IconButton>
        }
        <Box sx={{ flexGrow: 1, mr: 1, mt: 2, mb: 2 }}>
          <LinearProgress variant="determinate" value={Math.round(100 * (step/numSteps))} {...props} />
        </Box>
        <Box sx={{ minWidth: 85 }}>
          <Typography variant="body2" color="text.secondary">Step {step} of {numSteps}</Typography>
        </Box>
        {step < numSteps && 
          <IconButton aria-label="Go forward" fontSize="small" sx={{mr:1}} onClick={() => setStep(step+1)}>
            <ArrowForwardIosIcon color="primary" fontSize="small"/>
          </IconButton>
        }
      </Box>
    </PageCard>
  )
}

const CreateAccountCard = ({incrementStep}) => {
  const { register, handleSubmit, formState: {errors}, watch}  = useForm();
  const createAccount = useCreateAccount();
  const [ captchaClicked, setCaptchaClicked ] = useState(false);
  const { onClick, render : renderButton } = useMakeLoadingButton({
    doAction: createAccount,
    buttonText: "Submit",
    preProcessData: ({password2, tos, ...rest}) => rest,
    thenFn: (result) => {if(!!result) incrementStep()},
  });
  const tos = useRef({})
  tos.current = watch("tos", "")
  const password = useRef({})
  password.current = watch("password", "")
  return (
    <Paper elevation={4} sx={{p:2, width: {xs: '95vw', md: '500px'}}}>
      <form onSubmit={handleSubmit(onClick)}>
        <Grid container direction="column">
          <Grid item container direction="row" spacing={2} sx={{justifyContent: 'center', width: '100%'}}>
            <Grid item xs={6}>
              <TextField label="First Name" margin="normal" fullWidth inputProps={
                register("firstName", {required: 'This field is required.'})
              } error={!!errors.firstName} helperText={errors?.firstName?.message}/>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Last Name" margin="normal" fullWidth inputProps={
                register("lastName", {required: 'This field is required.'})
              } error={!!errors.lastName} helperText={errors?.lastName?.message}/>
            </Grid>
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
          <Grid container direction="column" sx={{width: '100%', alignItems: 'center', mb: 2}}>
            <ReCAPTCHA sitekey="6LfzM5oeAAAAAPhOYNf7YPC0OTZOTAyI4TP0aQ0o" onChange={value => setCaptchaClicked(!!value)}/>
            <FormControlLabel control={
              <Checkbox {...register("tos", {required: true})}/>
            } label={<>I agree to the <Link to="/terms-of-service">Terms of Service.</Link></>}
            />
          </Grid>
          {renderButton({disabled: !(captchaClicked && tos.current), sx: {alignSelf: "center"}})}
        </Grid>
      </form>
    </Paper>
  )
}

function Redirector() {
  const navigate = useNavigate();
  React.useEffect(() => navigate('/?welcome=true'), [navigate])
  return <></>
}

function CreateAccountPage({firstTimeSetup}) {
  const authState = useGetAuthState();
  const userInfo = useGetUserInfo();
  const [step, setStep] = useState(1);
  const incrementStep = () => setStep(step + 1);
  const navigate = useNavigate();

  useEffect(() => setStep((() => {
    if(!authState) return 1;
    if(!userInfo?.socialLinks.length) return 2;
    if(!userInfo?.bio) return 3;
    if(!userInfo?.profileIconName) return 4;
    if(!userInfo?.location) return 5;
    return 6;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  })()), []);
  
  const createComponent = (() => {
    switch(step) {
      case 1:
        return <CreateAccountCard incrementStep={incrementStep}/>
      case 2:
        return <SocialsPickerCard socialLinkData={userInfo.socialLinks} onSuccess={incrementStep}/>
      case 3:
        return <EditProfileCard onSuccess={incrementStep} noProfileIcon title="Confirm your Profile Info"/>
      case 4:
        return <ProfileIconPickerCard onSuccess={incrementStep} title="Choose a Profile Icon"/>
      case 5:
        return <LocationPickerCard onSuccess={incrementStep}/>
      default:
        return <Redirector/>
    }
  })();

  return (
    <Page>
      <TitleCard title={
        firstTimeSetup ? "Create An Account" : "Finish Setting Up Your Account"
      } sx={{mb: 2}}>
        <Typography variant="subtitle1">
          {firstTimeSetup
            ? "You need to create an account to access the Freeskater Finder."
            : "Please finish setting up your Freeskater Finder account."
          }
        </Typography>
        <Typography variant="caption">
          Note: You need at least one social media account to participate.
          <br/>This includes Facebook, Instagram, Twitter, Reddit, or TikTok.
        </Typography>
      </TitleCard>
      {<LinearProgressWithLabel firstTimeSetup={firstTimeSetup} stepState={[step, setStep]} numSteps={5}/>}
      { createComponent }
    </Page>
  )
}


export default CreateAccountPage;