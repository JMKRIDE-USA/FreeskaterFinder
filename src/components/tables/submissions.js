import React from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';

import PageCard from '../page-card';

const columns = [
  {
    headerName: 'Date',
    field: 'createdAt', 
    width: 200,
    type: 'date',
  },
]

function SubmissionTable({submissions, title}){
  console.log({submissions})
  ///todo fix styling
  return (
    <PageCard header={<Typography variant="h6">{title}</Typography>} sx={{
      width: "min(90vw, 500px)",
      minHeight: "min(" + (submissions.length + 1) * 100 + "px,500px)"
    }}>
      <DataGrid
        getRowId={row => row._id}
        rows={submissions}
        columns={columns}
      />
    </PageCard>
  )
}

export default SubmissionTable;