import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import React, {Suspense, lazy, Fragment} from 'react';

import {
    ToastContainer,
} from 'react-toastify';
import { createBrowserHistory } from '../../History/';

const Tasks = lazy(() => import('../../Dashboard/Tasks'));
const Create = lazy(() => import('../../Dashboard/Tasks'));
const Edit = lazy(() => import('../../Dashboard/Tasks'));
const Login = lazy(() => import('../../Auth/Login'));
const Signup = lazy(() => import('../../Auth/Signup'));



const AppMain = () => {

        return (
         <Router history={history}>
            <Fragment>
            
                {/* Tasks */}
                <Suspense fallback={
                    <div className="loader-container">
                        <div className="loader-container-inner">
                            <h6 className="mt-5">
                                Please wait while we load all the Tasks 
                                <small>Because this is a demonstration we load at once all the Tasks. This wouldn't happen in a real live app!</small>
                            </h6>
                        </div>
                    </div>
                }>
                    <Route path="/tasks" component={Tasks}/>
               </Suspense>
               <Suspense fallback={
                    <div className="loader-container">
                        <div className="loader-container-inner">
                            <h6 className="mt-5">
                                Please wait while we load all the Tasks 
                                <small>Because this is a demonstration we load at once all the Tasks. This wouldn't happen in a real live app!</small>
                            </h6>
                        </div>
                    </div>
                }>
                    <Route path="/create" component={Create}/>
               </Suspense>

               <Suspense fallback={
                    <div className="loader-container">
                        <div className="loader-container-inner">
                            <h6 className="mt-5">
                                Please wait while we load all the Tasks 
                                <small>Because this is a demonstration we load at once all the Tasks. This wouldn't happen in a real live app!</small>
                            </h6>
                        </div>
                    </div>
                }>
                    <Route path="/edit" component={Edit}/>
               </Suspense>
                               
                
                <ToastContainer/>
                  
                {/* Signup */}

                    <Suspense fallback={
                        <div className="loader-container">
                            <div className="loader-container-inner">
                                <h6 className="mt-5">
                                    Please wait while we load Signup page 
                                    <small>Because this is a demonstration we load at once Signup. This wouldn't happen in a real live app!</small>
                                </h6>
                            </div>
                        </div>
                    }>
                        <Route path="/signup" component={Signup}/>
                    </Suspense>

                    {/* Login */}
                    <Suspense fallback={
                        <div className="loader-container">
                            <div className="loader-container-inner">
                                <h6 className="mt-5">
                                    Please wait while we load Login page 
                                    <small>Because this is a demonstration we load at once Login. This wouldn't happen in a real live app!</small>
                                </h6>
                            </div>
                        </div>
                    }> 
                        <Route path="/login" component={Login}/>
                    </Suspense>

                  <Route exact path="/" render={() => (
                    <Redirect to="/tasks"/>
                )}/>

            </Fragment>
            </Router>

        );

    

};

export default AppMain;