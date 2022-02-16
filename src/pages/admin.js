import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useGetAuthState } from '@jeffdude/frontend-helpers';

import Page from '../components/page';
import TitleCard from '../components/title-card';
import { useGetPendingSubmissions } from '../hooks/challenges';
import { AdminSubmissionList } from '../components/submission-list';
import { QueryLoader } from '@jeffdude/frontend-helpers/dist/data';
import { ListCardSkeleton } from '../components/loading-page';

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
  return <Page>
    <TitleCard/>
    <QueryLoader query={pendingSubmissions} propName="submissions" loading={() => <ListCardSkeleton length={2}/>}>
      <AdminSubmissionList title="Pending Submissions"/>
    </QueryLoader>
  </Page>
}

export default AdminPage;