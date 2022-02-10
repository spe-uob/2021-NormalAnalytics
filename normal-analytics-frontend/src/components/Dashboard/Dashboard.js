import React from 'react';
import {withRouter} from 'react-router-dom';
import Sidebar from "../SideBar/SideBar";
import "./Dashboard.css"

function DashboardComponent(props) {
    let passedState = props.location.state;

    let handleClick = () => {
        props.history.push({
            pathname: '/student-auth',
            state: passedState
        })
    }

    let handleClickLogin = () => {
        props.history.push({
            pathname: '/login',
            state: passedState
        })
    }

    let studentObjects = passedState["tutorAndTutees"]["studentObjects"];
    let studentName = passedState["studentUsername"]["value"];
    let tutorUsername = passedState["tutorAndTutees"]["tutorUsername"]

    let studentUsername = null;
    for (const [key, value] of Object.entries(studentObjects)) {
        if (studentName === key) {
            studentName = key
            studentUsername = value;
        }
    }

    return (
        <div className="dashboard">

         <div className="nav-bar">
            <button className="nav-item left" onClick={handleClick.bind(this)}>Change Student</button>
             <button className="nav-item">Current student: {studentName}</button>
             <div className="dropdown">
                 <button className="nav-item" style={{border: "solid black"}} >Tutor logged in: {tutorUsername}</button>
                <div className="dropdown-content">
                     <a className="log-out" onClick={handleClickLogin.bind(this)}>Log Out</a>
                 </div>
             </div>
         </div>

         <div className="dashboard-content">
             <Sidebar />
         </div>

        </div>
    );
}

export default withRouter(DashboardComponent);