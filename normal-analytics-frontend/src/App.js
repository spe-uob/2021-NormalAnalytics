import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import WelcomePage from './components/WelcomePage/WelcomePage';
import LogIn from './components/LogIn/LogIn';
import Student from './components/Student/Student'
import DashBoard from './components/DashBoard/DashBoard'

class App extends Component {

  state = {};

  componentDidMount() {
    setInterval(this.hello, 250);
  }

  hello = () => {
    fetch('/hello')
        .then(response => response.text())
        .then(message => {
          this.setState({message: message});
        });
  };

  render() {
    return (
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route path="/welcome">
                <WelcomePage />
              </Route>
              <Route path="/login">
                <LogIn />
              </Route>
              <Route path="/student">
                <Student />
              </Route>
              <Route path="/dashboard">
                <DashBoard />
              </Route>
            </Switch>  
          </BrowserRouter>
        </div>
    );
  }
}

export default App;
