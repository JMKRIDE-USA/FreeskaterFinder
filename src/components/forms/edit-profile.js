import React from 'react';

import { Link } from 'react-router-dom';
import { invalidateJFHCache, useGetUserInfo, usePatchUser } from '@jeffdude/frontend-helpers';
import { Button, Typography } from '@mui/material';

import useMakeForm from '../../hooks/form'
import { makeTextField } from './fields'
import PageCard from '../page-card';
import UserAvatar from '../user-avatar';


function EditProfileCard({onSuccess, title, noProfileIcon = false, backButton = true}){
  const userInfo = useGetUserInfo();
  const patchUser = usePatchUser();
  const renderForm = useMakeForm({
    actionFn: patchUser,
    onSuccess: (result) => {invalidateJFHCache(); onSuccess(result)},
    stateList: [
      ["firstName" , "First Name"],
      ["lastName", "Last Name"],
      ["bio", "User Bio"],
    ].map(([key, label]) => ({
      key, label, initialState: userInfo[key],
      component: makeTextField({key, label, validation: {required: 'This field is required.'}}),
      formatFn: i => i,
    })),
    backButton: (backButton 
      ? () => <Button component={Link} to="/my-account">Cancel</Button>
      : () => null
    ),
  })

  return <PageCard small header={title && <Typography variant="h6">{title}</Typography>}>
    {!noProfileIcon && <UserAvatar user={userInfo} editable/>}
    {renderForm()}
  </PageCard>
}

export default EditProfileCard;