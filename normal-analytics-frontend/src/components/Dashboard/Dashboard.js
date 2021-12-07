import React from 'react';
import {withRouter} from 'react-router-dom';
import 'react-dropdown/style.css';

import "./Dashboard.css"

class Dashboard extends React.Component {
  render(){
    return (
    <div className="fullpage">
        <div className="login">
            <h1>Dashboard</h1>
        </div>
    </div>)
  }
}

export default withRouter (Dashboard);
