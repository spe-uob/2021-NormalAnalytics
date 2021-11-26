import React from 'react';
import { withRouter } from 'react-router-dom';
import 'react-dropdown/style.css';

import "./Dashboard.css"



class Dashboard extends React.Component {
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
            
        </div>
        </div>
    </body>)
  } 
}
//export default LogIn;
export default withRouter (Dashboard);
