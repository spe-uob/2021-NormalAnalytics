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


    // get unit codes into array
    let units = [];
    data && Object.keys(data.units).forEach(function(key) {
        units.push(data.units[key].code);
    });


    /////////////////////////







    ////////////////////////





    // // get assessments for each unit
    // let assessments = null;
    // for (let i = 0; i < units.length; i++) {
    //     let assessmentUrl = "/database/getAssessments/" + units[i] + "/" + studentUsername;
    //
    //
    //     fetch(assessmentUrl)
    //         .then(response => response.json())
    //         .then(message => {
    //             // unitsAndAssessments[data.units[key].name] = message.assessments;
    //             assessments = message;
    //
    //             // data && message.assessments.forEach(function(key) {
    //             //     let assessmentAndScore = {
    //             //         assessmentName: key.name,
    //             //         assessmentScore: key.score
    //             //     }
    //             //     assessments.push(assessmentAndScore);
    //             // });
    //         });
    // }
    //
    // assessments && console.log(assessments);

    // // get assessments for each unit
    // let unitsAndAssessments = {};
    //
    // data && Object.keys(data.units).forEach(function(key) {
    //     let unitCode = data.units[key].code;
    //     let assessmentUrl = "/database/getAssessments/" + unitCode + "/" + studentUsername;
    //
    //     fetch(assessmentUrl)
    //         .then(response => response.json())
    //         .then(message => {
    //             unitsAndAssessments = message;
    //         });
    // });
    //
    // console.log(unitsAndAssessments);

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
                     let unitName = val.name;

                     return (
                         <table>
                             <tr>
                                 <td>{unitName}</td>
                             </tr>
                         </table>
                     )
                 })}



                 {/*<table>*/}
                 {/*    <tr>*/}
                 {/*        <th>Units</th>*/}
                 {/*    </tr>*/}
                 {/*    {data && data["units"].map((val, key) => {*/}
                 {/*        return (*/}
                 {/*            <tr key={key}>*/}
                 {/*                <td>{val.name}</td>*/}
                 {/*            </tr>*/}
                 {/*        )*/}
                 {/*    })}*/}
                 {/*</table>*/}
             </div>
         </div>

        </div>
    );

    
}

export default withRouter(DashboardComponent);