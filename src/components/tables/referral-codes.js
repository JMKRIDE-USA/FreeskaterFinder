import React from 'react';

import { Link } from 'react-router-dom';
import { Button, Link as MuiLink } from '@mui/material';

import Table from './table';

const columns=[
  {
    headerName: '',
    field: '_id',
    width: 80,
    renderCell: ({value}) => <Button variant="contained" color="secondary" component={Link} to={"/referral-code/" + value}>View</Button>
  },
  {
    headerName: 'Code',
    field: 'code',
    width: 150,
  },
  {
    headerName: 'Owner',
    field: 'owner',
    width: 200,
    renderCell: ({value}) => <MuiLink component={Link} to={"/user/" + value._id}>{value.fullName}</MuiLink>,
  },
  {
    headerName: 'Num Uses',
    field: 'usageCount',
    width: 100,
  },
]

function ReferralCodesTable({referralCodes, title}){
  return (
    <Table title={title} rows={referralCodes} columns={columns}/>
  )
}

export default ReferralCodesTable;