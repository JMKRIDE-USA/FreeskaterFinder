import React from 'react';

import { QueryLoader } from '@jeffdude/frontend-helpers';
import { useParams, Link } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';

import TitleCard from '../components/title-card';
import Page from '../components/page';
import { useGetAmbassadorApplication, useGetChallenge, useGetAllChallenges } from '../hooks/challenges';
import ChallengeFormCard from '../components/forms/challenge-form';
import ChallengesTable from '../components/tables/challenges'


function ChallengePage({ambassadorApplication = false}) {
  const { challengeId } = useParams()
  const useGetThisChallenge = () => useGetChallenge(challengeId)
  return (
    <Page>
      <TitleCard>{challengeId && <MuiLink component={Link} to="/challenges">View All Challenges</MuiLink>}</TitleCard>
      {ambassadorApplication
        ? <QueryLoader query={useGetAmbassadorApplication} propName="challenge" generateQuery><ChallengeFormCard/></QueryLoader>
        : challengeId
        ? <QueryLoader query={useGetThisChallenge} propName="challenge" generateQuery><ChallengeFormCard/></QueryLoader>
        : <QueryLoader query={useGetAllChallenges} propName="challenges" generateQuery><ChallengesTable title="All Challenges"/></QueryLoader>
      }
    </Page>
  )
}

export default ChallengePage;