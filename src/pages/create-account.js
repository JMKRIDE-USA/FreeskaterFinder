import React, { useRef } from 'react';
import { Grid, Paper, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';

import Page from '../components/page';
import TitleCard from '../components/title-card'
import { LoadingButton } from '@mui/lab';

function CreateAccountPage() {
  const { register, handleSubmit, formState: {errors}, watch}  = useForm();
  const onSubmit = (data) => console.log(data);
  const password = useRef({})
  password.current = watch("password", "")
  return (
    <Page>
      <TitleCard title="Create An Account">
        <Typography variant="subtitle1">You need to create an account to access the Freeskater Finder.</Typography>
      </TitleCard>
      <Paper elevation={4} sx={{p:2, width: {xs: '95vw', md: '500px'}}}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <LoadingButton type="submit" margin="normal" loading={false} variant="contained" sx={{mt: 1}}>
              Submit
            </LoadingButton>
          </Grid>
        </form>
      </Paper>
    </Page>
  )
}

export default CreateAccountPage;