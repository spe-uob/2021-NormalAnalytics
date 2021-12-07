import React from 'react';
import { withRouter } from 'react-router-dom';
import 'react-dropdown/style.css';
import { useTable } from 'react-table'

import Sidebar from '../SideBar/SideBar';

function AllData () {
  

    return (
        <div style={{ display: "flex", backgroundColor:"#b0e0e6" }}>
          <Sidebar />
        </div>
    )
  } 

export default withRouter (AllData);
