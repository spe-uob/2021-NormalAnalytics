import React from 'react';
import {withRouter} from 'react-router-dom';
import 'react-dropdown/style.css';
import "./Attendance.css"

class Attendance extends React.Component {
    passedState = null;

    handleClick = () => {
        this.props.history.push({
            pathname: '/student-auth',
            state: this.passedState
        })
    }

    handleClickLogin = () => {
        this.props.history.push({
            pathname: '/login',
            state: this.passedState
        })
    }

    render() {
        const {state} = this.props.location;
        this.passedState = state;
        let myObj = JSON.stringify(state);
        let myNewObj = JSON.parse(myObj);

        let studentObjects = myNewObj["tutorAndTutees"]["studentObjects"];
        console.log(studentObjects);
        let studentName = myNewObj["studentUsername"]["value"]
        let currentStudentName = null;

        for (const [key, value] of Object.entries(studentObjects)) {
            if (studentName === key) {
                console.log(value);
                currentStudentName = key
            }
        }

        let tutorName = myNewObj["tutorAndTutees"]["tutorUsername"];

        return (
            <div className="dashboard">
                <div className="nav-bar">
                    <button className="nav-item left" onClick={this.handleClick.bind(this)}>Change Student</button>
                    <button className="nav-item">Current student: {currentStudentName}</button>
                    <div className="dropdown">
                        <button className="nav-item" style={{border: "solid black"}} >Tutor logged in: {tutorName}</button>
                        <div className="dropdown-content">
                            <a className="log-out"  onClick={this.handleClickLogin.bind(this)}>Log Out</a>
                        </div>
                    </div>
                </div>
                <div className="sidebar">
                    <button className="sidebar-link" >General</button>
                    <button className="sidebar-link" >All Data for Student</button>
                </div>
            </div>
        );
    }
}

export default withRouter (Attendance);
