import React from 'react';

import Table from './table';


const columns=[
  {
    headerName: 'Code',
    field: 'code',
    width: 150,
  },
  {
    headerName: 'Usage Count',
    field: 'usageCount',
    width: 90,
  },
]

function ReferralCodesTable({referralCodes, title}){
  return (
    <Table title={title} rows={referralCodes} columns={columns}/>
  )
}

export default ReferralCodesTable;