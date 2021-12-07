import React, { Component } from "react";

import "./SideBar.css"

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar-container">
        <div className="sidebar">
          <a className="sidebar-link" href="/student">Change student</a>
          <a className="sidebar-link" href="/dashboard">General</a>
          <a className="sidebar-link" href="/alldata">All data for student</a>
        </div>
      </div>
    );
  }
}