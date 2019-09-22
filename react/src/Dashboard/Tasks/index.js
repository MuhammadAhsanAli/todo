import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import List from './List/';
import Create from './Create/';
import Edit from './Edit/';
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

const Tables = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Switch>
                        <Route path={`${match.url}/create`} component={Create}/>
                        <Route path={`${match.url}/edit`} component={Edit}/>
                        <Route path={`${match.url}/`} component={List}/>
                    </Switch>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Tables;