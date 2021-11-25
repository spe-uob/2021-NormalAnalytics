import React, { Component } from 'react';
import { Router } from 'react-router';
import { withRouter } from 'react-router-dom';

import "./WelcomePage.css"

 
class WelcomePage extends React.Component {
  constuctor() {
    this.routeChange = this.routeChange.bind(this);
  }


  handleClick = () => {
    this.props.history.push("/login");
    console.log('this is:', this);
  }
  render(){
    return (
    <body>
    <div className="fullpage">
      <div className="login">
        <p>Personal tutors sign in</p>
        <button className="button" onClick={this.handleClick.bind(this)}>
          Log In
        </button>
      </div>
     </div>
    </body>)
  } 
}
//export default WelcomePage;
export default withRouter (WelcomePage);
