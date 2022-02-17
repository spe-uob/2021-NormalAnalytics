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
    for (const [key, value] of Object.entries(studentObjects)) {
        if (studentName === key) {
            studentName = key
            studentUsername = value;
        }
    }

    // get each unit a student studies
    const [data, setData] = useState();
    const url = "/database/getUnits/" + studentUsername;
    useEffect(() => {
        axios(url)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.log(err))
    }, []);

    // get assessments for each unit
    const [assessmentData, setAssessmentData] = useState([]);
    const [scoreData, setScoreData] = useState([]);

    let assessmentUrl = "/database/getAssessmentData/" + "COMS20006" + "/" + studentUsername;

    const getAssessmentDataFetch = async (assessmentUrl) => {
        const response = await fetch(assessmentUrl);
        const jsonData = await response.json();
        setAssessmentData(jsonData.names);
        setScoreData(jsonData.scores);
    };

    useEffect(() => {
        getAssessmentDataFetch(assessmentUrl);
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
                <div className="sidebar">
                    <button className="sidebar-link" >General</button>
                    <button className="sidebar-link" onClick={handleClickAttendance.bind(this)}>Attendance</button>
                    <button className="sidebar-link" onClick={handleClickAllData.bind(this)}>All Data</button>
                </div>
                <div className="section">
                    {data && data["units"].map((val, key) => {
                        return (
                            <table>
                                <tr key={key} className="table-header">
                                    <td className="column-header">Unit: {val.name}</td>
                                    <td></td>
                                    <td className="column-header">Score</td>
                                </tr>

                                {assessmentData.map((val, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{val}</td>
                                            <td></td>
                                            <td>{scoreData[key]}</td>
                                        </tr>
                                    )
                                })}

                                {/*{scoreData.map((val, key) => {*/}
                                {/*    return (*/}
                                {/*        <tr key={key}>*/}
                                {/*            <td>{val}</td>*/}
                                {/*        </tr>*/}
                                {/*    )*/}
                                {/*})}*/}
                            </table>
                        )
                    })}

                </div>
            </div>

        </div>
    );

}

export default withRouter(DashboardComponent);