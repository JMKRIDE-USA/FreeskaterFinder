import React, { useState, useRef } from 'react';

import { Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Circle } from '@react-google-maps/api';
import ErrorIcon from '@mui/icons-material/Error';

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
        </Grid>
      }
      {location && <>
        <Grid container direction="row" sx={{justifyContent: "center", alignItems: "center"}}>
          <Typography variant="body1">Does this look correct?</Typography>
          {renderSaveButton({sx: {m: 1}})}
        </Grid>
        <Typography variant="subtitle2">"{location?.formatted_address}"</Typography>
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