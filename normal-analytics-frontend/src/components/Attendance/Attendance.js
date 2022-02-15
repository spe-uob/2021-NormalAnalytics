import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import "./Attendance.css"
import axios from "axios";


function Attendance(props) {
    let passedState = props.location.state;

    let handleClickChangeStudent = () => {
        props.history.push({
            pathname: '/student-auth',
            state: passedState
        })
    }

    let handleClickLogOut = () => {
        props.history.push({
            pathname: '/login',
            state: passedState
        })
    }

    let handleClickDashboard = ()=>{
        props.history.push({
            pathname: '/dashboard',
            state: passedState
        })
    }
    
    let handleClickAllData = () =>{
        props.history.push({
            pathname: '/alldata',
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

    const [data, setData] = useState();
    const url = "/database/getUnits/" + studentUsername;
    useEffect(() => {
        axios(url)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.log(err))
    }, []);

    // loop through each unit taken by the given student and work out 'Unit Name: Attendance:
    let unitNameAndAttendance = {};
    data && Object.keys(data.units).forEach(function(key) {
        let unitCode = data.units[key].code;
        let attendanceUrl = "/database/getAttendance/" + unitCode + "/" + studentUsername;

        fetch(attendanceUrl)
            .then(response => response.json())
            .then(message => {
                unitNameAndAttendance[data.units[key].name] = message;
            });
    });

    console.log(unitNameAndAttendance);

    return (
        <div className="dashboard">
         <div className="nav-bar">
            <button className="nav-item left" onClick={handleClickChangeStudent.bind(this)}>Change Student</button>
             <button className="nav-item">Current student: {studentName}</button>
             <div className="dropdown">
             <button className="nav-item" style={{border: "solid black"}} >Tutor logged in: {tutorUsername}</button>
                <div className="dropdown-content">
                     <a className="log-out" onClick={handleClickLogOut.bind(this)}>Log Out</a>
                 </div>
             </div>
         </div>

         <div className="dashboard-content">
         <div className="sidebar">
                <button className="sidebar-link" onClick={handleClickDashboard.bind(this)} >General</button>
                <button className="sidebar-link" >Attendance</button>
                <button className="sidebar-link" onClick={handleClickAllData.bind(this)}>All Data</button>
            </div>
             <div className="section">
                 <table>
                     <tr>
                         <th>Units</th>
                     </tr>
                     {data && data["units"].map((val, key) => {
                         return (
                             <tr key={key}>
                                 <td>{val.name}</td>
                             </tr>
                         )
                     })}
                 </table>
             </div>
         </div>

        </div>
    );
}

export default withRouter(Attendance);