import React from 'react';
import { withRouter } from 'react-router-dom';
import 'react-dropdown/style.css';

import "./Student.css"

function StudentComponent(props) {
    let passedState = props.location.state;

    let tutorAndTutees = passedState;
    let runOnce = false;

    let handleClickSelect = () => {
        if (runOnce === false) {
            runOnce = true;

            Object.keys(passedState.groupAndStudents).forEach(key => {
                let liElement = document.createElement("li");
                let liElementText = document.createTextNode(key);
                liElement.appendChild(liElementText);
                liElement.id = key + "-li";
                document.getElementById("tutorGroups").appendChild(liElement);

                let ulElement = document.createElement("ul");
                ulElement.id = key + "-ul";
                document.getElementById(key + "-li").appendChild(ulElement);


                Object.values(passedState.groupAndStudents[key]).forEach(arrayOfStudentNameAndUsernameObjects => {
                    Object.keys(arrayOfStudentNameAndUsernameObjects).forEach(eachStudentName => {

                        let username = arrayOfStudentNameAndUsernameObjects[eachStudentName];
                        let studentNameAndUsername = {};
                        studentNameAndUsername[eachStudentName] = username;

                        let subLiElement = document.createElement("li");
                        let subLiElementText = document.createTextNode(eachStudentName);
                        subLiElement.appendChild(subLiElementText);
                        subLiElement.onclick = function() {
                            props.history.push({
                                pathname: '/dashboard',
                                state: {"tutorAndTutees": tutorAndTutees, "studentNameAndUsername": studentNameAndUsername}
                            })
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

                <ul className="dropdown">
                    <li id="lolbang" onClick={handleClickSelect.bind(this)}>Select Student
                        <ul id="tutorGroups"/>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default withRouter (StudentComponent);