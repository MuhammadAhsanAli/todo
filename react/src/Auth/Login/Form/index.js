import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Col, Card, CardBody,
    CardTitle, Button, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import axios from 'axios';
import { history } from '../../../History/';
export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          values: {
            email: "",
            password: ""
          },
          isSubmitting: false,
          isError: false
        };
      }

  submitForm = async e => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    axios.post(process.env.REACT_APP_API+'auth/login', this.state.values,{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
        if(response.data.status == "Success"){
            localStorage.setItem('token', response.data.access_token);
            this.props.history.push("/tasks");
        }
    }.bind(this)).catch(function (error) {
        if(error.response.status === 401){
            this.setState({isSubmitting: false, isError: true, message: 'Email id or passsword is incorrect'});
        }else{
            this.setState({isSubmitting: false, isError: true, message: "Something went wrong please try again later."}); 
        }
    }.bind(this));
  };

  handleInputChange = e =>
    this.setState({
      values: { ...this.state.values, [e.target.name]: e.target.value }
    });

    render() {
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <Card className="main-card mb-3 auth">
                        <CardBody>
                            <CardTitle>Login</CardTitle>
                            <div className={`message ${this.state.isError && "error"}`}>
                              {this.state.isSubmitting ? "Submitting..." : this.state.message}
                            </div>
                            <Form onSubmit={this.submitForm}>
                                <FormGroup row>
                                    <Label for="exampleEmail" sm={2}>Email</Label>
                                    <Col sm={10}>
                                        <Input type="email" name="email" id="email" value={this.state.values.email}
                                            onChange={this.handleInputChange} title="Email" required
                                               placeholder="Email"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="examplePassword" sm={2}>Password</Label>
                                    <Col sm={10}>
                                        <Input type="password" name="password" id="password" value={this.state.values.password}
                                            onChange={this.handleInputChange} title="password" required
                                               placeholder="Password"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup check row>
                                    <Col sm={{size: 10, offset: 2}}>
                                        <Button className="action" type="submit">Login</Button>
                                        <Button className="action"><a href="signup">Signup</a></Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }
}
