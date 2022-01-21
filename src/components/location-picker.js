import React, { useState, useRef } from 'react';

import { Divider, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { QueryLoader, useGetQuery, usePatchUser } from '@jeffdude/frontend-helpers'
import { Circle } from '@react-google-maps/api';

import useMakeLoadingButton from '../hooks/loading-button';
import PageCard from './page-card';
import Map from './map';
import { useSaveLocation, useLookupLocation } from '../hooks/location';
import { distanceBetween } from '../modules/geocode';

const ResultCircle = ({location}) => {
  let radius = 8000;
  if(location.bounds.northeast && location.bounds.southwest) {
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

const LocationPickerCard = ({allCountries}) => {
  const [location, setLocation] = useState();

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
    thenFn: ({ result }) => {if(result.length) setLocation(result[0])}
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
    thenFn: (result) => {if(result) console.log("redirect")}
  });
  const country = useRef({})
  country.current = watch("country", "")
  const zip = useRef({})
  zip.current = watch("zip", "")

  return (
    <PageCard>
      <Typography variant="h6">Select your location.</Typography>
      <Typography variant="subheader">For reasons of safety, you can only go as specific as your zip code.</Typography>
      <Divider variant="fullWidth" sx={{width: '80%', mt: 1, mb: 2}}/>
      {location && 
        <Grid container direction="row" sx={{justifyContent: "center", alignItems: "center"}}>
          <Typography variant="body1">Does this look correct?</Typography>
          {renderSaveButton({sx: {m: 1}})}
        </Grid>
      }
      <Map center={location ? location : undefined} zoom={location ? 9 : undefined}>
        {location && <ResultCircle location={location}/>}
      </Map>
      <form onSubmit={handleSubmit(onClickLookup)}>
        <Grid container direction="row" sx={{alignItems: "center", m: 2}}>
          <TextField label="Country" margin="normal" sx={{mr:1}} inputProps={
            register("country", {required: 'This field is required.'})
          } error={!!errors.country} helperText={errors?.country?.message}/>
          <TextField label="Zip Code" margin="normal" sx={{mr:2}} inputProps={
            register("zip", {valueAsNumber: true, required: 'This field is required.'})
          } error={!!errors.zip} helperText={errors?.zip?.message}/>
          {renderLookupButton({disabled: !(!!country.current && !!zip.current)})}
        </Grid>
      </form>
    </PageCard>
  )
}

export default LocationPickerCard;