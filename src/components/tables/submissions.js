import React from 'react';

import { Link } from 'react-router-dom';
import { Button, Link as MuiLink } from '@mui/material';

import Table from './table';
import { ISOToReadableString } from '@jeffdude/frontend-helpers/dist/date';
import { StatusIndicator } from '../submission-list';

const columns = [
  {
    headerName: 'Link',
    field: '_id',
    width: 90,
    sortable: false,
    renderCell: ({value}) => <Button variant="contained" color="secondary" component={Link} to={"/submission/" + value}>View</Button>
  },
  {
    headerName: 'Date',
    field: 'createdAt', 
    width: 200,
    type: 'dateTime',
    valueFormatter: ({value}) => ISOToReadableString(value),
  },
  {
    headerName: 'Status',
    field: 'status',
    width: 150,
    renderCell: ({value}) => <StatusIndicator status={value} hint={false}/>
  },
  {
    headerName: 'Challenge',
    field: 'challenge',
    width: 250,
    renderCell: ({value}) => <MuiLink component={Link} to={"/challenge/" + value._id}>{value.title}</MuiLink>
  },
  {
    headerName: 'Author',
    field: 'author',
    width: 150,
    renderCell: ({value}) => <MuiLink component={Link} to={"/user/" + value._id}>{value.fullName}</MuiLink>
  },
]

function SubmissionTable({submissions, title}){
  return (
    <Table title={title} rows={submissions} columns={columns}/>
  )
}

export default SubmissionTable;