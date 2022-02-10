import React from 'react';

import Page from '../components/page';
import TitleCard from '../components/title-card';
import ProfileIconPickerCard from '../components/forms/profileicon-picker';


const EditProfileIconPage = () =>
  <Page>
    <TitleCard title="Choose A Profile Icon"/>
    <ProfileIconPickerCard/>
  </Page>

export default EditProfileIconPage;