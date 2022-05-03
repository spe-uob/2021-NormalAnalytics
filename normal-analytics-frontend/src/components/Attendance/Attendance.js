import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import "./Attendance.css"
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer, Brush } from "recharts";
import Dropdown from 'react-dropdown';
import moment from 'moment';


function Attendance(props) {
    let passedState = props.location.state;
    let tutorAndTutees = passedState.tutorAndTutees;
    let runOnce = passedState.runOnce;
    let token = passedState["token"];

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


                            document.getElementsByClassName("attendance-dropdown-button").hidden = true;
                        };
                        document.getElementById(key + "-ul").appendChild(subLiElement);
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
        const xAxisTickFormatter = (timestamp_measured) => {
            return moment(timestamp_measured)
              .format("L")
             }
        
    return (
        <div className="dashboard">
            <div className="nav-bar">
                <ul className="dropdown student-dropdown">
                    <li id="dropdown-button" className="attendance-dropdown-button" onClick={handleClickSelect.bind(this)}>Select Student
                        <ul id="tutorGroups" />
                    </li>
                </ul>
                <button className="nav-item">Current student: {studentName}</button>
                <div className="dropdown">
                    <button className="nav-item dropdown-title" style={{ border: "solid black" }} >Tutor logged in: {tutorUsername}</button>
                    <span className="nav-item dropdown-item" style={{ border: "solid black" }} onClick={handleClickLogOut.bind(this)}>Log Out</span>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="sidebar">
                    <button className="sidebar-link" onClick={handleClickDashboard.bind(this)} >General</button>
                    <button className="sidebar-link" >Attendance</button>
                </div>
                <div className="dash-section-area">
                    <div className="dash-section first">
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
                    <div className="dash-section">
                    
                    <ResponsiveContainer width="75%" height="90%">
                        <LineChart 
                            data={unitData}
                            width={1000}
                            height={300}
                            margin={{ top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis  dataKey="date" tick={CustomizedAxisTick}>
                    
                        </XAxis>
                        <YAxis dataKey="totalAttendance"> 
                        </YAxis>
                        <Tooltip />
                        
                        <Line type="monotone" dataKey="totalAttendance" stroke="#8884d8" activeDot={{r: 8}}/>

                        <Brush tickFormatter={xAxisTickFormatter} dataKey="date" />

                        </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Attendance);