import React from 'react';

import Page from '../components/page';
import TitleCard from '../components/title-card';
import EditProfileCard from '../components/forms/edit-profile.js';
import { useNavigate } from 'react-router-dom';


function EditProfilePage() {
  const navigate = useNavigate();
  return (
    <Page>
      <TitleCard title="Edit Profile"/>
      <EditProfileCard onSuccess={() => navigate('/my-account')}/>
    </Page>
  )
}

export default EditProfilePage;