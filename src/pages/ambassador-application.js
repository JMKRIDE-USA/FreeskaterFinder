import React from 'react';

import { QueryLoader } from '@jeffdude/frontend-helpers';

import TitleCard from '../components/title-card';
import Page from '../components/page';
import { useGetAmbassadorApplication } from '../hooks/challenges';
import ChallengeFormCard from '../components/forms/challenge-form';

function AmbassadorApplicationPage() {
  const ambassadorApplicationQuery = useGetAmbassadorApplication();

  return (
    <Page>
      <TitleCard />
      <QueryLoader query={ambassadorApplicationQuery} propName="challenge">
        <ChallengeFormCard/>
      </QueryLoader>
    </Page>
  )
}

export default AmbassadorApplicationPage;