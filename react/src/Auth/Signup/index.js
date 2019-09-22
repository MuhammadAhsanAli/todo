import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import Form from './Form/';


const Signup = ({match}) => (
    <Fragment>
        <div className="app-main">
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}/`} component={Form}/>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Signup;