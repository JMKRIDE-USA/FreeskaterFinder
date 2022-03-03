import React from 'react';

import { DataGrid } from '@mui/x-data-grid';

import PageCard from '../page-card';

function Table({title, rows, columns}){
  const length = rows.length;
  const width = columns.map(c => c.width).reduce((prev, current) => prev + current, 0)
  return (
    <PageCard small headerRow title={title} sx={{display: 'flex', height: 'min(90vh, ' + parseInt(300 + 50 * length) + 'px)', minWidth: 'min(95vw, ' + (width + 100) + "px)"}}>
      <div style={{height: '100%', width: '100%', display: 'flex'}}>
        <div style={{flexGrow: 1}}>
          <DataGrid getRowId={row => row._id} rows={rows} columns={columns}/>
        </div>
      </div>
    </PageCard>
  )
}

export default Table;