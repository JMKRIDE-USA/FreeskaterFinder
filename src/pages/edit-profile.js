import React from 'react';

import Page from '../components/page';
import TitleCard from '../components/title-card';
import EditProfileCard from '../components/forms/edit-profile.js';


function EditProfilePage() {
  return (
    <Page>
      <TitleCard title="Edit Profile"/>
      <EditProfileCard/>
    </Page>
  )
}

export default EditProfilePage;