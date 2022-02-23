import React from 'react';

import { useParams, Link } from 'react-router-dom';
import { Grid, Typography, Link as MuiLink } from '@mui/material';
import { QueryLoader } from '@jeffdude/frontend-helpers';

import Page from '../components/page';
import TitleCard from '../components/title-card';
import PageCard from '../components/page-card';
import InfoList from '../components/info-list';
import ReferralCodesTable from '../components/tables/referral-codes';
import { useGetAllReferralCodes, useGetReferralCodeById } from '../hooks/referral-codes';
import { useGetReferralCodeTransactions } from '../hooks/transactions';
import { DetailCardSkeleton, ListCardSkeleton } from '../components/loading-page';
import TransactionsTable from '../components/tables/transactions';

function SingleReferralCodeCard({referralCode}){
  if(referralCode.length) referralCode = referralCode[0]
  const useGetTransactions = () => useGetReferralCodeTransactions(referralCode._id)
  return <>
    <PageCard title={"Referral Code: '" + referralCode.code + "'"} small sx={{mb: 2}}>
      <Grid container direction="row" sx={{justifyContent: 'center'}}>
        <Typography variant="body1" sx={{mr: 1}}><b>Owner: </b></Typography>
        <MuiLink component={Link} to={"/user/" + referralCode.owner._id}>{referralCode.owner.fullName}</MuiLink>
      </Grid>
      <InfoList object={{
        Percentage: referralCode.percent + "%",
        "Num Uses": referralCode.usageCount,
      }}/>
    </PageCard>
    <QueryLoader query={useGetTransactions} propName="transactions" generateQuery loading={() => <ListCardSkeleton/>}>
      <TransactionsTable/>
    </QueryLoader>
  </>
}

function ReferralCodePage(){
  const { referralCodeId } = useParams();
  const useGetThisReferralCode = () => useGetReferralCodeById(referralCodeId);
  return (
    <Page>
      <TitleCard>{referralCodeId && <MuiLink component={Link} to={"/referral-codes"}>View All Referral Codes</MuiLink>}</TitleCard>
      { referralCodeId
        ? <QueryLoader query={useGetThisReferralCode} propName="referralCode" generateQuery loading={() => <DetailCardSkeleton/>}>
          <SingleReferralCodeCard/>
        </QueryLoader>
        : <QueryLoader query={useGetAllReferralCodes} propName="referralCodes" generateQuery loading={() => <ListCardSkeleton/>}>
          <ReferralCodesTable title="All Referral Codes"/>
        </QueryLoader>
      }
    </Page>
  )
}

export default ReferralCodePage;