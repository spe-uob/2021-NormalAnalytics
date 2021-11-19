import React, { Component } from 'react';

import "./WelcomePage.css"

 
class WelcomePage extends React.Component {
  handleClick = () => {
    console.log('this is:', this);
  }
  render(){
    return (
    <body>
    <div className="fullpage">
      <div className="login">
        <p>Personal tutors sign in</p>
        <button className="button" onClick={this.handleClick}>
          Log In
        </button>
      </div>
     </div>
    </body>)
  } 
}
export default WelcomePage;
