import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import "./Dashboard.css"
import axios from "axios";
import {BarChart, Bar, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer} from "recharts";

let runOnce = false;

function DashboardComponent(props) {
    let passedState = props.location.state;
    let tutorAndTutees = passedState.tutorAndTutees;

    let studentName = Object.keys(passedState["studentNameAndUsername"])[0];
    let tutorUsername = passedState["tutorAndTutees"]["tutorUsername"]
    let studentUsername = passedState["studentNameAndUsername"][Object.keys(passedState["studentNameAndUsername"])[0]];

    let handleClickSelect = () => {
        if (runOnce === false) {
            runOnce = true;

            Object.keys(tutorAndTutees.groupAndStudents).forEach(key => {
                let liElement = document.createElement("li");
                let liElementText = document.createTextNode(key);
                liElement.appendChild(liElementText);
                liElement.id = key + "-li";
                liElement.className = "studentGroupDropdown";
                document.getElementById("tutorGroups").appendChild(liElement);

                let ulElement = document.createElement("ul");
                ulElement.id = key + "-ul";
                document.getElementById(key + "-li").appendChild(ulElement);


                Object.values(tutorAndTutees.groupAndStudents[key]).forEach(arrayOfStudentNameAndUsernameObjects => {
                    Object.keys(arrayOfStudentNameAndUsernameObjects).forEach(eachStudentName => {

                        let username = arrayOfStudentNameAndUsernameObjects[eachStudentName];
                        let studentNameAndUsername = {};
                        studentNameAndUsername[eachStudentName] = username;

                        let subLiElement = document.createElement("li");
                        let subLiElementText = document.createTextNode(eachStudentName);
                        subLiElement.appendChild(subLiElementText);
                        subLiElement.id = "studentNameDropdown";
                        subLiElement.onclick = function() {
                            props.history.replace({
                                pathname: '/dashboard',
                                state: {"tutorAndTutees": tutorAndTutees, "studentNameAndUsername": studentNameAndUsername}
                            })

                            document.getElementById("dropdown-button").hidden = true;
                            window.location.reload();
                        };
                        document.getElementById(key + "-ul").appendChild(subLiElement);
                    })

                })
            })
        } else {
            console.log("lol");
        }
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

    // get all student data
    const [data, setData] = useState();
    const [unitData, setUnitData] = useState();
    const url = "/database/getAllStudentData/" + studentUsername;
    let unitAverageData = [];
    useEffect(() => {
        axios(url)
            .then((res) => {
                setData(res.data);

                for (let i = 0; i < res.data.unitData.length; i++) {
                    let unitNameAndAverage = {};
                    unitNameAndAverage["name"] = res.data.unitData[i].name;
                    unitNameAndAverage["studentUnitAverage"] = res.data.unitData[i].unitAverage;
                    unitNameAndAverage["cohortUnitAverage"] = res.data.unitData[i].cohortAverage;
                    unitAverageData.push(unitNameAndAverage);
                }
                setUnitData(unitAverageData);

                console.log(res.data);

            })
            .catch((err) => console.log(err))
    }, []);

    return (
        <div className="dashboard">
            <div className="nav-bar">
                <ul className="dropdown student-dropdown">
                    <li id="dropdown-button" onClick={handleClickSelect.bind(this)}>Select Student
                        <ul id="tutorGroups"/>
                    </li>
                </ul>
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
                <div className="dash-section-area">
                    <div className="dash-section first">
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

                    <div className="dash-section">

                        {/*graph showing unit average*/}
                        <ResponsiveContainer width="75%" height="90%">

                            <BarChart
                                data={unitData}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <XAxis dataKey="name"/>
                                <YAxis domain={[0, 100]}/>
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="studentUnitAverage" fill="#8884d8" />
                                <Bar dataKey="cohortUnitAverage" fill="#FFBF00" />
                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                    <div className="dash-section "/>
                </div>
            </div>
        </div>
    );

}

export default withRouter(DashboardComponent);