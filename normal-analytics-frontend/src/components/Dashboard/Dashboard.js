import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import "./Dashboard.css"
import axios from "axios";
import {BarChart, Bar, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer} from "recharts";

function DashboardComponent(props) {
    let passedState = props.location.state;
    let tutorAndTutees = passedState.tutorAndTutees;
    let runOnce = passedState.runOnce;

    let tutorUsername = passedState["tutorAndTutees"]["tutorUsername"]
    let studentName = Object.keys(passedState["studentNameAndUsername"])[0];
    let studentUsername = passedState["studentNameAndUsername"][Object.keys(passedState["studentNameAndUsername"])[0]];
    let token = passedState["token"];

    axios.defaults.headers.common["token"] = token;

    let handleClickSelect = () => {
        if (runOnce === false) {
            runOnce = true;

            Object.keys(tutorAndTutees.groupAndStudents).forEach(groupName => {
                let liElement = document.createElement("li");
                let liElementText = document.createTextNode(groupName);
                liElement.appendChild(liElementText);
                liElement.id = groupName + "-li";
                liElement.className = "studentGroupDropdown";
                document.getElementById("tutorGroups").appendChild(liElement);

                let ulElement = document.createElement("ul");
                ulElement.id = groupName + "-ul";
                document.getElementById(groupName + "-li").appendChild(ulElement);


                Object.values(tutorAndTutees.groupAndStudents[groupName]).forEach(studentObject => {
                    Object.keys(studentObject).forEach(studentName => {

                        let studentUsername = studentObject[studentName];
                        let studentNameAndUsername = {};
                        studentNameAndUsername[studentName] = studentUsername;

                        let subLiElement = document.createElement("li");
                        let subLiElementText = document.createTextNode(studentName);
                        subLiElement.appendChild(subLiElementText);
                        subLiElement.className = "studentNameDropdown";
                        subLiElement.onclick = function () {

                            props.history.replace(`/reload`);
                            setTimeout(() => {
                                props.history.replace({
                                    pathname: '/dashboard',
                                    state: {
                                        "tutorAndTutees": tutorAndTutees,
                                        "studentNameAndUsername": studentNameAndUsername,
                                        "runOnce": false,
                                        "token": token
                                    }
                                })
                            });
                        };
                        document.getElementById(groupName + "-ul").appendChild(subLiElement);
                    })

                })
            })
        }
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

    // get all student data
    const [allStudentData, setAllStudentData] = useState();
    const [unitData, setUnitData] = useState(); // data taken from allStudentData formatted for graphing
    const url = "/database/getAllStudentData/" + studentUsername;
    let unitAverageData = [];
    useEffect(() => {
        axios(url)
            .then((res) => {
                setAllStudentData(res.data);

                for (let i = 0; i < res.data.unitData.length; i++) {
                    let unitNameAndAverage = {};
                    unitNameAndAverage["name"] = res.data.unitData[i].name;
                    unitNameAndAverage["Student Unit Average"] = res.data.unitData[i].unitAverage;
                    unitNameAndAverage["Cohort Unit Average"] = res.data.unitData[i].cohortAverage;
                    unitAverageData.push(unitNameAndAverage);
                }
                setUnitData(unitAverageData);

            })
            .catch((err) => console.log(err))
    }, []);

    return (
        <div className="dashboard">
            <div className="nav-bar">
                <ul className="student-dropdown">
                    <li className="student-dropdown-button" onClick={handleClickSelect.bind(this)}>Select student
                        <ul id="tutorGroups"/>
                    </li>
                </ul>
                <span className="nav-item">Current student: {studentName}</span>
                <span className="nav-item">Tutor logged in: {tutorUsername}</span>
                <span className="nav-item" onClick={handleClickLogOut.bind(this)}>Log out</span>
            </div>

            <div className="dashboard-content">
                <div className="sidebar">
                    <button className="sidebar-link" >General</button>
                    <button className="sidebar-link" onClick={handleClickAttendance.bind(this)}>Attendance</button>
                </div>
                <div className="dash-section-area">
                    <div className="dash-section dash-section-full">
                        <table className="main-table">
                            {
                                // loop through each unit a student studies and set up tables for each
                                allStudentData && allStudentData["unitData"].map((unit) => {
                                    return (
                                        <table id={unit.name} className="sub-table">
                                            <tr className="table-headers">
                                                <td>{unit.name}</td>
                                                <td/>
                                                <td>Score</td>
                                                <td/>
                                                <td>Weight (%)</td>
                                            </tr>

                                            {
                                                // loop through each assessment for unit in current iteration and populate
                                                // row for each with name, score and weight
                                                unit.scores.map((assessment) => {
                                                    return (
                                                        <tr>
                                                            <td>{assessment.name}</td>
                                                            <td/>
                                                            <td>{assessment.score}</td>
                                                            <td/>
                                                            <td>{assessment.weight * 100}</td>

                                                        </tr>
                                                    )
                                                })
                                            }
                                        </table>
                                    )
                                })
                            }

                            {
                                // loop through each unit a student studies and set up tables for each
                                allStudentData && allStudentData["unitData"].map((unit) => {
                                    return (
                                        <table id={unit.name} className="sub-table">
                                            <tr className="table-headers">
                                                <td>{unit.name}</td>
                                                <td/>
                                                <td>Score</td>
                                                <td/>
                                                <td>Weight (%)</td>
                                            </tr>

                                            {
                                                // loop through each assessment for unit in current iteration and populate
                                                // row for each with name, score and weight
                                                unit.scores.map((assessment) => {
                                                    return (
                                                        <tr>
                                                            <td>{assessment.name}</td>
                                                            <td/>
                                                            <td>{assessment.score}</td>
                                                            <td/>
                                                            <td>{assessment.weight * 100}</td>

                                                        </tr>
                                                    )
                                                })
                                            }
                                        </table>
                                    )
                                })
                            }

                            {
                                // loop through each unit a student studies and set up tables for each
                                allStudentData && allStudentData["unitData"].map((unit) => {
                                    return (
                                        <table id={unit.name} className="sub-table">
                                            <tr className="table-headers">
                                                <td>{unit.name}</td>
                                                <td/>
                                                <td>Score</td>
                                                <td/>
                                                <td>Weight (%)</td>
                                            </tr>

                                            {
                                                // loop through each assessment for unit in current iteration and populate
                                                // row for each with name, score and weight
                                                unit.scores.map((assessment) => {
                                                    return (
                                                        <tr>
                                                            <td>{assessment.name}</td>
                                                            <td/>
                                                            <td>{assessment.score}</td>
                                                            <td/>
                                                            <td>{assessment.weight * 100}</td>

                                                        </tr>
                                                    )
                                                })
                                            }
                                        </table>
                                    )
                                })
                            }

                            {
                                // loop through each unit a student studies and set up tables for each
                                allStudentData && allStudentData["unitData"].map((unit) => {
                                    return (
                                        <table id={unit.name} className="sub-table">
                                            <tr className="table-headers">
                                                <td>{unit.name}</td>
                                                <td/>
                                                <td>Score</td>
                                                <td/>
                                                <td>Weight (%)</td>
                                            </tr>

                                            {
                                                // loop through each assessment for unit in current iteration and populate
                                                // row for each with name, score and weight
                                                unit.scores.map((assessment) => {
                                                    return (
                                                        <tr>
                                                            <td>{assessment.name}</td>
                                                            <td/>
                                                            <td>{assessment.score}</td>
                                                            <td/>
                                                            <td>{assessment.weight * 100}</td>

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
                        {/*graph showing student unit average vs cohort unit average*/}
                        <ResponsiveContainer width="75%" height="90%">
                            <BarChart
                                data={unitData}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <XAxis dataKey="name"/>
                                <YAxis domain={[0, 100]}/>
                                <Tooltip cursor={{fill: '#cccccc'}} />
                                <Legend />
                                <Bar dataKey="Student Unit Average" fill="#ffd803" />
                                <Bar dataKey="Cohort Unit Average" fill="#bae8e8"  />
                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                    <div className="dash-section">
                        {/*graph showing student unit average vs cohort unit average*/}
                        <ResponsiveContainer width="75%" height="90%">
                            <BarChart
                                data={unitData}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <XAxis dataKey="name"/>
                                <YAxis domain={[0, 100]}/>
                                <Tooltip cursor={{fill: '#cccccc'}} />
                                <Legend />
                                <Bar dataKey="Student Unit Average" fill="#ffd803" />
                                <Bar dataKey="Cohort Unit Average" fill="#bae8e8"  />
                            </BarChart>

                        </ResponsiveContainer>

                    </div>
                </div>
            </div>
        </div>
    );

}

export default withRouter(DashboardComponent);