import React from 'react';
import { withRouter } from 'react-router-dom';
 
import "./Login.css"

class Login extends React.Component {
  constuctor() {
      this.routeChange = this.routeChange.bind(this);
  }

  handleClick = () => {
    const username = document.getElementById('input-username').value
    const password = document.getElementById('input-password').value

    fetch("/login", {
        method : "POST",
        headers : { "content-type" : "application/json; charset=UTF-8"},
        body : JSON.stringify({"username": username, "password": password}),
    })
            .then(response => response.text())
            .then(message => {
                console.log(message)
                let myObj = JSON.parse(message)
                console.log(myObj["token"])
            });

    // this.props.history.push("/student");
  }
  
  render(){
    return (
    <div className="fullpage">
      <div className="login">
        <p>Sign in</p>
        <form className="text">
        <label>
          Name:
          <input type="text" className="input" id="input-username" />
        </label>
        <label>
          Password:
          <input type="text" className="input" id="input-password" />
        </label>
        </form>
        <button className="button" onClick={this.handleClick.bind(this)}>
          Log In
        </button>
      </div>
     </div>)
  }
}
//export default Login;
export default withRouter (Login);
