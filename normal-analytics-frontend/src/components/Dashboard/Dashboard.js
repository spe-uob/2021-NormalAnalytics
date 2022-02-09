import React from 'react';
import {withRouter} from 'react-router-dom';
import 'react-dropdown/style.css';
import "./Dashboard.css"
import Sidebar from '../SideBar/SideBar';
import ReactTable from "react-table";  
import Table from '../TableContainer';

class Dashboard extends React.Component {
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
        //https://www.bacancytechnology.com/blog/react-table-tutorial-part-1/#1
        //used this tutorial, instead of hard-coding use UseEffect to fetch it, just didnt have time
        //if you want leave the styling to me
        //there is a separate file called TableContainer used to hold the table 
        // i have moved the sidebar into its own component, not sure for the navigation bar

        /*const [data, setData] = useState([]);
 
        useEffect(() => {
        const {state} = this.props.location;
        this.passedState = state;
            .then((res) => {
            setData(res.data);
            })
            .catch((err) => console.log(err))
        }, []);
        */
        const data = 
        [
        {
        name: 'Computer systems A',
        address: '20',
        date: '07/12/2021',
        order: '67',
        },
        {
        name: 'Algorithms II',
        address: '10',
        date: '07/11/2021',
        order: '85',
        },
        ]

        const columns =  [
            {
            Header: 'Units ',
            columns: [
            {
            Header: 'Name',
            accessor: 'name',
            },
            {
            Header: 'Credit points',
            accessor: 'address',
            },
            {
             Header: 'Score',
             accessor: 'order',
             },
            ],
           },
        ]
        
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
                <Sidebar /> 
                <div>  
                <Table columns={columns} data={data} /> 
                </div>  
              
            </div>
        );
    }
}

export default withRouter (Dashboard);
