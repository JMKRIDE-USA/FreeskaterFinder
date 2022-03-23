import React from 'react';

import { Link } from 'react-router-dom';
import { useGetUserInfo, usePatchUser } from '@jeffdude/frontend-helpers';
import { Button } from '@mui/material';

import useMakeForm from '../../hooks/form'
import { makeTextField, makeMonthPickerField } from './fields'
import PageCard from '../page-card';
import UserAvatar from '../user-avatar';
import { maxBioLength } from '../../constants';


function EditProfileCard({onSuccess = () => null, noProfileIcon = false, backButton = true, ...props}){
  const userInfo = useGetUserInfo();
  const patchUser = usePatchUser();

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
        key: "skaterSince", label: "When did you first start freeskating? (optional)", initialState: userInfo?.skaterSince ? new Date(userInfo.skaterSince) : null,
        formatFn: i => i ? i.toISOString() : null,
        component: makeMonthPickerField({
          key: "skaterSince", label: "When did you first start freeskating? (optional)",
          validation: {validate: (value => value < today || "Invalid Date.")},
        })
      },
    ],
    backButton: (backButton 
      ? () => <Button component={Link} to="/my-account">Cancel</Button>
      : () => null
    ),
  })

  return <PageCard small {...props}>
    {!noProfileIcon && <UserAvatar user={userInfo} editable/>}
    {renderForm()}
  </PageCard>
}

export default EditProfileCard;