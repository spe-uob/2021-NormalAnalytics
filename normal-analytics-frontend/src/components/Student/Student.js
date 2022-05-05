import React from 'react';
import { withRouter } from 'react-router-dom';
import 'react-dropdown/style.css';
import "./Student.css"

function StudentComponent(props) {
    let passedState = props.location.state;
    let tutorAndTutees = passedState;
    let token = passedState["token"];

    let handleClick = () => {
        if (passedState.runOnce === false || passedState.runOnce == null) {
            passedState.runOnce = true;

            // loop through each group of students
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

                // loop through each student within group of current iteration
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
                            props.history.replace({
                                pathname: '/dashboard',
                                state: {
                                    "tutorAndTutees": tutorAndTutees,
                                    "studentNameAndUsername": studentNameAndUsername,
                                    "runOnce": false,
                                    "token": token
                                }
                            })
                        };
                        document.getElementById(groupName + "-ul").appendChild(subLiElement);
                    })
                })
            })
        }
    }

    return (
        <div className="fullpage">
            <div className="box student-box">
                <span className="student-title">Choose a Student</span>

                <ul className="student-dropdown student-page">
                    <li className="student-dropdown-button" onClick={handleClick.bind(this)}>Select Student
                        <ul id="tutorGroups"/>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default withRouter (StudentComponent);