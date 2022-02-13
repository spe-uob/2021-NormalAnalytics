import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import "./WelcomePage.css"
 
class WelcomePage extends React.Component {
  render(){
    return (
    <div className="fullpage">
      <div className="login">
        <span className="title">Personal Tutor Sign In</span>
        <Link to="/login" className="button welcome-button">Sign In</Link>
      </div>
     </div>)
  } 
}

export default withRouter (WelcomePage);
