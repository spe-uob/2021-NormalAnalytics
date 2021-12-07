import React, { Component } from "react";

import "./Sidebar.css"
import {Link, withRouter} from "react-router-dom";

class Sidebar extends React.Component {
  render() {
    return (
        <div className="sidebar">
            <Link to="#" className="sidebar-link">Change Student</Link>
            <Link to="#" className="sidebar-link">General</Link>
            <Link to="#" className="sidebar-link">All Data for Student</Link>
        </div>
    );
  }
}

export default withRouter (Sidebar);