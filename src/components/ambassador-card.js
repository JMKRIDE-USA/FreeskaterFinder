import React from 'react';

import { useNavigate } from 'react-router-dom';
import { QueryLoader, useGetAuthState } from '@jeffdude/frontend-helpers';

import { ChallengeSubmissionList } from './submission-list';
import { useGetAmbassadorApplication } from '../hooks/challenges';

function AmbassadorApplicationStatus({ambassadorApplication}) {
  const navigate = useNavigate();
  if(ambassadorApplication.submissions.length) {
    return <ChallengeSubmissionList
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
  if(authState > 1){
    return <AmbassadorInfoCard/>
  }
  return <QueryLoader query={useGetAmbassadorApplication} propName="ambassadorApplication" generateQuery>
    <AmbassadorApplicationStatus/>
  </QueryLoader>
  
}

export default AmbassadorCard;