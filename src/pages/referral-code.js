import React from 'react';

import { useParams, Link } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { QueryLoader } from '@jeffdude/frontend-helpers';

import Page from '../components/page';
import TitleCard from '../components/title-card';
import ReferralCodesTable from '../components/tables/referral-codes';
import { useGetAllReferralCodes, useGetReferralCodeById } from '../hooks/referral-codes';
import { DetailCardSkeleton, ListCardSkeleton } from '../components/loading-page';

function SingleReferralCodeCard({referralCode}){
  return <></>
}

function ReferralCodePage(){
  const { referralCodeId } = useParams();
  const useGetThisReferralCode = () => useGetReferralCodeById(referralCodeId);
  return (
    <Page>
      <TitleCard>{referralCodeId && <MuiLink component={Link} to={"/referralccodes"}>View All Referral Codes</MuiLink>}</TitleCard>
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