import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Link, Router, Route, hashHistory} from "react-router-dom";
import {
    DropdownToggle, DropdownMenu,
    Nav, Button, NavItem, NavLink,
    UncontrolledTooltip, UncontrolledButtonDropdown
} from 'reactstrap';

import {
    faCalendarAlt,
    faAngleDown

} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { history } from '../../../History/';



export default class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            token: localStorage.getItem('token'),
        };
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm = async event => {
        let token = localStorage.getItem('token');
        axios.get(process.env.REACT_APP_API+'auth/logout',{
              headers: {
                Authorization: 'Bearer '+token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }
        }).then(function (response) {
                    localStorage.removeItem('token');
                    history.push("/login");
                    window.location.href = "/login";
                    console.log("logout");
        }.bind(this)).catch(function (error) {
                console.log(error);
        });
    };

    
    render() {

        return (

            <Fragment>
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-right header-user-info ml-3">
                                <Button onClick={this.submitForm} className="btn-shadow p-1" size="sm"  color="info">
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
