import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import Sidebar from "../SideBar/SideBar";
import "./Dashboard.css"
import axios from "axios";


function DashboardComponent(props) {
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
             <Sidebar />
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

export default withRouter(DashboardComponent);