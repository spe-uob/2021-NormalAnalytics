import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import WelcomePage from './components/WelcomePage/WelcomePage';
import Login from './components/Login/Login';
import Student from './components/Student/Student'
import Dashboard from './components/Dashboard/Dashboard'
import StudentAuth from './components/StudentAuth/StudentAuth'
import NotFound from './components/NotFound/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={WelcomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/student" component={Student} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/student-auth" component={StudentAuth} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>);
}

export default App;
