import React from 'react';

import { useGetUserInfo } from '@jeffdude/frontend-helpers';
import { useNavigate } from 'react-router-dom';

import Page from '../components/page';
import SocialsPickerCard from '../components/forms/socials-picker';
import TitleCard from '../components/title-card'


function EditSocialsPage() {
  const userInfo = useGetUserInfo();
  const navigate = useNavigate();
  return <Page>
    <TitleCard title="Edit Socials"/>
    <SocialsPickerCard socialLinkData={userInfo.socialLinks} onSuccess={() => navigate('/my-account')}/>
  </Page>
}

export default EditSocialsPage;