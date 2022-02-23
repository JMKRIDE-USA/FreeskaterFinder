import { useGetQuery } from '@jeffdude/frontend-helpers';
import { useCreateMutation } from '@jeffdude/frontend-helpers/dist/data';

const useGetTransactionQuery = (endpoint, options) => useGetQuery(endpoint, 'transactions', options);

export function useGetUserTransactions(userId){
  return useGetTransactionQuery("transactions/get?populate=true&userId=" + userId)
}
export function useGetReferralCodeTransactions(referralCodeId){
  return useGetTransactionQuery("transactions/get?populate=true&referralCodeId=" + referralCodeId)
}
export function useGetAllTransactions(){
  return useGetTransactionQuery("transactions/get?populate=true")
}
export function useGetTransactionById(transactionId){
  return useGetTransactionQuery("transactions/get?populate=true&transactionId=" + transactionId)
}

export function useCreateReferralCodeUsage(){
  return useCreateMutation({
    endpoint: "referralCodes/usage/create",
    method: "POST",
  })
}

export function useCreateAdminTransaction(){
  return useCreateMutation({
    endpoint: "transaction/admin/create",
    method: "POST",
  })
}