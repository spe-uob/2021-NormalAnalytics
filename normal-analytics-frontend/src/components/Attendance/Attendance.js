import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import "./Attendance.css"
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from "recharts";
import moment from 'moment';


function Attendance(props) {
    let passedState = props.location.state;
    let tutorAndTutees = passedState.tutorAndTutees;
    let runOnce = passedState.runOnce;
    let token = passedState["token"];

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
                                    pathname: '/attendance',
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
        props.history.push({
            pathname: '/login',
            state: passedState
        })
    }

    let handleClickDashboard = () => {
        props.history.push({
            pathname: '/dashboard',
            state: passedState
        })
    }

    let studentName = Object.keys(passedState["studentNameAndUsername"])[0];
    let tutorUsername = passedState["tutorAndTutees"]["tutorUsername"]
    let studentUsername = passedState["studentNameAndUsername"][Object.keys(passedState["studentNameAndUsername"])[0]];

    // gets all units
    const [data, setData] = useState();
    const [unitData, setUnitData] = useState();
    let unitAverageData = [];
    const url = "/database/getAllStudentData/" + studentUsername;
    useEffect(() => {
        axios(url)
            .then((res) => {
                setData(res.data);
                console.log(res.data)

                for (let i = 0; i < res.data.unitData.length; i++) {
                    let unitNameAndAverage = {};
                    unitNameAndAverage["name"] = res.data.unitData[i].name;

                    unitNameAndAverage["overallAttendance"] = res.data.unitData[i].overallAttendance;
                    unitNameAndAverage["missed"] = 1 - res.data.unitData[i].overallAttendance;
                    for (let y = 0; y < res.data.unitData[i].attendances.length; y++) {
                        let nameAndAttendance = {};
                        nameAndAttendance["date"] = res.data.unitData[i].attendances[y].date;
                        nameAndAttendance["totalAttendance"] = res.data.unitData[i].attendances[y].totalAttendance;
                        unitAverageData.push(nameAndAttendance);
                    }

                    unitAverageData.push(unitNameAndAverage);
                }
                setUnitData(unitAverageData);
            })
            .catch((err) => console.log(err))
    }, []);
    console.log(setUnitData)
    //https://medium.com/weekly-webtips/create-interactive-charts-with-recharts-5e947b76b5b8 is used as a guide for tool customisation
    const CustomizedAxisTick = ({ x, y, payload }) => {
        const dateTip = moment(payload.value)
            .format("L")
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={23} y={0} dy={14} fontSize="0.90em" fontFamily="bold" textAnchor="end" fill="#363636">
                    {dateTip}</text>
            </g>
        );
    }
    const xAxisFormatter = (timestamp_measured) => {
        return moment(timestamp_measured)
            .format("L")
    }
    

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
                    <button className="sidebar-link" onClick={handleClickDashboard.bind(this)} >General</button>
                    <button className="sidebar-link" >Attendance</button>
                </div>
                <div className="dash-section-area">
                    <div className="dash-section dash-section-full">

                        <ResponsiveContainer width="75%" height="90%">
                            <LineChart
                                data={unitData}
                                width={1000}
                                height={300}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5
                                }}>
                                <CartesianGrid strokeDasharray="3 3" />


                                <Line type="monotone" dataKey="totalAttendance" stroke="#8884d8" activeDot={{ r: 8 }}  />

                                <Brush tickFormatter={xAxisFormatter} dataKey="date" />
                                <XAxis dataKey="date" tick={CustomizedAxisTick}>

                                </XAxis>
                                <YAxis >
                                </YAxis>
                                <Tooltip />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="dash-section dash-section-full">
                        <table className="mainTable">
                            {
                                data && data["unitData"].map((unit) => {
                                    return (
                                        <table className="subTable">

                                            <tr className="table-headers">
                                                <td>Unit Name</td>
                                                <td />
                                                <td>Attendance</td>
                                            </tr>
                                            <tr >
                                                <td>{unit.name}</td>
                                                <td>{unit.overallAttendance}</td>
                                            </tr>

                                        </table>
                                    )
                                })
                            }
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Attendance);