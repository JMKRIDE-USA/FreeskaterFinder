import React from 'react';

import { useNavigate } from 'react-router-dom';
import { QueryLoader, useGetAuthState } from '@jeffdude/frontend-helpers';

import SubmissionList from './submission-list';
import { useGetAmbassadorApplication } from '../hooks/challenges';

function AmbassadorApplicationStatus({ambassadorApplication}) {
  const navigate = useNavigate();
  if(ambassadorApplication.submissions.length) {
    return <SubmissionList
      challenge={ambassadorApplication}
      expandable={false}
      onClick={() => navigate("/ambassador-application")}
    />
  }
  return <></>
}

function AmbassadorInfoCard() {
  return <></>
}

function AmbassadorCard(){
  const authState = useGetAuthState();
  const makeApplicationQuery = useGetAmbassadorApplication;
  if(authState > 1){
    return <AmbassadorInfoCard/>
  }
  return <QueryLoader query={makeApplicationQuery()} propName="ambassadorApplication">
    <AmbassadorApplicationStatus/>
  </QueryLoader>
  
}

export default AmbassadorCard;