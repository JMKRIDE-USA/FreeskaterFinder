import React from 'react';

import { ISOToReadableString } from "@jeffdude/frontend-helpers";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import Table from './table';

const columns = [
  {
    headerName: 'Link',
    field: '_id',
    width: 90,
    sortable: false,
    renderCell: ({value}) => <Button variant="contained" color="secondary" component={Link} to={"/challenge/" + value}>View</Button>
  },
  {
    headerName: 'Creation Date',
    field: 'createdAt',
    width: 200,
    type: 'dateTime',
    valueFormatter: ({value}) => ISOToReadableString(value),
  },
  {
    headerName: 'Title',
    field: 'title',
    width: 250,
  },
];

function ChallengesTable({challenges, title}){
  return (
    <Table title={title} rows={challenges} columns={columns}/>
  )
}

export default ChallengesTable;