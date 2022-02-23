import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { QueryLoader, useGetAuthState } from '@jeffdude/frontend-helpers';
import { Grid } from '@mui/material';

import Page from '../components/page';
import TitleCard from '../components/title-card';
import PageCard from '../components/page-card';
import { useGetPendingSubmissions } from '../hooks/challenges';
import { AdminSubmissionList } from '../components/submission-list';
import { DetailCardSkeleton, ListCardSkeleton } from '../components/loading-page';
import useMakeForm from '../hooks/form';
import { makeTextField, makeSelectField } from '../components/forms/fields';
import { useGetReferralCodeOptions } from '../hooks/referral-codes';
import { useGetAmbassadorUserOptions } from '../hooks/users';
import { useCreateAdminTransaction, useCreateReferralCodeUsage } from '../hooks/transactions';

function CreateReferralCodeUsageForm({referralCodeOptions}){
  const createReferralCodeUsage = useCreateReferralCodeUsage();
  const renderForm = useMakeForm({
    actionFn: createReferralCodeUsage,
    buttonText: 'Submit',
    stateList: [
      {
        key: 'code', label: 'Referral Code', formatFn: i => i,
        component: makeSelectField({
          key: 'code', label: 'Referral Code', options: referralCodeOptions,
          validation: {required: 'This field is required'},
        })
      },
      {
        key: 'total', label: 'Order Total', formatFn: i => parseInt(i),
        component: makeTextField(
          {key: 'total', label: 'Order Total', validation: {
            required: 'This field is required',
            validate: (value) => !isNaN(Number(value)) || 'Must be a number',
          }}
        ),
      },
      {
        key: 'orderNumber', label: 'Order Number', formatFn: i => parseInt(i),
        component: makeTextField(
          {key: 'orderNumber', label: 'Order Number', validation: {
            required: 'This field is required',
            validate: (value) => !isNaN(Number(value)) || 'Must be a number',
          }}
        ),
      },
    ]
  })
  return <PageCard title="Create Referral Code Usage" sx={{mt: 2}} small>
    {renderForm()}
  </PageCard>
}

function CreateAdminTransactionForm({userOptions}){
  const createAdminTransaction = useCreateAdminTransaction();
  const renderForm = useMakeForm({
    actionFn: createAdminTransaction,
    buttonText: 'Submit',
    stateList: [
      {
        key: 'user', label: 'Ambassador', formatFn: i => i,
        component: makeSelectField({
          key: 'user', label: 'Ambassador', options: userOptions,
          validation: {required: 'This field is required'},
        })
      },
      {
        key: 'amount', label: 'Point Amount', formatFn: i => parseInt(i),
        component: makeTextField(
          {key: 'amount', label: 'Point Amount', validation: {
            required: 'This field is required',
            validate: (value) => !isNaN(Number(value)) || 'Must be a number',
          }}
        ),
      },
      {
        key: 'reason', label: 'Reason', formatFn: i => i,
        component: makeTextField(
          {key: 'reason', label: 'Reason', validation: {
            required: 'This field is required',
          }}
        ),
      },
    ],
  })
  return <PageCard title="Create Admin Transaction" sx={{mt: 2}} small>
    {renderForm()}
  </PageCard>
}

function AdminPage(){
  const authState = useGetAuthState()
  const navigate = useNavigate();
  useEffect(
    () => {if(authState < 500) navigate("/")},
    [authState, navigate]
  )
  /*
  * pending submissions => approve/deny
  * input referral code usage
  * ambassador list
  * user list
  * 
  */
  const pendingSubmissions = useGetPendingSubmissions();
  const referralCodeOptionsQuery = useGetReferralCodeOptions();
  const ambassadorUserOptionsQuery = useGetAmbassadorUserOptions();
  return <Page>
    <TitleCard/>
    <QueryLoader query={pendingSubmissions} propName="submissions" loading={() => <ListCardSkeleton length={2}/>}>
      <AdminSubmissionList title="Pending Submissions" small/>
    </QueryLoader>
    <Grid item container direction="row" sx={{justifyContent: 'center', "& > *": {m: 1}}}>
      <QueryLoader query={referralCodeOptionsQuery} propName="referralCodeOptions" loading={() => <DetailCardSkeleton/>}>
        <CreateReferralCodeUsageForm/>
      </QueryLoader>
      <QueryLoader query={ambassadorUserOptionsQuery} propName="userOptions" loading={() => <DetailCardSkeleton/>}>
        <CreateAdminTransactionForm/>
      </QueryLoader>
    </Grid>
  </Page>
}

export default AdminPage;