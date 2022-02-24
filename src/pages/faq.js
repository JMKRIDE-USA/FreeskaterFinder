import React from 'react';

import { Typography } from '@mui/material';

import Page from '../components/page';
import TitleCard from '../components/title-card';
import PageCard from '../components/page-card';


function FaqPage() {
  return <Page>
    <TitleCard><Typography variant="h5" sx={{mt: 2}}>Frequently Asked Questions</Typography></TitleCard>
    <PageCard headerRow title="Where do babies come from?">
      <Typography variant="body1">Idk ask your parents.</Typography>
    </PageCard>
  </Page>
}

export default FaqPage;