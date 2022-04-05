import React, { useState, useEffect, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import "./Attendance.css"
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie } from "recharts";
import Dropdown from 'react-dropdown';

let runOnce = false;

function Attendance(props) {
    let passedState = props.location.state;
    let tutorAndTutees = passedState.tutorAndTutees;

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
                                pathname: '/attendance',
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

    let handleClickDashboard = () => {
        props.history.push({
            pathname: '/dashboard',
            state: passedState
        })
    }

    let handleClickAllData = () => {
        props.history.push({
            pathname: '/alldata',
            state: passedState
        })
    }

    let studentName = Object.keys(passedState["studentNameAndUsername"])[0];
    let tutorUsername = passedState["tutorAndTutees"]["tutorUsername"]
    let studentUsername = passedState["studentNameAndUsername"][Object.keys(passedState["studentNameAndUsername"])[0]];

    // gets all units
    const [data, setData] = useState();
    const url = "/database/getUnits/" + studentUsername;
    useEffect(() => {
        axios(url)
            .then((res) => {
                setData(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err))
    }, []);


    let filterData =() =>{
        console.log(data);
    }
    /**
     * Needed changes:
     * Change graphs to represent attendance with corresponding dates
     * Change table to show correct data
     */


    const data1 = [
        {
            name: "23/2/2022",
            score: 93
        },
        {
            name: "24/2/2022",
            score: 94
        }
    ];

    const options = [
        'one', 'two', 'three'
      ]

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
                    <button className="sidebar-link" onClick={handleClickDashboard.bind(this)} >General</button>
                    <button className="sidebar-link" >Attendance</button>
                    <button className="sidebar-link" onClick={handleClickAllData.bind(this)}>All Data</button>
                </div>
                <div className="section">
                    <div>
                            <label class="control-label  ">Filter Units</label>
                            <br />
                            <div>
                            <Dropdown options={options} onChange={filterData} />
                            </div>
                        </div>
                    <div class="row">
                        <div>
                        <button onClick={filterData}>
                            Search
                        </button>
                        </div>
                    </div>

                    <table>
                        <tr className="table-header">
                            <td className="column-header">Unit</td>
                            <td></td>
                            <td className="column-header">Attendance</td>
                        </tr>

                        {data && data["units"].map((val, key) => {
                            return (
                                <tr>
                                    <td>{val.name}</td>
                                    <td></td>
                                    <td>{val.attendance}%</td>
                                </tr>

                            )
                        })}
                    </table>


                </div>
                <div>
                    <LineChart
                        width={500}
                        height={300}
                        data={data1}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis dataKey="score" />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                        />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </div>
                
            </div>
        </div>
    );
}

export default withRouter(Attendance);