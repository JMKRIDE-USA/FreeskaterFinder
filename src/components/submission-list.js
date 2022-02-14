import React, { useState } from 'react';

import List from '@mui/material/List'
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Grid, ListItemButton, ListItemSecondaryAction, Typography, IconButton, ListItemText, ListItemIcon } from '@mui/material'
import { ISOToReadableString } from '@jeffdude/frontend-helpers';

import { useDeleteSubmission } from '../hooks/challenges';
import PageCard from './page-card';

function StatusIndicator({status}) {
  const backgroundColor = {
    "PENDING": "#FFE240",
    "APPROVED": "#5FD83A",
    "DENIED": "#D84B3A",
  }[status]
  return <Grid container direction="row" sx={{alignItems: "center"}}>
    <Typography variant="subtitle2" sx={{mr: 2}}>Submission Status:</Typography>
    <div style={{padding: "3px 10px", borderRadius: "20px", backgroundColor}}><Typography variant="button">{status}</Typography></div>
  </Grid>
}

function SubmissionItem({submission}){
  const deleteSubmission = useDeleteSubmission({submissionId: submission._id})
  const [expanded, setExpanded] = useState(false);
  return <ListItemButton onClick={() => setExpanded(!expanded)}>
    <ListItemIcon>{expanded ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}</ListItemIcon>
    <ListItemText
      primary={"Submitted on " + ISOToReadableString(submission.createdAt)}
      secondary={<StatusIndicator status={submission.status}/>}
    />
    <ListItemSecondaryAction>
      <IconButton onClick={() => deleteSubmission()}>
        <DeleteIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItemButton>
}

function SubmissionList({challenge}) {
  return <PageCard header={<Typography variant="h6">My {challenge.title} Submissions</Typography>}>
    <List sx={{minWidth: "min(90vw, 400px)"}}>
      {challenge.submissions.map((submission, index) => <SubmissionItem submission={submission} key={index}/>)}
    </List>
  </PageCard>
} 

export default SubmissionList;