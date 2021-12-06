import React from 'react';
import { withRouter } from 'react-router-dom';
import 'react-dropdown/style.css';

import "./NotFound.css"

class NotFound extends React.Component {
    // constuctor() {
    //     this.routeChange = this.routeChange.bind(this);
    //     this.state = {value: ''};
    // }

    // handleClick = () => {
    //     this.props.history.push("/dashboard");
    //     console.log('this is:', this);
    // }

    render(){
        return (
            <body>
            <div className="fullpage">
                <div className="login">
                    <p>Error 404!</p>
                </div>
            </div>
            </body>)
    }
}
//export default LogIn;
export default withRouter (NotFound);
