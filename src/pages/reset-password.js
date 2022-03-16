import React from 'react';

import { usePasswordResetWithToken } from '@jeffdude/frontend-helpers';
import { useParams, useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

import Page from '../components/page';
import TitleCard from '../components/title-card';
import PageCard from '../components/page-card';

import useMakeForm from '../hooks/form';
import { makeTextField } from '../components/forms/fields';

function ResetPasswordPage(){

  const { key } = useParams();
  const postPasswordResetWithToken = usePasswordResetWithToken(key)
  const navigate = useNavigate();

  const [successMessageVisible, showSuccessMessage] = React.useReducer(state => !state, false);

  React.useEffect(
    () => {
      if(successMessageVisible){
        const timer = setTimeout(() => navigate('/'), 10000);
        return () => clearTimout(timer);
      }
    }, [successMessageVisible]
  )

  const makePasswordInput = ({key, label}) => ({
    key, label, formatFn: i => i, initialState: '',
    component: makeTextField({
      key, label, validation: {
        required: 'This field is required.',
        validate: value => value.length > 7 || "Password must be 8 characters long or more.",
      }, password: true,
    }),
  })

  const renderForm = useMakeForm({
    actionFn: ({password2, ...formData}) => postPasswordResetWithToken(formData),
    validateData: (
      ({password, password2}) => (password !== password2 ? ['Passwords do not match'] : [])
    ),
    stateList: [
      makePasswordInput({key: 'password', label: 'New Password'}),
      makePasswordInput({key: 'password2', label: 'Confirm Password'}),
    ],
    buttonText: "Submit",
    onSuccess: showSuccessMessage,
  })

  return <>
    <Page>
      <TitleCard title="Reset User Password"/>
      <PageCard headerRow title="Set your new password">
        {renderForm()}
      </PageCard>
    </Page>
    <Dialog open={successMessageVisible} onClose={() => navigate('/')}>
      <DialogTitle>Success!</DialogTitle>
      <DialogContent>Your password has been reset.</DialogContent>
    </Dialog>
  </>
}

export default ResetPasswordPage;