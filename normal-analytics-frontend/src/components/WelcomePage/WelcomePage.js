import React from 'react';
import {Link, withRouter} from 'react-router-dom';

import "./WelcomePage.css"
 
class WelcomePage extends React.Component {
  render(){
    return (
    <div className="fullpage">
      <div className="login">
        <p>Personal tutors sign in</p>
        <Link to="/login" className="button">Log In</Link>
      </div>
     </div>)
  } 
}

export default withRouter (WelcomePage);
