import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import WelcomePage from './components/WelcomePage/WelcomePage';
import Login from './components/Login/Login';
import Student from './components/Student/Student'
import Dashboard from './components/Dashboard/Dashboard'
import NotFound from './components/NotFound/NotFound'
import SideBar from './components/SideBar/SideBar'

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
                <Login />
              </Route>
              <Route path="/student">
                <Student />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path='*'>
                <NotFound />
              </Route>
            </Switch>  
          </BrowserRouter>
        </div>
    );
  }
}

export default App;
