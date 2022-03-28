import React from 'react';
import {withRouter} from 'react-router-dom';

import "./Login.css"

function LoginComponent(props) {
    let handleClick = () => {
        const username = document.getElementById('input-username').value
        const password = document.getElementById('input-password').value

        let groupAndStudents = {};
        let studentObjects = {};

        fetch("/login", {
            method : "POST",
            headers : { "content-type" : "application/json; charset=UTF-8"},
            body : JSON.stringify({"username": username, "password": password}),
        })
            .then(response => response.text())
            .then(message => {
                let token = JSON.parse(message)["token"]
                if (token != null) {
                    const url = "/database/getStudentsByGroup/" + username

                    fetch(url)
                        .then(response => response.json())
                        .then(message => {
                            for (let i = 0; i < message.groups.length; i++) {
                                let groupName = "";
                                let groupStudents = {};

                                groupName = message.groups[i].groupName;
                                for (let j = 0; j < message.groups[i].students.length; j++) {
                                    let name = message.groups[i].students[j].firstName + " " +  message.groups[i].students[j].surname;
                                    let username = message.groups[i].students[j].username;
                                    groupStudents[name] = username;
                                }

                                groupAndStudents[groupName] = [groupStudents];
                            }
                        });

                    props.history.push({
                        pathname: '/student',
                        state: {"tutorUsername": username, "groupAndStudents": groupAndStudents, "studentObjects": studentObjects}
                    })
                }
            });
    }

    return (
        <div className="fullpage">
            <div className="login">
                <span className="title">Sign In</span>
                <form>
                    <label>
                        Name:
                        <input type="text" className="input" id="input-username" />
                    </label>
                    <label>
                        Password:
                        <input type="text" className="input" id="input-password" />
                    </label>
                </form>
                <button className="login-button" onClick={handleClick.bind(this)}>Log In</button>
            </div>
        </div>)
}

export default withRouter(LoginComponent);