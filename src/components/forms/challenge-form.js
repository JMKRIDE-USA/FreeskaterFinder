import React from 'react';

import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { invalidateJFHCache } from '@jeffdude/frontend-helpers';

import PageCard from '../page-card';
import { makeDateField, makeTextField, makeYesNoField } from './fields';
import useMakeForm from '../../hooks/form';
import { Button, Typography } from '@mui/material';
import { useSubmitChallenge } from '../../hooks/challenges';
import { ChallengeSubmissionList } from '../submission-list';

/*
  "NUMBER",                                 // Number
  "YEAR",                                   // String
  "DATE",                                   // String - iso format
  "DATETIME",                               // String - iso format
  "SWITCH",                                 // String, Options: each selectable choice
  "LEGAL_CHECK",                            // Boolean - has been checked
  "YES_NO",                                 // Boolean
  "EMAIL",                                  // String - with validation
  "URL",                                    // String - with validation
  "TEXT_SHORT", "TEXT_MEDIUM", "TEXT_LONG", // String
*/

const makeStateList = (fields) => fields.map(({_id : key, title : label, fieldType, required}) => {
  const customizers = (() => {
    switch(fieldType){
      case 'TEXT_SHORT':
      case 'TEXT_MEDIUM':
      case 'TEXT_LONG':
        return {
          component: makeTextField(
            {key, label,
            validation: required ? {required: 'This field is required.'} : {}}
          ),
        }
      case 'YEAR':
        return {
          component: makeTextField({key, label, validation: {
            validate: (value) => (parseInt(value) && 1960 < parseInt(value)) || 'Invalid Year',
            min: {value: 1900, message: "Invalid Year"},
            ...required ? {required: 'This field is required.'} : {}}
          }),
        }
      case 'DATE':
        return {
          component: makeDateField({key, label, validation: {}}),
        }
      case 'YES_NO':
        return {
          component: makeYesNoField({key, label, validation: required ? {required: "This field is required"} : {}}),
          formatFn: i => i === 'yes',
        }
      default:
        throw Error("Unrecognized field type: " + JSON.stringify({fieldType, label}))
    }
  })()
  return {
    key, label, formatFn: i => i, initialState: '',
    ...customizers,
  }
})

function OpenChallengeFormCard({challenge}) {
  const stateList = makeStateList(challenge.structure)
  const submitChallenge = useSubmitChallenge({challengeId: challenge._id});
  const renderForm = useMakeForm({
    actionFn: submitChallenge,
    onSuccess: invalidateJFHCache, buttonText: "Submit",
    stateList, backButton: () => <Button component={Link} to="/">Back to Home</Button>,
    sx: {width: "min(90vw, 900px)"},
  })
  return <PageCard header={
    <Grid container direction="column" sx={{
      maxWidth: "800px", alignItems: 'center',
    }}>
      <Typography variant="h4" sx={{mb:2}}>{challenge.title}</Typography>
      <Typography variant="subtitle2">{challenge.longDescription}</Typography>
    </Grid>}
  >{renderForm()}</PageCard>
}

function ChallengeFormCard({challenge}){
  if(challenge.submissions.length && !challenge.allowMultipleSubmission)
    return <ChallengeSubmissionList challenge={challenge}/>
  return <OpenChallengeFormCard {...{challenge}}/>
}

export default ChallengeFormCard;