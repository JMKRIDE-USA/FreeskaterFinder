import React from 'react';

import { Link } from 'react-router-dom';
import { Button, Link as MuiLink } from '@mui/material';
import { ISOToReadableString, authStateToString } from '@jeffdude/frontend-helpers';

import Table from './table';

const basicColumns = [
  {
    headerName: '',
    field: '_id',
    width: 90,
    sortable: false,
    renderCell: ({value}) => <Button variant="contained" color="secondary" component={Link} to={"/user/" + value}>View</Button>
  },
  {
    headerName: 'Name',
    field: 'fullName',
    width: 200,
  },
  {
    headerName: 'Role',
    field: 'permissionLevel',
    width: 110,
    valueFormatter: ({value}) => authStateToString(value)
  },
]
const fullColumns = [
  ...basicColumns,
  {
    headerName: 'Joined',
    field: 'createdAt',
    width: 200,
    type: 'dateTime',
    valueFormatter: ({value}) => ISOToReadableString(value)
  },
  {
    headerName: 'Num Friends',
    field: 'numFriends',
    width: 110,
  },
  {
    headerName: 'Location',
    field: 'location',
    width: '200',
    renderCell: ({value}) => <MuiLink component={Link} to={"/location/" + value._id}>{value.zip + ", " + value.country}</MuiLink>,
  }
]

function UserTable({users, title, basic = false}){
  return (
    <Table title={title} rows={users} columns={basic ? basicColumns : fullColumns}/>
  )
}

export default UserTable;