import React from 'react';

import { useNavigate } from 'react-router-dom';

import Page from '../components/page';
import TitleCard from '../components/title-card';
import ProfileIconPickerCard from '../components/forms/profileicon-picker';


const EditProfileIconPage = () => {
  const navigate = useNavigate();
  return ( 
    <Page>
      <TitleCard title="Choose A Profile Icon"/>
      <ProfileIconPickerCard onSuccess={() => navigate('/my-account')}/>
    </Page>
  )
}

export default EditProfileIconPage;