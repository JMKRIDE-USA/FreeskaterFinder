import React from 'react';

import { Typography } from '@mui/material';

import PageCard from './page-card';
import Map from './map';

const LocationPickerCard = () => {
  const { onClick, render : renderButton } = useMakeLoadingButton({
    doAction: saveLocation,
    buttonText: "Save",
    thenFn: (result) => {/*redirect*/},
  });
  return (
    <PageCard>
      <Typography variant="h6">Select your location.</Typography>
      <Typography variant="subheader">For reasons of safety, you can only go as specific as your zip code.</Typography>
      <form onSubmit={handleSubmit(onClick)}>
      </form>
      <Map/>
    </PageCard>
  )
}

export default LocationPickerCard;