import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import "./Attendance.css"
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from "recharts";
import Dropdown from 'react-dropdown';

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
                    
                    unitAverageData.push(unitNameAndAverage);
                }
                setUnitData(unitAverageData);
            })
            .catch((err) => console.log(err))
    }, []);

    /**
     * Needed changes:
     * Change graphs to represent attendance with corresponding dates
     * Change table to show correct data
     * use unitData to get attendance per unit 
     * change graph to lines per unit with opyion to choose 
     */


    const data1 = [
        {
            name: "23/2/2022",
            score: 93,
            
        },
        {
            name: "24/2/2022",
            score: 94,
            
        }
    ];

    const data2 = [
        {
            name: "23/2/2022",
            score: 60,
        },
        {
            name: "24/2/2022",
            score: 55,
           
        }
    ];


    const options = [
        'one', 'two', 'three'
    ]

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
                                        <table id={unit.name} className="subTable">
                                            <label>{unit.name}</label>
                                            <tr className="table-headers">
                                                <td>Date</td>
                                                <td />
                                                <td>Attendance</td>
                                            </tr>

                                            {
                                                unit.attendances.map((attendance, key) => {
                                                    return (
                                                        <tr>
                                                            <td>{attendance.date}</td>

                                                            <td />
                                                            <td>{attendance.totalAttendance}</td>

                                                            <td />
                                                            
                                                           
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
                    <Dropdown options={["Present", "Missing"]} className="dash-filter">Filter</Dropdown>  
                        <LineChart 
                            width={500}
                            height={300}
                            margin={{ top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis  dataKey="name">
                            <Label
                                value='Dates'
                            />
                            
                        </XAxis>
                        <YAxis >
                        </YAxis>
                        <Tooltip />
                        
                        <Line data={data1} type="monotone" dataKey="score" stroke="#8884d8" activeDot={{r: 8}}/>
                        <Line data = {data2}type="monotone" dataKey="score" stroke="#82ca9d" />
                        </LineChart>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Attendance);