import { useGetQuery, useCreateMutation } from '@jeffdude/frontend-helpers';

const useGetReferralCodeQuery = (endpoint, options) => useGetQuery(endpoint, 'referralCodes', options);

export function useCreateReferralCode(){
  return useCreateMutation({
    endpoint: "referralCodes/create",
    method: "POST"
  })
}

export function useGetUserReferralCodes(userId){
  return useGetReferralCodeQuery("referralCodes/get?userId=" + userId)
}
export function useGetReferralCodeById(referralCodeId){
  return useGetReferralCodeQuery("referralCodes/get?referralCodeId=" + referralCodeId)
}
export function useGetReferralCodeOptions(){
  return useGetReferralCodeQuery("referralCodes/options")
}
export function useGetAllReferralCodes(){
  return useGetReferralCodeQuery("referralCodes/get/all")
}