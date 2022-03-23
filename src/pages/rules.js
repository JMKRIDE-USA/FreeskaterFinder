import React from 'react';

import { Grid, Divider, Link as MuiLink, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import Page from '../components/page';
import TitleCard from '../components/title-card';
import PageCard from '../components/page-card';
import InfoList from '../components/info-list';
  
const toObject = (list) => {
  let object = {};
  list.forEach((item, index) => object[index + 1] = item);
  return object
}

function RulesPage() {
  const rules = toObject([
    "You must be over the age of 18 to use this Site",
    "All profile information must be true, accurate, and non-deceptive.",
    "Linked social media accounts must be owned and operated only by the corresponding FreeskaterFinder account owner.",
    "Your profile's location must be set accurately according to where you live and freeskate.",
    "You may only create one Freeskater Finder account per person.",
    "Agree and understand that you are responsible for your own safety, and to use lots of discretion if meeting up with anybody offline.",
  ]);

  return <Page>
    <TitleCard title="Freeskater Finder Rules"/>
    <PageCard headerRow sx={{maxWidth: 'min(800px, 90vw)'}} title="By using this Site, you agree to abide by the following rules:">
      <InfoList sx={{width: '100%'}} noStringify object={rules}/>
      <Divider sx={{width: '100%'}}/>
      <Grid sx={{mt: 2}}>
        <MuiLink component={Link} to={"/terms-of-service"} sx={{mr: 4}}>Terms of Service</MuiLink>
        <MuiLink component={Link} to={"/privacy-policy"}>User Privacy Policy</MuiLink>
      </Grid>
    </PageCard>
  </Page>
}

export default RulesPage;