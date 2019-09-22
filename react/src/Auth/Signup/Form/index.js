import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Col, Card, CardBody,
    CardTitle, Button, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import axios from 'axios';
export default class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          values: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
          },
          isSubmitting: false,
          isError: false
        };
      }

  submitForm = async e => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    axios.post(process.env.REACT_APP_API+'auth/signup', this.state.values,{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
        console.log(response.data.message);
        this.setState({
            isSubmitting: false, 
            isError: false, 
            message: "Successfully created!",
            values: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
          }
        })
    }.bind(this)).catch(function (error) {
        if(error.response.status === 422){
            this.setState({isSubmitting: false, isError: true, message: 'Please insert correct data'});
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
                            <CardTitle>Signup</CardTitle>
                            <div className={`message ${this.state.isError && "error"}`}>
                              {this.state.isSubmitting ? "Submitting..." : this.state.message}
                            </div>
                            <Form onSubmit={this.submitForm}>
                                <FormGroup row>
                                    <Label for="UserName" sm={2}>Name</Label>
                                    <Col sm={10}>
                                        <Input type="text" name="name" id="name" value={this.state.values.name}
                                            onChange={this.handleInputChange} title="name" required
                                               placeholder="Name"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="Email" sm={2}>Email</Label>
                                    <Col sm={10}>
                                        <Input type="email" name="email" id="email" value={this.state.values.email}
                                            onChange={this.handleInputChange} title="Email" required
                                               placeholder="Email"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="Password" sm={2}>Password</Label>
                                    <Col sm={10}>
                                        <Input type="password" name="password" id="password" value={this.state.values.password}
                                            onChange={this.handleInputChange} title="password" required
                                               placeholder="Password"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="examplePassword" sm={2}>Confirm Password</Label>
                                    <Col sm={10}>
                                        <Input type="password" name="password_confirmation" id="password_confirmation" value={this.state.values.password_confirmation}
                                            onChange={this.handleInputChange} title="confirm password" required
                                               placeholder="Confirm password"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup check row>
                                    <Col sm={{size: 10, offset: 2}}>
                                        <Button type="submit" className="action">Signup</Button>
                                        <Button className="action"><a href="/login">Login</a></Button>
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
