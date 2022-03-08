import React from 'react';

import { Button, Link as MuiLink, Typography, List, ListItem, ListItemText } from '@mui/material';
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
            <ListItem key={index}>
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
      question: "What does it mean if someone is an ambassador?",
      answer: (
        "Our ambassadors are hand-selected by JMKRIDE as our rockstar community members from all around the world. " + 
        "They are all passionate about sharing this sport with others, are very friendly, and open to showing new people how to skate. " +
        "They almost always have at least one spare pair of skates to let others try, and they are given an affiliate code " +
        "which gets you a 5% discount, and gives them a point credit. Note: While it's safe to assume they would be more willing, being " +
        "an ambassador does not mean that the person has any more obligation to add you as a friend/meet up with you/etc."
      ),
      children: <Typography variant="body"><b>
        Please follow all the usual {" "}
        <MuiLink component={Link} to={"/safety"}>safety precautions</MuiLink>
        {" "} when interacting with and/or meeting up with ambassadors.</b>{" "}
        The ambassador application process is a simple online exchange, no references/background checks/thorough vetting has been done.
      </Typography>
    },
    {
      question: "How do I become an ambassador?",
      children: (
        <>
          <Typography variant="body">
            If you are an experienced rider, who is stoked on sharing this sport with new people... <br/>
            If you have an extra set, and never hesitate to show a new person how to ride... <br/>
            We want YOU, for our ambassador program!
          </Typography>
          <Button variant="outlined" component={Link} to="/ambassador-application">Apply Now</Button>
          <Typography variant="body">
            Note: I am prioritizing ambassadors applying from areas with fewer ambassadors nearby. 
            I want to be as fair as possible, so if your application is not accepted, please don't hesitate to reach out
            to me via email: jeff@jmkride.com
          </Typography>
        </>
      ),
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