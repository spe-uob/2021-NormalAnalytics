import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import WelcomePage from './components/WelcomePage/WelcomePage';
import Login from './components/Login/Login';
import Student from './components/Student/Student'
import Dashboard from './components/Dashboard/Dashboard'
import NotFound from './components/NotFound/NotFound'

class App extends Component {

  state = {};

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
