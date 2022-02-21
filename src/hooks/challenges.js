import { useGetQuery, useCreateMutation } from '@jeffdude/frontend-helpers';


const useGetChallengeQuery = (endpoint, options) => useGetQuery(endpoint, 'challenges', options);

export const useGetAmbassadorApplication = () => useGetChallengeQuery("challenges/ambassadorApplication")
export const useGetChallenge = (challengeId) => useGetChallengeQuery("challenges/id/" + challengeId)
export const useGetAllChallenges = () => useGetChallengeQuery("challenges/all")

export const useGetSubmission = (submissionId) => useGetChallengeQuery("submission/id/" + submissionId)
export const useGetAllSubmissions = (submissionId) => useGetChallengeQuery("submissions/all")
export const useGetPendingSubmissions = () => useGetChallengeQuery("submissions/pending")

export const useSubmitChallenge = ({challengeId, options}) =>
  useCreateMutation({
    endpoint: "challenges/id/" + challengeId,
    method: "POST",
    options,
  })

export const useDeleteSubmission = ({submissionId}) =>
  useCreateMutation({
    endpoint: "submission/id/" + submissionId,
    method: "DELETE"
  })

export const useUpdateSubmission = ({submissionId}) => 
  useCreateMutation({
    endpoint: "submission/id/" + submissionId,
    method: "POST"
  })