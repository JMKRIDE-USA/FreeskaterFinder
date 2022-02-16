import React from 'react';

import { useParams } from 'react-router-dom';
import { QueryLoader } from '@jeffdude/frontend-helpers';
import { Typography } from '@mui/material';

import { DetailCardSkeleton } from '../components/loading-page';
import { SubmissionDetailsList, lookupSubmissionFields } from '../components/submission-list';
import { useGetSubmission } from '../hooks/challenges';
import Page from '../components/page';
import TitleCard from '../components/title-card';
import PageCard from '../components/page-card';

function LoadedSingleSubmissionCard({submission}) {
  submission = lookupSubmissionFields({submission})
  console.log({submission})
  return (
    <PageCard header={<Typography variant="h6">Submission {submission._id}</Typography>}>
      <SubmissionDetailsList submission={submission}/>
    </PageCard>
  )
}

function SingleSubmissionCard({submissionId}){
  const submissionQuery = useGetSubmission(submissionId);
  return <QueryLoader query={submissionQuery} propname="submission" loading={() => <DetailCardSkeleton/>}>
    <LoadedSingleSubmissionCard/>
  </QueryLoader>

}

function SubmissionPage(){
  const { submissionId } = useParams();
  return <Page>
    <TitleCard title={submissionId ? "" : "My Submissions"}/>
    {submissionId
      ? <SingleSubmissionCard submissionId={submissionId}/>
      : <></>
    }
  </Page>
}

export default SubmissionPage;