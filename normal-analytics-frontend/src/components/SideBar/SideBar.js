import React, { Component } from "react";

import "./SideBar.css"

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar-container">
        <div className="sidebar">
          <a className="sidebar-link" href="/welcome">Home</a>
          <a className="sidebar-link">General</a>
        </div>
      </div>
    );
  }
}