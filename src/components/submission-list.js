import React, { useState } from 'react';

import List from '@mui/material/List'
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link, Grid, ListItemButton, ListItemSecondaryAction, Typography, IconButton, ListItemText, ListItemIcon, ListItem, Collapse } from '@mui/material'
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
    <Typography variant="subtitle2" sx={{mr: 2}}>Status:</Typography>
    <div style={{padding: "3px 10px", borderRadius: "20px", backgroundColor}}><Typography variant="button">{status}</Typography></div>
  </Grid>
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
      <ListItemText
        primary={"Submitted on " + ISOToReadableString(submission.createdAt)}
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
        : <Link>See More</Link>
      }
    </ListItemButton>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <List component="div" disablePadding sx={{pl: 2}}>
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
    </Collapse>
  </>
}

function SubmissionList({challenge, ...props}) {
  const challengeFields = {}
  challenge.structure.forEach(({_id, ...field}) => challengeFields[_id] = field);

  return <PageCard header={<Typography variant="h6">My {challenge.title} Submission</Typography>}>
    <List>
      {challenge.submissions.map(
        submission => {
          submission.content.forEach( // janky frontend lookups because mongodb embedded schemas are weird :(
            (field, index) => submission.content[index].fieldObj = challengeFields[submission.content[index].field]
          )
          return submission;
        }
      ).map((submission, index) => (
        <SubmissionItem challengeFields={challengeFields} submission={submission} key={index} {...props}/>
      ))}
    </List>
  </PageCard>
} 

export default SubmissionList;