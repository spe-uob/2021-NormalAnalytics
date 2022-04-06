import React from 'react';
import { withRouter } from 'react-router-dom';
import 'react-dropdown/style.css';

import "./Student.css"

let runOnce = false;

function StudentComponent(props) {
    let passedState = props.location.state;
    let tutorAndTutees = passedState;
	let token = passedState["token"];

    console.log(passedState);

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
                                state: {"tutorAndTutees": tutorAndTutees, "studentNameAndUsername": studentNameAndUsername,"token":token}
                            })

                            document.getElementsByClassName("student-dropdown-button").hidden = true;
                        };
                        document.getElementById(key + "-ul").appendChild(subLiElement);
                    })

                })
            })
        }
    }

    return (
        <div className="fullpage">
            <div className="login">
                <span className="title">Choose a Student</span>

                <ul className="dropdown student-dropdown">
                    <li id="dropdown-button" className="student-dropdown-button" onClick={handleClickSelect.bind(this)}>Select Student
                        <ul id="tutorGroups"/>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default withRouter (StudentComponent);