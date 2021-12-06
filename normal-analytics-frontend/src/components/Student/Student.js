import React from 'react';
import { withRouter } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import "./Student.css"


const options = [
    'one', 'two', 'three'
  ]
const defaultOption = options[0];

class Student extends React.Component {
  constuctor() {
    this.routeChange = this.routeChange.bind(this);
    this.state = {value: ''};
  }


  handleClick = () => {
    this.props.history.push("/dashboard");
    console.log('this is:', this);
  }

  render(){
    return (
    <body>
    <div className="fullpage">
      <div className="login">
        <p>Choose a student, please</p>
        <Dropdown options={options} onChange={this._onSelect} 
        value={defaultOption} 
        placeholder="Select an option" />
        <button className="button" onClick={this.handleClick.bind(this)}>
          Next
        </button>
      </div>
     </div>
    </body>)
  } 
}
//export default LogIn;
export default withRouter (Student);
