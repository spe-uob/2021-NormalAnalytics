import React from 'react';
import {withRouter} from 'react-router-dom';
import 'react-dropdown/style.css';
import "./Dashboard.css"

class Dashboard extends React.Component {
    passedState = null;

    handleClick = () => {
        this.props.history.push({
            pathname: '/student-auth',
            state: this.passedState
        })
    }

    render() {
        const {state} = this.props.location;
        this.passedState = state;
        let myObj = JSON.stringify(state);
        let myNewObj = JSON.parse(myObj);

        let studentObjects = myNewObj["tutorAndTutees"]["studentObjects"];
        let studentName = myNewObj["studentUsername"]["value"]

        for (const [key, value] of Object.entries(studentObjects)) {
            if (studentName === key) {
                console.log(value);
            }
        }
        
        return (
            <div className="sidebar">
                <button className="sidebar-link" onClick={this.handleClick.bind(this)}>Change Student</button>
                <button className="sidebar-link" >General</button>
                <button className="sidebar-link" >All Data for Student</button>
            </div>
        );
    }
}

export default withRouter (Dashboard);
