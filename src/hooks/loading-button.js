import React, { useEffect, useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import { LoadingButton } from '@mui/lab';

const LoadingButtonResult = ({sx, resultIcon, buttonText, ...props}) => (
  <LoadingButton
    sx={{...{maxWidth: "150px", minWidth: "135px"}, ...(sx ? sx : {})}}
    margin="normal" variant="contained" startIcon={resultIcon}
    {...props}
  >
    {buttonText}
  </LoadingButton>
)

const IconButtonResult = ({sx, resultIcon, loading, buttonText, ...props}) => (
  <IconButton {...props}>
    {loading 
      ? <CircularProgress size={30}/>
      : resultIcon
    }
  </IconButton>
)

function useMakeLoadingButton({doAction, buttonText, iconButton = false, icon, color, isFormButton = true, preProcessData = data => data, thenFn = () => null}) {

  const [submitted, setSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(undefined);

  const loading = submitted && submissionResult === undefined;

  useEffect(() => {
    if(submissionResult !== undefined){
      setTimeout(() => {
        setSubmissionResult(undefined);
        setSubmitted(false);
      }, submissionResult ? 1000 : 5000)
    }
  }, [submissionResult, setSubmissionResult, setSubmitted])

  const onClick = async (data) => {
    const newData = preProcessData(data);
    console.log("Submitting:", newData);
    setSubmitted(true)
    const queryResponse = await doAction(newData)
    console.log("Received:", queryResponse)
    setSubmissionResult(!!queryResponse?.result);
    thenFn(queryResponse?.result);
  }

  const ButtonComponent = iconButton ? IconButtonResult : LoadingButtonResult;
  const [resultButtonText, resultIcon, resultColor] = submissionResult === undefined
    ? [buttonText, icon, color ? color : "primary"]
    : submissionResult
      ? ["Success", <CheckCircleIcon fontSize="medium"/>, "success"]
      : ["Error", <ErrorIcon fontSize="medium"/>, "error"]

  return {
    onClick,
    loading,
    submissionResult,
    render: (props) => (
      <ButtonComponent
        loading={loading} color={resultColor} resultIcon={resultIcon} buttonText={resultButtonText}
        {...isFormButton ? {type: "submit"} : {onClick}} {...props}
      />
    )
  }
}

export default useMakeLoadingButton;