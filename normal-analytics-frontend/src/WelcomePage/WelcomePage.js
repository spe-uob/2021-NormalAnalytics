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
          <button onClick={this.handleClick}>
        Click me
      </button>
        </div>

     </div>
    
    </body>)
  } 
}
export default WelcomePage;
