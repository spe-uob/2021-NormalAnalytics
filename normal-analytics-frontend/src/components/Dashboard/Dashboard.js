import React from 'react';
import {Link, withRouter} from 'react-router-dom';
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
        console.log(state);

        return (
            <div className="sidebar">
                <button className="sidebar-link" onClick={this.handleClick.bind(this)}>Change Student</button>
                <Link to="#" className="sidebar-link">General</Link>
                <Link to="#" className="sidebar-link">All Data for Student</Link>
            </div>
        );
    }
}

export default withRouter (Dashboard);
