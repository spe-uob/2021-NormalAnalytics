import React, { Component } from 'react';
import { Router } from 'react-router';
import { withRouter } from 'react-router-dom';
 
import "./LogIn.css"

class LogIn extends React.Component {
  constuctor() {
    this.routeChange = this.routeChange.bind(this);
    this.state = {value: ''};
  }


  handleClick = () => {
    this.props.history.push("/student");
    console.log('this is:', this);
  }
  
  render(){
    return (
    <body>
    <div className="fullpage">
      <div className="login">
        <p>Sign in</p>
        <form className="text">
        <label>
          Name:
          <input type="text" className="input"  />
        </label>
        <label>
          Password:
          <input type="text" className="input"  />
        </label>
        </form>
        <button className="button" onClick={this.handleClick.bind(this)}>
          Log In
        </button>
      </div>
     </div>
    </body>)
  } 
}
//export default LogIn;
export default withRouter (LogIn);
