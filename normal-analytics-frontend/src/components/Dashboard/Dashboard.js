import React from 'react';
import {withRouter} from 'react-router-dom';
import 'react-dropdown/style.css';
import { useTable } from 'react-table'
import "./Dashboard.css"
import Sidebar  from '../SideBar/SideBar';

 function Table({ columns, data }) {
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })
 
  // Render the UI for your table
  return (
    <table {...getTableProps()} >
      <thead>
     {headerGroups.map(headerGroup => (
       <tr {...headerGroup.getHeaderGroupProps()}>
         {headerGroup.headers.map(column => (
           <th {...column.getHeaderProps()}>{column.render('Header')}</th>
         ))}
       </tr>
     ))}
   </thead>
   <tbody {...getTableBodyProps()}>
     {rows.map(row => {
       prepareRow(row)
       return (
         <tr {...row.getRowProps()}>
           {row.cells.map(cell => {
             return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
           })}
         </tr>
       )
     })}
   </tbody>
    </table>
  )
 }
function Dashboard () {
  const data = React.useMemo(() =>
  [
  {
  name: 'Kim Parrish',
  address: '4420 Valley Street, Garnerville, NY 10923',
  date: '07/11/2020',
  order: '87349585892118',
  },
  {
  name: 'Michele Castillo',
  address: '637 Kyle Street, Fullerton, NE 68638',
  date: '07/11/2020',
  order: '58418278790810',
  },
  {
  name: 'Eric Ferris',
  address: '906 Hart Country Lane, Toccoa, GA 30577',
  date: '07/10/2020',
  order: '81534454080477',
  },
  {
  name: 'Gloria Noble',
  address: '2403 Edgewood Avenue, Fresno, CA 93721',
  date: '07/09/2020',
  order: '20452221703743',
  },
  {
  name: 'Darren Daniels',
  address: '882 Hide A Way Road, Anaktuvuk Pass, AK 99721',
  date: '07/07/2020',
  order: '22906126785176',
  },
  {
  name: 'Ted McDonald',
  address: '796 Bryan Avenue, Minneapolis, MN 55406',
  date: '07/07/2020',
  order: '87574505851064',
  },
  ],
  []
 )
 
 const columns = React.useMemo(
   () => [
   {
   Header: 'User Info',
   columns: [
   {
   Header: 'Name',
   accessor: 'name',
   },
   {
   Header: 'Address',
   accessor: 'address',
   },
   ],
   },
   {
   Header: 'Order Info',
   columns: [
   {
   Header: 'Date',
   accessor: 'date',
   },
   {
   Header: 'Order #',
   accessor: 'order',
   },
   ],
   },
   ],
   []
  )

    return (
        <div style={{ display: "flex", backgroundColor:"#b0e0e6" }}>
          <Sidebar />
            <div className="col-md-12 col-sm-12">
              <div className="title_left">
                  <h3>Search</h3>
              </div>
            </div>
          <div className="col-md-12 col-sm-12">
            <div className="x_panel">
              <div className="x_content">
                      <div className="row">
                      <div className="form-group col-md-4">
                      <label className="control-label">Name</label>
                      <br />
                      <input type="text" />  
                      </div>
                    <div className="form-group col-md-4">
                      <label className="control-label">Student number</label>
                      <br />
                      <input type="text" /> 
                    </div>
                    <div className="form-group col-md-4">
                      <label className="control-label">Username</label>
                      <br />
                      <input type="text" /> 
                    </div>
                    <div className="form-group col-md-3">
                      <label className="control-label">Date from</label>
                      <br />
                    </div>
                  
                  <div className="form-group col-md-3">
                    <label className="control-label">Date to</label>
                    <br />
                  </div>
                    </div>
                  </div>

            <div>
                  <button>Search</button>
            </div>
            </div>
          
            <hr />
            <div className="title_left">
                  <h3>Information for student compared to general cohord</h3>
            </div>
            <Table columns={columns} data={data} />
            </div>
      </div> 
    )
  } 

//export default LogIn;

export default withRouter (Dashboard);
