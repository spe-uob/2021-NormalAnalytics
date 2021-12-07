import React from 'react';
import { withRouter } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import "./Student.css"

class Student extends React.Component {
  selectedItem = null;
  tutorAndTutees = null;

  handleChange = (e) => {
    this.selectedItem = e;
  }

  handleClick = () => {
    if (this.selectedItem != null) {
      this.props.history.push({
        pathname: '/dashboard',
        state: {"studentUsername": this.selectedItem, "tutorAndTutees": this.tutorAndTutees}
      })
    }
  }

  render(){
    const {state} = this.props.location;
    this.tutorAndTutees = state;

    return (
    <div className="fullpage">
      <div className="login">
        <span className="title">Choose a Student</span>
        <Dropdown options={state["students"]} onChange={this.handleChange} value={state["students"][0]} className="dropdown-students" />
        <button className="student-button" onClick={this.handleClick.bind(this)}>Next</button>
      </div>
     </div>)
  }
}

export default withRouter (Student);
