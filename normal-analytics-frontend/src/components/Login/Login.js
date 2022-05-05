import React from 'react';
import {withRouter} from 'react-router-dom';
import "./Login.css"

function LoginComponent(props) {
    let handleClick = () => {
        const tutorUsername = document.getElementById('input-username').value
        const tutorPassword = document.getElementById('input-password').value
        let groupAndStudents = {};

        fetch("/user/login", {
            method : "POST",
            headers : { "content-type" : "application/json; charset=UTF-8"},
            body : JSON.stringify({"username": tutorUsername, "password": tutorPassword}),
        })
            .then(response => response.text())
            .then(message => {
                let statusCode = JSON.parse(message)["code"];

                if (statusCode != null && statusCode === 200) {
                    let token = JSON.parse(message)["data"]["token"]
                    const url = "/database/getStudentsByGroup/" + tutorUsername

                    fetch(url,{headers:{"token":token}})
                        .then(response => response.json())
                        .then(message => {
                            for (let i = 0; i < message.groups.length; i++) {
                                let groupName = "";
                                let studentsInGroup = {};
                                groupName = message.groups[i].groupName;

                                for (let j = 0; j < message.groups[i].students.length; j++) {
                                    let fullname = message.groups[i].students[j].firstName + " " +  message.groups[i].students[j].surname;
                                    let studentUsername = message.groups[i].students[j].username;
                                    studentsInGroup[fullname] = studentUsername;
                                }

                                groupAndStudents[groupName] = [studentsInGroup];
                            }
                        });

                    props.history.push({
                        pathname: '/student',
                        state: {"tutorUsername": tutorUsername, "groupAndStudents": groupAndStudents, "token":token}
                    })
                } else {
                    alert("Wrong combination of username and password.");
                }
            });
    }

    return (
        <div className="fullpage">
            <div className="box login-box">
                <span className="login-title">Sign In</span>
                <form>
                    <label>
                        Name:
                        <input
                            placeholder="Enter your username"
                            className="input"
                            id="input-username"
                        />
                    </label>
                    <label>
                        Password:
                    </label>
                    <input
                        placeholder="Enter your password"
                        className="input"
                        type="password"
                        id="input-password"
                    />
                </form>
                <button className="button login-button" onClick={handleClick.bind(this)}>Log In</button>
            </div>
        </div>)
}

export default withRouter(LoginComponent);