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

function FaqPage() {
  const rules = toObject([
    "You must be over the age of 18 to use this Site",
    "All profile information must be true, accurate, and non-deceptive.",
    "Linked social media accounts must be owned and operated only by the corresponding FreeskaterFinder account owner.",
    "Your profile's location must be set accurately according to where you live and freeskate.",
    "You may only create one Freeskater Finder account per person.",
    "Agree and understand that you are responsible for your own safety, and to use lots of discretion if meeting up with anybody offline.",
  ]);

  const safetyAdvice = toObject([
    "Do not share any personal information beyond your social media accounts, especially your address or anything like 'I'm across the street from X'.",
    "There are many reasons why you are required to use a social media site. Take advantage of their built in safety features like blocking, reporting, message requests, etc.",
    "If you suspect any suspicious behavior, please immediately let me know about it via my email jeff@jmkride.com."
  ])
  const meetupAdvice = toObject([
    "Please be extremely careful when deciding to meet up in person. Follow all common sense precautions that you would meeting a stranger IRL. Listen to your gut, if something feels off or weird, please do not risk it.",
    "Accepting a friend request does not mean you are committing to meeting up in person.",
    "Meeting a group of strangers is just as dangerous as meeting a single stranger, bring a friend/family member!",
    "If possible, bring a friend. If not, make sure to inform someone of where you are going and who you are meeting.",
    "Always meet in a public place. (Like a skatepark)",
    "Do not accept a ride in a car to/from the meetup location.",
  ])

  return <Page>
    <TitleCard><Typography variant="h5" sx={{mt: 2}}>Rules & Frequently Asked Questions</Typography></TitleCard>
    <PageCard headerRow sx={{maxWidth: 'min(1300px, 90vw)'}} title="By using this Site, you agree to abide by the following rules:">
      <InfoList sx={{width: '100%'}} noStringify object={rules}/>
      <Divider sx={{width: '100%'}}/>
      <Grid direction='row' sx={{mt: 2}}>
        <MuiLink component={Link} to={"/terms-of-service"} sx={{mr: 4}}>Terms of Service</MuiLink>
        <MuiLink component={Link} to={"/privacy-policy"}>User Privacy Policy</MuiLink>
      </Grid>
    </PageCard>
    <PageCard headerRow sx={{maxWidth: 'min(1300px, 90vw)', mt: 2}} title="Important Safety Advice">
      <InfoList sx={{width: '100%'}} noStringify object={safetyAdvice}/>
    </PageCard>
    <PageCard headerRow sx={{maxWidth: 'min(1300px, 90vw)', mt: 2}} title="Meetup Safety Tips">
      <InfoList sx={{width: '100%'}} noStringify object={meetupAdvice}/>
    </PageCard>
    <PageCard headerRow sx={{maxWidth: 'min(1300px, 90vw)', mt: 2}} title="How do I become an ambassador?">
      <Typography variant="body">
        Our ambassadors are our rockstar community members from all around the world.
      </Typography>
    </PageCard>
  </Page>
}

export default FaqPage;