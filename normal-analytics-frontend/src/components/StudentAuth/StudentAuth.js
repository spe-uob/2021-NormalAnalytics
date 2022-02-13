import React from 'react';
import { withRouter } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function StudentAuthComponent(props) {
    let passedState = props.location.state;

    let tutorAndTutees = passedState["tutorAndTutees"];
    let selectedItem = null;

    let handleChange = (e) => {
        selectedItem = e;
    }

    let handleClick = () => {
        if (selectedItem != null) {
            props.history.push({
                pathname: '/dashboard',
                state: {"tutorAndTutees": tutorAndTutees, "studentUsername": selectedItem}
            })
        }
    }

    return (
            <div className="fullpage">
                <div className="login">
                    <span className="title">Choose a Student</span>
                    <Dropdown options={tutorAndTutees["studentNames"]} onChange={handleChange} className="dropdown-students" />
                    <button onClick={handleClick.bind(this)} className="student-button">Next</button>
                </div>
            </div>
    );
}

export default withRouter (StudentAuthComponent);
