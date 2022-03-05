import React from 'react';

import { Link as MuiLink, Typography, List, ListItem, ListItemText } from '@mui/material';
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
  const neverItems = [
    "meet up with someone without bringing a friend or family member along",
    "accept a ride to or from the meetup.",
    "meet at either party's house. Find a public area like a skatepark.",
    "further clarify your location, e.g. 'I'm across the street from X'",
  ]

  const FAQs = [
    {
      question: "What are the Rules of the Freeskater Finder?", 
      children: <MuiLink component={Link} to="/rules">View the rules page here.</MuiLink>
    },
    {
      question: "How can I stay safe while using the Freeskater Finder?",
      answer: (
        "It is extremely important to use caution when using this site, since by its nature " +
        "it is publicizing personal information to untrusted third parties. " +
        "Take advantage of your social media privacy and safety features, and..."
      ),
      children: <>
        <List dense>
          {neverItems.map((item, index) => (
            <ListItem>
              <ListItemText>
                <b> NEVER {" "} </b>{item}
              </ListItemText>
            </ListItem>
          ))}
        </List>
        <MuiLink component={Link} to="/safety">Read all safety information.</MuiLink>
      </>
    },
    {
      question: "How do I become an ambassador?",
      answer: "Our ambassadors are our rockstar community members from all around the world."
    },
  ]

  return <Page>
    <TitleCard><Typography variant="h5" sx={{mt: 2}}>Frequently Asked Questions</Typography></TitleCard>
    {FAQs.map(({question, answer, children}, index) => (
      <PageCard headerRow sx={{maxWidth: 'min(800px, 90vw)', mt: 2}} title={question} key={index}>
        <Typography variant="body">{answer}</Typography>
        {children}
      </PageCard>
    ))}
  </Page>
}

export default FaqPage;