import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List'
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { 
  Link, Grid, ListItemButton, ListItemSecondaryAction, Typography,
  IconButton, ListItemText, ListItemIcon, ListItem, Collapse,
} from '@mui/material'
import { ISOToReadableString } from '@jeffdude/frontend-helpers';

import { useDeleteSubmission } from '../hooks/challenges';
import PageCard from './page-card';

export function StatusIndicator({status, hint = true, sx = {}}) {
  const backgroundColor = {
    "PENDING": "#FFE240",
    "APPROVED": "#5FD83A",
    "DENIED": "#D84B3A",
  }[status]
  return <Grid container direction="row" sx={{alignItems: "center", ...sx}}>
    {hint && <Typography variant="subtitle2" sx={{mr: 2}}>Status:</Typography>}
    <div style={{padding: "3px 10px", borderRadius: "20px", backgroundColor}}><Typography variant="button">{status}</Typography></div>
  </Grid>
}

export function SubmissionDetailsList({submission}){
  return (
    <List disablePadding sx={{pl: 2}}>
      {submission.content.map(({fieldObj : field, content}, index) => (
        <ListItem key={index} dense sx={{...index % 2 ? {backgroundColor: "#dfdfdf"} : {} }} >
          <Grid container direction="row" sx={{width: "100%", justifyContent: "space-between"}}>
            <Typography variant="subtitle1"><b>{field.title}</b></Typography>
            <Typography variant="subtitle1" sx={{ml: 2}}>{
              field.fieldType !== 'YES_NO'
                ? content
                : content
                ? 'Yes'
                : 'No'
            }</Typography>
          </Grid>
        </ListItem>
      ))}
    </List>
  )
}

function SubmissionItem({submission, expandable = true, onClick = () => null}){
  const deleteSubmission = useDeleteSubmission({submissionId: submission._id})
  const [expanded, setExpanded] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const handleClick = (e) => {
    if(expandable) return setExpanded(!expanded)
    return onClick(e)
  }
  return <>
    <ListItemButton onClick={handleClick} selected={expanded} sx={{minWidth: "min(90vw, 550px)"}}>
      {expandable && <ListItemIcon>{expanded ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}</ListItemIcon>}
      <ListItemText disableTypography
        primary={<Typography variant="body1">{"Submitted on " + ISOToReadableString(submission.createdAt)}</Typography>}
        secondary={<StatusIndicator status={submission.status}/>}
      />
      {expandable 
        ? <ListItemSecondaryAction>
            <IconButton onClick={() => {
              if(confirmed) {
                deleteSubmission()
              } else { setConfirmed(true) }
            }}>
              <DeleteIcon />
              {confirmed && <Typography variant="button">?</Typography>}
            </IconButton>
          </ListItemSecondaryAction>
        : <Link>View</Link>
      }
    </ListItemButton>
    {expandable && <Collapse in={expanded}><SubmissionDetailsList submission={submission}/></Collapse>}
  </>
}

function AdminSubmissionItem({submission}){
  const navigate = useNavigate();
  const [ expanded, setExpanded ] = useState();
  return <>
    <ListItemButton onClick={() => setExpanded(!expanded)} sx={{minWidth: "min(90vw, 550px)"}}>
      <ListItemIcon>{expanded ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}</ListItemIcon>
      <ListItemText
        primary={submission.author.fullName + " - " + submission.challenge.title}
        secondary={"Submitted on " + ISOToReadableString(submission.createdAt)}
      />
      <ListItemSecondaryAction>
        <Link onClick={() => navigate("/submission/" + submission._id)}>View</Link>
      </ListItemSecondaryAction>
    </ListItemButton>
    <Collapse in={expanded}><SubmissionDetailsList submission={submission}/></Collapse>
  </>
}

function makeChallengeFields({challenge}){
  const challengeFields = {}
  challenge.structure.forEach(({_id, ...field}) => challengeFields[_id] = field);
  return challengeFields;
}

export function lookupSubmissionFields({submission, challengeFields}){
  if(!challengeFields) challengeFields = makeChallengeFields({challenge: submission.challenge})
  submission.content.forEach( // janky frontend lookups because mongodb embedded schemas are weird :(
    (_, index) => submission.content[index].fieldObj = challengeFields[submission.content[index].field]
  )
  return submission;
}

export function ChallengeSubmissionList({challenge, ...props}) {
  const challengeFields = makeChallengeFields({challenge}) 

  return <PageCard title={"My " + challenge.title + " Submission"}>
    <List>
      {challenge.submissions.map(submission => lookupSubmissionFields({submission, challengeFields})).map((submission, index) => (
        <SubmissionItem submission={submission} key={index} {...props}/>
      ))}
    </List>
  </PageCard>
} 

export function AdminSubmissionList({submissions, title, ...props}) {
  return <PageCard title={title} {...props}>
    {submissions.length
      ?  <List xs='auto'>
        {submissions.map(submission => lookupSubmissionFields({submission})).map(
          (submission, index) => <AdminSubmissionItem submission={submission} key={index}/>
        )}
      </List>
      : <Typography variant="body1">No Pending Submissions Found.</Typography>
    }
  </PageCard> 
}