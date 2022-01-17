import React, { useEffect, useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { LoadingButton } from '@mui/lab';

function useMakeLoadingButton({buttonText, doAction, isFormButton = true, preProcessData = data => data, thenFn = () => null}) {

  const [submitted, setSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(undefined);

  const loading = submitted && submissionResult === undefined;
  let color = "primary";
  if(submissionResult !== undefined){
    color = submissionResult ? "success" : "error"
  }
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
    const { result } = await doAction(newData);
    setSubmissionResult(!!result);
    thenFn(result);
  }
  return {
    onClick,
    render: (props) => (
      <LoadingButton margin="normal" loading={loading} color={color} variant="contained" {...isFormButton ? {type: "submit"} : {onClick}} {...props}>
        {submissionResult === undefined && buttonText}
        {submissionResult === true && <><CheckCircleIcon fontSize="medium" sx={{mr:1}}/>Success!</>}
        {submissionResult === false && <><ErrorIcon fontSize="medium" sx={{mr:1}}/>Error</>}
      </LoadingButton>
    )
  }
}

export default useMakeLoadingButton;