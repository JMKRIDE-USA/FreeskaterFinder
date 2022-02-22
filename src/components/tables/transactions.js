import React from 'react';

import { Link } from 'react-router-dom';
import { Button, Typography, Link as MuiLink } from '@mui/material';
import { ISOToReadableString } from '@jeffdude/frontend-helpers';

import Table from './table';

const CellLink = ({to, children}) => <MuiLink component={Link} to={to}>{children}</MuiLink>

const columns = [
  {
    headerName: '',
    field: '_id',
    width: 80,
    renderCell: ({value}) => <Button variant="contained" color="secondary" component={Link} to={"/transaction/" + value}>View</Button>
  },
  {
    headerName: 'Date',
    field: 'createdAt',
    width: 200,
    type: 'dateTime',
    valueFormatter: ({value}) => ISOToReadableString(value)
  },
  {
    headerName: 'Amount',
    field: 'amount',
    width: 80,
    renderCell: ({value, row}) => <Typography variant="body1" sx={{
      padding: "3px 10px", borderRadius: "10px", 
      ...(row?.delta && {backgroundColor: {negative: "#D84B3A", positive: "#5FD83A"}[row.delta]})}}>{value}</Typography>
  },
  {
    headerName: 'Source',
    field: 'source',
    width: 150,
    renderCell: ({value}) => <CellLink to={"/user/" + value._id}>{value.fullName}</CellLink>
  },
  {
    headerName: 'Destination',
    field: 'destination',
    width: 150,
    renderCell: ({value}) => <CellLink to={"/user/" + value._id}>{value.fullName}</CellLink>
  },
  {
    headerName: 'Subject',
    field: 'submission',
    width: 150,
    renderCell: ({row}) => {
      if(row.submission) return <CellLink to={"/submission/" + row.submission}>Submission</CellLink>
      if(row.referralCode) return <CellLink to={"/referralCode/" + row.referralCode}>Referral Code</CellLink>
      return <></>
    }
  },
  {
    headerName: 'Reason',
    field: 'reason',
    width: 250,
  },
]

function TransactionsTable({transactions, title, single = false}){
  return <Table title={title} rows={transactions} columns={single ? columns.slice(1) : columns}/>
}

export default TransactionsTable;