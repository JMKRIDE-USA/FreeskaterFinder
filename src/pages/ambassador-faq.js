import React from 'react';

import Typography from '@mui/material/Typography';

import Page from '../components/page';
import TitleCard from '../components/title-card';
import PageCard from '../components/page-card';

const QAs = {
  "How do I earn ambassador points?": (
    "When you meet people and/or teach them how to skate, give them your ambassador code. " +
    "They will save 5% on their order, and 5% of the purchase price will be converted to ambassador points " +
    "and credited to you! Note: since ambassador codes are intended as credit for introducing people to the sport, " +
    "the code is limited to 1-use-per-customer (aka email address)."
  ),
  "How do I trade in my ambassador points for a JMKRIDE store gift card?": (
    "For now, this is a manual process, so just send me an email, and I'll " +
    "zero your ambassador point balance and send you a gift card equivalent to " +
    "$(points * 0.25) in store credits!"
  ),
  "Where can I give out my discount code?": (
    "You can post your discount code wherever you'd like! " +
    "Online, offline, or anywhere in between! ;)\n" +
    "BUT, if we find your code on any of those bulk-discount code sites, " +
    "(the ones you can find just by googling 'JMKRIDE discount code'), we will " +
    "change it and email you about it."
  ),
  "How can I connect with my fellow ambassadors?": (
    "Click the button to be taken to our Ambassadors-only FB page. " +
    "Request to join and I will approve your request ASAP! " +
    "https://www.facebook.com/groups/1611571015700692"
  ),
  "How much are my ambassador points worth?": (
    "I aligned it so that 500 points should get you a brand-new pair of skates! " +
    "(excluding shipping). So when converting to store gift-card credits, I will " + 
    "multiply your points by 0.25."
  ),
  "Do you have any business cards that I can use to promote my ambassador code?": (
    "https://www.dropbox.com/s/vxt1epxm6f973p0/AmbassadorCards.pdf?dl=0&fbclid=IwAR2xT9xrTe7RbqWwSLTo8rDc0cBLApZRcgGKQBrE8dO7UPtlf-p0zc5ttNU"
  ),
}

function AmbassadorFaqPage() {
  return <Page>
    <TitleCard title="Ambassador FAQ"/>
    {Object.entries(QAs).map(([question, answer], index) => (
      <PageCard headerRow title={question} key={index} sx={{mt: 2, maxWidth: 'min(90vw, 1000px)'}}>
        <Typography variant="body">{answer}</Typography>
      </PageCard>
    ))}
  </Page>
}

export default AmbassadorFaqPage;