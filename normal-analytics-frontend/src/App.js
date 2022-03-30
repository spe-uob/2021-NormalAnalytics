import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import WelcomePage from './components/WelcomePage/WelcomePage';
import Login from './components/Login/Login';
import Student from './components/Student/Student'
import Dashboard from './components/Dashboard/Dashboard'
import NotFound from './components/NotFound/NotFound'
import Attendance from './components/Attendance/Attendance';
import AllData from './components/AllData/AllData'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={WelcomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/student" component={Student} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/attendance" component={Attendance} />
        <Route exact path="/alldata" component={AllData} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>);
}

export default App;
