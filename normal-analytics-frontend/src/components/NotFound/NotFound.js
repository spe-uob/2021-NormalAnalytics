import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import 'react-dropdown/style.css';
import "./NotFound.css"

class NotFound extends React.Component {
    render(){
        return (
            <body>
            <div className="fullpage">
                <Link to="/" className="button">Error 404 - click to return to homepage</Link>
            </div>
            </body>)
    }
}

export default withRouter (NotFound);