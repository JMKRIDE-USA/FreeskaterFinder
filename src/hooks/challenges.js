import { useGetQuery, useCreateMutation } from '@jeffdude/frontend-helpers';


const useGetChallengeQuery = (endpoint, options) => useGetQuery(endpoint, 'challenges', options);

export const useGetAmbassadorApplication = () => useGetChallengeQuery("challenges/ambassadorApplication")

export const useSubmitChallenge = ({challengeId, options}) =>
  useCreateMutation({
    endpoint: "challenges/id/" + challengeId,
    method: "POST",
    options,
  })

export const useDeleteSubmission = ({submissionId}) =>
  useCreateMutation({
    endpoint: "submissions/id/" + submissionId,
    method: "DELETE"
  })