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


    console.log(data);


    // get assessments for each unit
    const units = ["COMS20006", "COMS20008"];

    const [pleaseData, setPleaseData] = useState([]);

    function pleaseGetData(pleaseUrl) {
        return new Promise((resolve, reject) => {
            fetch(pleaseUrl)
                .then((resp) => resp.json())
                .then((data) => {
                    resolve(data);
                })
        })
    }

    function pleaseLoadUsers(){
        let userRequests=[]

        for(let i = 0; i < units.length; i++) {
            userRequests.push(pleaseGetData("/database/getAssessmentData/" + units[i] + "/" + studentUsername))
        }

        Promise.all(userRequests).then((allUserData)=>{
            render(allUserData);
        })
    }

    function render(allUserData) {
        setPleaseData(allUserData);
    }

    useEffect(() => {
        pleaseLoadUsers();
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

                    {/*<table id="Computer Systems A"/>*/}
                    {/*<table id="SPE"/>*/}

                    {/*NEED TO STOP SOME COMPONENT RE-RENDERING - MAYBE USE REACT.MEMO BUT DUNNO WHERE*/}


                    {
                        data && data["units"].map((val, key1) => {
                            return (
                                <table id={val.name}>
                                    <tr>
                                        <td>{val.name}</td>
                                        <td></td>
                                        <td>Score</td>
                                    </tr>

                                    {
                                        pleaseData[key1].names.map((val2, key2) => {
                                            // val2.names.map((val3, key3) => {
                                            //     return (
                                            //         <tr>
                                            //             <td>{val3}</td>
                                            //         </tr>
                                            //     )
                                            // })

                                            return (
                                                <tr>
                                                    <td>{val2}</td>
                                                    <td></td>
                                                    <td>{pleaseData[key1].scores[key2]}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </table>
                            )
                        })
                    }






                    {/*/!*for each unit*!/*/}
                    {/*{data && data["units"].map((val, key1) => {*/}
                    {/*    myTable = "";*/}

                    {/*        myTable += "<table id={val.name}>"*/}
                    {/*        myTable += "<tr className=\"table-header\">" + "<td className=\"column-header\">" + "Unit: " + val.name + "</td>"*/}
                    {/*            + "<td/>" + "<td className=\"column-header\">Score</td>" + "</tr>";*/}
                    {/*        /!*<tr key={key} className="table-header">*!/*/}
                    {/*        /!*    <td className="column-header">Unit: {val.name}</td>*!/*/}
                    {/*        /!*    <td/>*!/*/}
                    {/*        /!*    <td className="column-header">Score</td>*!/*/}
                    {/*        /!*</tr>*!/*/}

                    {/*        {pleaseData.map((value, key2) => {*/}

                    {/*            if (key1 === key2) {*/}
                    {/*                for (let inc = 0; inc < pleaseData[key1].names.length; inc++) {*/}
                    {/*                    myTable +=*/}
                    {/*                        "<tr>" + "<td>" + pleaseData[key1].names[inc] + "</td>" + "<td/>"*/}
                    {/*                        + "<td>" + pleaseData[key1].scores[inc] + "</td>"*/}
                    {/*                        + "</tr>"*/}
                    {/*                }*/}
                    {/*            }*/}
                    {/*        })}*/}

                    {/*        // {scoreData.map((val, key) => {*/}
                    {/*        //     return (*/}
                    {/*        //         <tr key={key}>*/}
                    {/*        //             <td>{val}</td>*/}
                    {/*        //         </tr>*/}
                    {/*        //     )*/}
                    {/*        // )}*/}

                    {/*        myTable += "</table>";*/}

                    {/*        {*/}
                    {/*            return (*/}
                    {/*                document.getElementById(val.name).innerHTML = myTable*/}
                    {/*            )*/}
                    {/*        }*/}

                    {/*})}*/}

                </div>
            </div>

        </div>
    );

}

export default withRouter(DashboardComponent);