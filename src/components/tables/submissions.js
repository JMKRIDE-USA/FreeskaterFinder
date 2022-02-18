import React from 'react';

import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { TableCard } from './table';
import { ISOToReadableString } from '@jeffdude/frontend-helpers/dist/date';
import { StatusIndicator } from '../submission-list';

const columns = [
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
    renderCell: ({value}) => <Button component={Link} to={"/challenge/" + value._id}>{value.title}</Button>
  },
  {
    headerName: 'Author',
    field: 'author',
    width: 150,
    renderCell: ({value}) => <Button component={Link} to={"/user/" + value._id}>{value.fullName}</Button>
  },
  {
    headerName: 'Link',
    field: '_id',
    width: 150,
    renderCell: ({value}) => <Button variant="contained" color="secondary" component={Link} to={"/submission/" + value}>View</Button>
  }
]

function SubmissionTable({submissions, title}){
  return (
    <TableCard title={title} length={submissions.length}>
      <DataGrid
        getRowId={row => row._id}
        rows={submissions}
        columns={columns}
      />
    </TableCard>
  )
}

export default SubmissionTable;