import React from 'react';

import { useParams, Link } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { QueryLoader, useGetAuthState } from '@jeffdude/frontend-helpers';

import Page from '../components/page';
import TitleCard from '../components/title-card';
import { DetailCardSkeleton, ListCardSkeleton } from '../components/loading-page';
import { useGetTransactionById, useGetAllTransactions } from '../hooks/transactions';
import TransactionsTable from '../components/tables/transactions';


function TransactionPage(){
  const { transactionId } = useParams();
  const admin = useGetAuthState() === 500;
  const useGetTransaction = () => useGetTransactionById(transactionId)

  return <Page>
    <TitleCard>{transactionId && admin && <MuiLink component={Link} to={"/transactions"}>View All Transactions</MuiLink>}</TitleCard>
    { transactionId
      ? <QueryLoader query={useGetTransaction} propName="transactions" generateQuery loading={() => <DetailCardSkeleton/>}>
        <TransactionsTable single admin={admin}/>
      </QueryLoader>
      : <QueryLoader query={useGetAllTransactions} propName="transactions" generateQuery loading={() => <ListCardSkeleton/>}>
        <TransactionsTable admin={admin}/>
      </QueryLoader>
    }
  </Page>
}

export default TransactionPage;