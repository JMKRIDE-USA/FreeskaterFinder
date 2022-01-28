import React from 'react';

import { Link } from 'react-router-dom';
import { invalidateCache, useGetUserInfo, usePatchUser } from '@jeffdude/frontend-helpers';

import useMakeForm from '../../hooks/form'
import { makeTextField } from './fields'
import PageCard from '../page-card';
import { Button } from '@mui/material';


function EditProfileCard({onSuccess}){
  const userInfo = useGetUserInfo();
  const patchUser = usePatchUser();
  const renderForm = useMakeForm({
    actionFn: patchUser,
    onSuccess: (result) => {invalidateCache(); onSuccess(result)},
    stateList: [
      ["firstName" , "First Name"],
      ["lastName", "Last Name"],
      ["bio", "User Bio"],
    ].map(([key, label]) => ({
      key, label, initialState: userInfo[key],
      component: makeTextField({key, label, validation: {required: 'This field is required.'}}),
      formatFn: i => i,
    })),
    backButton: () => (
      <Button component={Link} to="/my-account">Cancel</Button>
    ),
  })

  return <PageCard small>
    {renderForm()}
  </PageCard>
}

export default EditProfileCard;