import React, { Component } from "react";

import "./Sidebar.css"

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar-container">
        <div className="sidebar">
          <a className="sidebar-link" href="/attendance"> Attendance records</a>
          <a className="sidebar-link" href="/alldata">All data </a>
          <a className="sidebar-link" href="/dashboard">General</a>
        </div>
      </div>
    );
  }
}