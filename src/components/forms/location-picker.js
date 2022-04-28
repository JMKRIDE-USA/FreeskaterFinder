import React, { useState, useRef, useReducer } from 'react';

import { Grid, TextField, Typography, Link, Dialog, DialogTitle, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Circle } from '@react-google-maps/api';
import ErrorIcon from '@mui/icons-material/Error';
import HelpIcon from '@mui/icons-material/Help';

import { useGetUserInfo } from '@jeffdude/frontend-helpers';

import useMakeLoadingButton from '../../hooks/loading-button';
import PageCard from '../page-card';
import Map from '../map';
import { useSaveLocation, useLookupLocation } from '../../hooks/location';
import { distanceBetween } from '../../modules/geocode';

const ResultCircle = ({location}) => {
  let radius = 8000;
  if(location?.bounds?.northeast && location?.bounds?.southwest) {
    radius = distanceBetween(location.bounds.northeast, location.bounds.southwest) / 2.0;
  }
  const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius,
  }
  return (<Circle center={location} options={options}/>)
}

const LocationPickerCard = ({onSuccess = () => null}) => {
  const userInfo = useGetUserInfo();

  const [location, setLocation] = useState(userInfo?.location ? userInfo.location : undefined);
  const [ error, setError ] = useState('');
  const [ showHelp, toggleHelp ] = useReducer(state => !state, false)

  const lookupLocation = useLookupLocation();
  const saveLocation = useSaveLocation();

  const { handleSubmit, formState: {isDirty, errors}, register, watch } = useForm({ defaultValues: {
    country: location ? location.country : '',
    zip: location ? location.zip : '',
  }});

  const { onClick : onClickLookup , render: renderLookupButton } = useMakeLoadingButton({
    doAction: (data) => {
      if(!data) {
        return {result: false};
      }
      if(isDirty) return lookupLocation(data);
      return {result: false}
    },
    buttonText: "Lookup",
    thenFn: (result) => {
      console.log({result});
      setError();
      if(result?.error) return setError(result.error);
      if(result) return setLocation(result);
    },
  });
  const { render: renderSaveButton } = useMakeLoadingButton({
    doAction: ({bounds, ...locationData}) => {
      if(!locationData) {
        return {result: false};
      }
      if(isDirty) return saveLocation(locationData)
      return {result: false}
    },
    preProcessData: () => location,
    isFormButton: false,
    buttonText: "Save",
    thenFn: (result) => {if(result){
      onSuccess(result);
    }}
  });
  const country = useRef({})
  country.current = watch("country", "")
  const zip = useRef({})
  zip.current = watch("zip", "")

  return (
    <PageCard title="Select your location." header={
      <Typography variant="body1">For safety reasons, you can only go as specific as your zip code.</Typography>
    }>
      {error &&
        <Grid container direction="row" sx={{mb: 1, justifyContent: "center"}}>
          <ErrorIcon sx={{color: "red", mr: 1}}/>
          <Typography variant="button" sx={{color: "red"}}>{error}</Typography>
          <Link sx={{ml: 3}} onClick={toggleHelp}>Get Help</Link>
        </Grid>
      }
      <Dialog onClose={toggleHelp} open={showHelp}>
        <DialogTitle>Location Help</DialogTitle>
        <List>
          <ListItem>
            <ListItemAvatar><ErrorIcon/></ListItemAvatar>
            <ListItemText primary={"Error: No Results Found"} secondary={
              <>Please search for the location on <Link href="https://google.com/maps" target="_blank">Google Maps</Link> and use the postal code that it provides.</>
            }/>
          </ListItem>
          <ListItem>
            <ListItemAvatar><ErrorIcon/></ListItemAvatar>
            <ListItemText primary={"Error: Defined Area Is Too Specific"} secondary={
              "The found area is too small, which is dangerous for the security of our users. " +
              "Postal codes in some countries, like Canada, have several layers of location, e.g. \'SK S4T 3N2\', which can be made less specific by removing parts of the code, like \'SK S4T\'."
            }/>
          </ListItem>
          <ListItem>
            <ListItemAvatar><HelpIcon/></ListItemAvatar>
            <ListItemText primary={"Contact Me: jeff@jmkride.com"} secondary={
              <>If neither of the above are working, please send me an email containing your desired location and a link to the pin on <Link href="https://google.com/maps" target="_blank">Google Maps</Link>.
              I will work with you to fix the issue. Sorry for any inconvenience</>
            }/>
          </ListItem>
        </List>
      </Dialog>
      {location && <>
        <Grid container direction="row" sx={{justifyContent: "center", alignItems: "center"}}>
          <Typography variant="body1">Does this look correct?</Typography>
          {renderSaveButton({sx: {m: 1}})}
        </Grid>
        {location?.formatted_address && <Typography variant="subtitle2">"{location?.formatted_address}"</Typography>}
      </>}
      <Map center={location ? location : undefined} zoom={location ? 9 : undefined}>
        {location && <ResultCircle location={location}/>}
      </Map>
      <form onSubmit={handleSubmit(onClickLookup)}>
        <Grid container direction="row" sx={{alignItems: "center", m: 2}}>
          <TextField label="Country" margin="normal" sx={{mr:1}} inputProps={
            register("country", {required: 'This field is required.'})
          } error={!!errors.country} helperText={errors?.country?.message}/>
          <TextField label="Zip Code" margin="normal" sx={{mr:2}} inputProps={
            register("zip", {required: 'This field is required.'})
          } error={!!errors.zip} helperText={errors?.zip?.message}/>
          {renderLookupButton({disabled: !(!!country.current && !!zip.current)})}
        </Grid>
      </form>
    </PageCard>
  )
}

export default LocationPickerCard;