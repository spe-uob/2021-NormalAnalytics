import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
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
        fetch("/user/logout",{headers : { "content-type" : "application/json; charset=UTF-8", "token":passedState["token"]}});
		props.history.push({
            pathname: '/login',
            state: passedState
        })
    }

    let handleClickAttendance = () => {
        props.history.push({
            pathname: '/attendance',
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
	axios.defaults.headers.common["token"] = passedState["token"];

    for (const [key, value] of Object.entries(studentObjects)) {
        if (studentName === key) {
            studentName = key
            studentUsername = value;
        }
    }

    // get all student data
    const [data, setData] = useState();
    const url = "/database/getAllStudentData/" + studentUsername;
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
                    <button className="nav-item dropdown-title" style={{border: "solid black"}} >Tutor logged in: {tutorUsername}</button>
                    <span className="nav-item dropdown-item" style={{border: "solid black"}} onClick={handleClickLogOut.bind(this)}>Log Out</span>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="sidebar">
                    <button className="sidebar-link" >General</button>
                    <button className="sidebar-link" onClick={handleClickAttendance.bind(this)}>Attendance</button>
                    <button className="sidebar-link" onClick={handleClickAllData.bind(this)}>All Data</button>
                </div>
                <div className="dash-section">
                    <table className="mainTable">
                        {
                            data && data["unitData"].map((unit) => {
                                return (
                                    <table id={unit.name} className="subTable">
                                        <tr>
                                            <td>{unit.name}</td>
                                            <td/>
                                            <td>Score</td>
                                        </tr>


                                        {
                                            unit.scores.map((assessment, key) => {
                                                console.log(key);

                                                return (
                                                  <tr>
                                                      <td>{assessment.name}</td>
                                                      <td/>
                                                      <td><td>{assessment.score}</td></td>
                                                  </tr>
                                                )
                                            })
                                        }
                                    </table>
                                )
                            })
                        }
                    </table>
                </div>
                <div className="dash-section alternate">Some graph can go here</div>
            </div>

        </div>
    );

}

export default withRouter(DashboardComponent);