import React from 'react';

import { useParams, Link } from 'react-router-dom';
import { Grid, Typography, Link as MuiLink, Button } from '@mui/material';
import { QueryLoader, useGetAuthState, ISOToReadableString } from '@jeffdude/frontend-helpers';

import Page from '../components/page';
import TitleCard from '../components/title-card';
import PageCard from '../components/page-card';
import InfoList from '../components/info-list';
import ReferralCodesTable from '../components/tables/referral-codes';
import { useGetAllReferralCodes, useGetReferralCodeById } from '../hooks/referral-codes';
import { useGetReferralCodeTransactions } from '../hooks/transactions';
import { DetailCardSkeleton, ListCardSkeleton } from '../components/loading-page';
import TransactionsTable from '../components/tables/transactions';

function SingleReferralCodeCard({referralCode, isAdmin}){
  if(referralCode.length) referralCode = referralCode[0]
  const useGetTransactions = () => useGetReferralCodeTransactions(referralCode._id)
  const userUrl = isAdmin ? "/user/" + referralCode.owner._id : "/my-account"

  const [copied, flipCopied] = React.useReducer(state => !state, false)
  React.useEffect(() => setTimeout(() => {if(copied) flipCopied()}, 1000), [copied, flipCopied]);
  const copyDiscountLink = () => {
    navigator.clipboard.writeText("https://usa.jmkride.com/discount/" + referralCode?.code)
    flipCopied()
  }
  return <>
    <PageCard title={"Referral Code: '" + referralCode.code + "'"} small sx={{mb: 2}}>
      <Grid container direction="column">
        <Grid item container direction="row" sx={{justifyContent: 'flex-start', pl: 2}}>
          <Typography variant="body1" sx={{mr: 1}}><b>Owner: </b></Typography>
          <MuiLink component={Link} to={userUrl}>{referralCode.owner.fullName}</MuiLink>
        </Grid>
        <InfoList object={{
          Percentage: referralCode.percent + "%",
          "Num Uses": referralCode.usageCount,
          "Created": ISOToReadableString(referralCode.createdAt),
        }}/>
      </Grid>
      <Button color="neutral" variant="contained" onClick={copyDiscountLink}>{copied ? "Copied!" : "Copy Discount URL"}</Button>
    </PageCard>
    <QueryLoader query={useGetTransactions} propName="transactions" generateQuery loading={() => <ListCardSkeleton/>}>
      <TransactionsTable noSubject/>
    </QueryLoader>
  </>
}

function ReferralCodePage(){
  const { referralCodeId } = useParams();
  const isAdmin = useGetAuthState() > 5;
  const useGetThisReferralCode = () => useGetReferralCodeById(referralCodeId);
  return (
    <Page>
      <TitleCard>{referralCodeId && isAdmin && <MuiLink component={Link} to={"/referral-codes"}>View All Referral Codes</MuiLink>}</TitleCard>
      { referralCodeId
        ? <QueryLoader query={useGetThisReferralCode} propName="referralCode" generateQuery loading={() => <DetailCardSkeleton/>}>
          <SingleReferralCodeCard isAdmin={isAdmin}/>
        </QueryLoader>
        : <QueryLoader query={useGetAllReferralCodes} propName="referralCodes" generateQuery loading={() => <ListCardSkeleton/>}>
          <ReferralCodesTable title="All Referral Codes"/>
        </QueryLoader>
      }
    </Page>
  )
}

export default ReferralCodePage;