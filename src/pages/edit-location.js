import React from 'react';

import { useNavigate } from 'react-router-dom';

import Page from '../components/page'
import TitleCard from '../components/title-card'
import LocationPickerCard from '../components/forms/location-picker';


function EditLocationPage() {
  const navigate = useNavigate();
  return (
    <Page>
      <TitleCard title="Edit User Location"/>
      <LocationPickerCard onSuccess={() => navigate('/my-account')}/>
    </Page>
  )
}

export default EditLocationPage; 