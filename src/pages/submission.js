import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
import { QueryLoader } from '@jeffdude/frontend-helpers';
import { Grid, Link, TextField, Typography, ButtonGroup } from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

import { DetailCardSkeleton, ListCardSkeleton } from '../components/loading-page';
import { StatusIndicator, SubmissionDetailsList, lookupSubmissionFields } from '../components/submission-list';
import { useGetSubmission, useUpdateSubmission, useGetAllSubmissions } from '../hooks/challenges';
import SubmissionsTable from '../components/tables/submissions';
import Page from '../components/page';
import TitleCard from '../components/title-card';
import PageCard from '../components/page-card';
import { ISOToReadableString } from '@jeffdude/frontend-helpers/dist/date';
import useMakeLoadingButton from '../hooks/loading-button';

function LoadedSingleSubmissionCard({ submission }) {
  const [note, setNote] = useState('');
  submission = lookupSubmissionFields({submission})
  const updateSubmission = useUpdateSubmission({submissionId: submission._id})

  const { onClick : onClickAccept, render : renderAccept} = useMakeLoadingButton({
    doAction: () => updateSubmission({status: 'APPROVED'}),
    buttonText: "Accept",
    icon: <CheckIcon/>,
    color: "success"
  })

  const { onClick : onClickReject, render : renderReject} = useMakeLoadingButton({
    doAction: () => updateSubmission({status: 'DENIED', note}),
    buttonText: "Reject",
    icon: <CancelIcon/>,
    color: "error"
  })

  return (
    <PageCard headerRow header={
      <>
        <Typography variant="h6">
          Submission by <Link href={"/user/" + submission.author._id}><b>{submission.author.fullName}</b></Link>
        </Typography>
        <Typography variant="h6">Submitted on {ISOToReadableString(submission.createdAt)}</Typography>
      </>
    }>
      <Typography variant="h6">Challenge: <b>{submission.challenge.title}</b></Typography>
      <StatusIndicator status={submission.status} sx={{width: 'min(80vw, 250px)'}}/>
      <SubmissionDetailsList submission={submission}/>
      {submission.status === 'PENDING' &&
        <Grid container direction="row"
          sx={{justifyContent: 'space-around', alignItems: 'center'}}
        >
          <TextField multiline label="Note" margin="normal" sx={{minWidth: {xs: '80vw', md: '400px'}}}
            onChange={e => setNote(e.target.value)} value={note}
          />
          <ButtonGroup>
            {renderAccept({onClick: onClickAccept})}
            {renderReject({onClick: onClickReject})}
          </ButtonGroup>
        </Grid>
      }
    </PageCard>
  )
}

function SingleSubmissionCard({submissionId}){
  const submissionQuery = useGetSubmission(submissionId);
  return <QueryLoader query={submissionQuery} propName="submission" loading={() => <DetailCardSkeleton/>}>
    <LoadedSingleSubmissionCard/>
  </QueryLoader>

}

function AllSubmissionsLoader({children}) {
  const allSubmissionsQuery = useGetAllSubmissions();
  return <QueryLoader query={allSubmissionsQuery} propName="submissions" loading={() => <ListCardSkeleton/> }>
    {children}
  </QueryLoader>
}

function SubmissionPage(){
  const { submissionId } = useParams();
  return <Page>
    <TitleCard/>
    {submissionId
      ? <SingleSubmissionCard submissionId={submissionId}/>
      : <AllSubmissionsLoader><SubmissionsTable title="All Submissions"/></AllSubmissionsLoader>
    }
  </Page>
}

export default SubmissionPage;