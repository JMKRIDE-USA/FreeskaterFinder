import React from 'react';
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export function SignInDialog({open}) {
  const { register, handleSubmit, formState: {errors}}  = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <Dialog open={open} onClose={() => null}
      disableEscapeKeyDown onBackdropClick={()=>null} 
    >
      <DialogTitle>Sign In or Create An Account</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{pb: 2}}>You need to sign in to use the Freeskater Finder.</DialogContentText>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="column">
            <TextField label="Email" margin="none" inputProps={
              register("email", {
                required: 'Email is required.',
                pattern: {value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, message: 'Invalid email.'},
              })}
              error={!!errors.email} helperText={errors?.email?.message}
            />
            <TextField label="Password" margin="normal" inputProps={{...register("password", {required: 'Password is required.'}), type: "password"}}
              error={!!errors.password} helperText={errors?.password?.message}
            />
            <LoadingButton type="submit" margin="normal" loading={false} variant="contained">Sign In</LoadingButton>
            <Button component={Link} to="/create-account">Create An Account</Button>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  )
}