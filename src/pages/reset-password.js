import React from 'react';

import Page from '../components/page';
import TitleCard from '../components/title-card';
import PageCard from '../components/page-card';

import useMakeForm from '../hooks/form';
import { usePasswordResetWithToken } from '../hooks/auth';

function ResetPasswordPage(){

  const postPasswordResetWithToken = usePasswordResetWithToken()

  const makePasswordInput = ({key, label}) => ({
    key, label, formatFn: i => i, initialState: '',
    component: makeTextField({
      key, label, validation: {
        required: 'This field is required.',
        validate: value => value.length > 7 || "Password must be 8 characters long or more.",
      }, fieldProps: {secureTextEntry: true},
    })
  })

  const renderForm = useMakeForm({
    actionFn: ({password2, ...formData}) => postPasswordResetWithToken(formData),
    validateData: (
      ({password, password2}) => (password !== password2 ? ['Passwords do not match'] : null)
    ),
    stateList: [
      makePasswordInput({key: 'password', label: 'New Password'}),
      makePasswordInput({key: 'password2', label: 'Confirm Password'}),
    ],
    buttonText: "Submit",
  })

  return <Page>
    <TitleCard title="Reset User Password"/>
    <PageCard headerRow title="Set your new password">
      {renderForm()}
    </PageCard>
  </Page>
}

export default ResetPasswordPage;