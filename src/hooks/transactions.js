import { useGetQuery } from '@jeffdude/frontend-helpers';
import { useCreateMutation } from '@jeffdude/frontend-helpers/dist/data';

const useGetTransactionQuery = (endpoint, options) => useGetQuery(endpoint, 'transactions', options);

export function useGetUserTransactions(userId){
  return useGetTransactionQuery("transactions/user/id/" + userId)
}
export function useGetReferralCodeTransactions(referralCodeId){
  return useGetTransactionQuery("transactions/referralCode/id/" + referralCodeId)
}
export function useGetAllTransactions(){
  return useGetTransactionQuery("transactions/all")
}
export function useGetTransactionById(transactionId){
  return useGetTransactionQuery("transactions/id/" + transactionId)
}

export function useCreateReferralCodeUsage(){
  return useCreateMutation({
    endpoint: "referralCodes/usage/create",
    method: "POST",
  })
}

export function useCreateAdminTransaction(){
  return useCreateMutation({
    endpoint: "transactions/admin/create",
    method: "POST",
  })
}