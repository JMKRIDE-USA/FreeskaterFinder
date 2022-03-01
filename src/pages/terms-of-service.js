import React from 'react';

import __html from './terms-of-service.html'

import Page from '../components/page';
import TitleCard from '../components/title-card';
import PageCard from '../components/page-card';

const template = { __html }

function TermsOfServicePage() {
  return <Page>
    <TitleCard/>
    <PageCard sx={{maxWidth: 'min(1300px, 90vw)'}}>
      <div dangerouslySetInnerHTML={template}/>
    </PageCard>
  </Page>
}

export default TermsOfServicePage;