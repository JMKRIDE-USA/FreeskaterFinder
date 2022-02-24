import React from 'react';

import { useNavigate, Link } from 'react-router-dom';
import { Button, Alert } from '@mui/material'
import { QueryLoader, useGetAuthState, useGetUserInfo, ISOToReadableString } from '@jeffdude/frontend-helpers';

import { ChallengeSubmissionList } from './submission-list';
import { useGetAmbassadorApplication } from '../hooks/challenges';
import PageCard from './page-card';
import InfoList from './info-list';


export function AmbassadorDetailCard({user, noReferralCodeElement}){
  let ambassadorInfo = {"Ambassador Point Balance": user.balance}
  if(user.referralCode)
    ambassadorInfo = {
      ...ambassadorInfo,
      "Code": user.referralCode.code,
      "Percentage": user.referralCode.percent + "%",
      "Num Uses": user.referralCode.usageCount,
      "Created": ISOToReadableString(user.referralCode.createdAt),
    }
  return <PageCard headerRow title={"Ambassador Details"} header={
    user.referralCode && <Button color="neutral" variant="contained" component={Link} to={"/referral-code/" + user.referralCode._id}>View Referral Code</Button>
  }>
    <InfoList object={ambassadorInfo} sx={{width: '100%'}}/>
    {!user.referralCode && noReferralCodeElement}
  </PageCard>
}

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

function AmbassadorCard(){
  const authState = useGetAuthState();
  const user = useGetUserInfo();
  if(authState > 1){
    return <AmbassadorDetailCard user={user} noReferralCodeElement={
      <Alert severity="error">It appears that you are an ambassador without a referral code.<br/>Please contact Jeff to have this sorted out.</Alert>
    }/>
  }
  return <QueryLoader query={useGetAmbassadorApplication} propName="ambassadorApplication" generateQuery>
    <AmbassadorApplicationStatus/>
  </QueryLoader>
  
}

export default AmbassadorCard;