import { useGetQuery } from '@jeffdude/frontend-helpers';

const useGetTransactionQuery = (endpoint, options) => useGetQuery(endpoint, 'transactions', options);

export function useGetUserTransactions(userId){
  return useGetTransactionQuery("transactions/get?populate=true&userId=" + userId)
}
export function useGetAllTransactions(){
  return useGetTransactionQuery("transactions/get?populate=true")
}
export function useGetTransactionById(transactionId){
  return useGetTransactionQuery("transactions/get?populate=true&transactionId=" + transactionId)
}