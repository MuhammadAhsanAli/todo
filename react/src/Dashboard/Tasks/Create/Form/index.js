import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Col, Card, CardBody,
    CardTitle, Button, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import axios from 'axios';
import { history } from '../../../../History/';

export default class CreateForm extends React.Component {
     constructor(props) {
        super(props);
        this.state = {
          token: localStorage.getItem('token'),
          values: {
            title: "",
            description: ""
          },
          isSubmitting: false,
          isError: false
        };
      }

  submitForm = async e => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    axios.post(process.env.REACT_APP_API+'task/create', this.state.values,{
      headers: {
        Authorization: 'Bearer '+this.state.token,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
        if(response.data.status == "Success"){
            this.setState({
                isSubmitting: false, 
                isError: false, 
                message: "Created successfully.",
                values:{
                    title:"",
                    description:""
                }
            }); 
        }
    }.bind(this)).catch(function (error) {
        console.log(error);
            this.setState({isSubmitting: false, isError: true, message: "Something went wrong please try again later."}); 
    }.bind(this));
  };

  handleInputChange = e =>
    this.setState({
      values: { ...this.state.values, [e.target.name]: e.target.value }
    });
    render() {
        return (
            <Form onSubmit={this.submitForm}>
            <div className={`message ${this.state.isError && "error"}`}>
                {this.state.isSubmitting ? "Submitting..." : this.state.message}
            </div>
                <FormGroup row>
                    <Label for="title" sm={2}>Title</Label>
                    <Col sm={10}>
                        <Input type="text" name="title" required id="title"
                               placeholder="Title"  value={this.state.values.title}
                               onChange={this.handleInputChange}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="description" sm={2}>Description</Label>
                    <Col sm={10}>
                        <Input type="textarea" required name="description" id="description" placeholder="Description"
                         value={this.state.values.description}
                         onChange={this.handleInputChange}/>
                    </Col>
                </FormGroup>
                <FormGroup check row>
                    <Col sm={{size: 10, offset: 2}}>
                        <Button>Submit</Button>
                        &nbsp;
                        <a href="/tasks">
                          <Button type="button">Cancel</Button>
                        </a>
                    </Col>
                </FormGroup>
            </Form>
                       
        );
    }
}
