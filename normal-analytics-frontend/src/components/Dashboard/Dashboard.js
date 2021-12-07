import React from 'react';
import { withRouter } from 'react-router-dom';
import 'react-dropdown/style.css';

import "./Dashboard.css"

import Sidebar  from '../SideBar/SideBar';

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
        <div>
        <Sidebar />
         
                <h2>Search</h2>
                <div class="clearfix"></div>
              
              <div class="x_content">
                <form id="search_form" class="form-horizontal form-label-left" /> 
                  <div class="row">
                  <div class="form-group col-md-4">
                    <label class="control-label">Name</label>
                    <br />
                    <input type="text" />  
                     </div>
                  <div class="form-group col-md-4">
                    <label class="control-label">Student number</label>
                    <br />
                    <input type="text" /> 
                  </div>
                  <div class="form-group col-md-4">
                    <label class="control-label">Username</label>
                    <br />
                    <input type="text" /> 
                  </div>

                </div>
              </div>
          
            <div class="form-group col-md-3">
              <label class="control-label">Date from</label>
              <br />
            </div>
          
          <div class="form-group col-md-3">
            <label class="control-label">Date to</label>
            <br />
          </div>
      
            <div>
                  <button>Search</button>
            </div>  
      </div>
  
        
        
    )
  } 
}
//export default LogIn;
export default withRouter (Dashboard);
