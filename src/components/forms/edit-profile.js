import React from 'react';

import { Link } from 'react-router-dom';
import { useGetUserInfo, usePatchUser } from '@jeffdude/frontend-helpers';
import { Button } from '@mui/material';

import useMakeForm from '../../hooks/form'
import { makeTextField, makeMonthPickerField } from './fields'
import PageCard from '../page-card';
import UserAvatar from '../user-avatar';


function EditProfileCard({onSuccess = () => null, title, noProfileIcon = false, backButton = true}){
  const userInfo = useGetUserInfo();
  const patchUser = usePatchUser();

  const maxBioLength = 200;
  const today = new Date();

  const makeTextFieldState = ([key, label]) => ({
    key, label, initialState: userInfo[key],
    component: makeTextField({key, label, validation: {
      required: 'This field is required.',
      ...(key === "bio" 
        ? {validate: value => value.length < maxBioLength || 'Max Bio Length Exceeded (' + value.length + ')'} 
        : {}
      ),
    }}),
    formatFn: i => i,
  })

  const renderForm = useMakeForm({
    actionFn: patchUser,
    onSuccess: (result) => {if(result) onSuccess(result)},
    stateList: [
      makeTextFieldState(["firstName" , "First Name"]),
      makeTextFieldState(["lastName", "Last Name"]),
      makeTextFieldState(["bio", "User Bio (" + maxBioLength + " characters max)"]),
      {
        key: "skaterSince", label: "When did you first start freeskating?", initialState: userInfo.startedSkating,
        formatFn: i => i.toISOString(),
        component: makeMonthPickerField({
          key: "skaterSince", label: "When did you first start freeskating?",
          validation: {validate: (value => value < today || "Invalid Date.")},
        })
      },
    ],
    backButton: (backButton 
      ? () => <Button component={Link} to="/my-account">Cancel</Button>
      : () => null
    ),
  })

  return <PageCard small title={title}>
    {!noProfileIcon && <UserAvatar user={userInfo} editable/>}
    {renderForm()}
  </PageCard>
}

export default EditProfileCard;