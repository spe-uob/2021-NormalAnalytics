import React from 'react';
import { withRouter } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import "./StudentAuth.css"

class StudentAuth extends React.Component {
    selectedItem = null;
    tutorAndTutees = null;

    handleChange = (e) => {
        this.selectedItem = e;
    }

    handleClick = () => {
        if (this.selectedItem != null) {
            this.props.history.push({
                pathname: '/dashboard',
                state: {"tutorAndTutees": this.tutorAndTutees, "studentUsername": this.selectedItem}
            })
        }
    }

    render(){
        const {state} = this.props.location;
        let myObj = JSON.stringify(state);
        let myNewObj = JSON.parse(myObj);
        console.log(myNewObj);

        this.tutorAndTutees = myNewObj["tutorAndTutees"];
        
        return (
            <div className="fullpage">
                <div className="login">
                    <span className="title">Choose a Student</span>
                    <Dropdown options={this.tutorAndTutees["students"]} onChange={this.handleChange} value={this.tutorAndTutees["students"][0]} className="dropdown-students" />
                    <button onClick={this.handleClick.bind(this)} className="student-button">Next</button>
                </div>
            </div>)
    }
}

export default withRouter (StudentAuth);
