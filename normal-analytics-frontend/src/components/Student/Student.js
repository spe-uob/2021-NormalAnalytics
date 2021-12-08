import React from 'react';
import { withRouter } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import "./Student.css"

class Student extends React.Component {
  selectedItem = null;
  tutorAndStudents = null;

  handleChange = (e) => {
    this.selectedItem = e;
  }

  handleClick = () => {
    if (this.selectedItem != null) {
      this.props.history.push({
        pathname: '/dashboard',
        state: {"studentUsername": this.selectedItem, "tutorUsername": this.tutorAndStudents}
      })
    }
  }

  render(){
    const {state} = this.props.location;
    this.tutorAndStudents = state;

    return (
    <div className="fullpage">
      <div className="login">
        <p>Choose a student</p>
        <Dropdown options={state["students"]} onChange={this.handleChange} value={state["students"][0]} placeholder="Select a student" />
        <button className="button" onClick={this.handleClick.bind(this)}>Next</button>
      </div>
     </div>)
  }
}

export default withRouter (Student);
