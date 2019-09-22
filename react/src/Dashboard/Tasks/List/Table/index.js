import React from 'react';
import { Table } from 'reactstrap';
import queryString from 'query-string';
import axios from 'axios';
import {
    toast,
    Bounce
} from 'react-toastify';
export default class DataTable extends React.Component {
  
  constructor(props) {
      super(props);
      this.state = {
          data: [],
          token: localStorage.getItem('token'),
          message:"",
      };
      this.handleChange   = this.handleChange.bind(this);
      this.handleDelete   = this.handleDelete.bind(this);

  }
  componentWillMount() {
      this.fetch_data();
  }
  
  notify2 = () => this.toastId = toast(this.state.message, {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: 'bottom-center',
        type: 'success'
    });
  handleChange({target}) {
    axios.post(process.env.REACT_APP_API+'task/status/'+target.id,target.id,{
      headers: {
        Authorization: 'Bearer '+this.state.token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(function (response) {
       this.setState({data: response.data.data, message: "Status has been changed successfully!"});
       this.notify2();
    }.bind(this)).catch(function (error) {
            this.setState({isSubmitting: false, isError: true, message: "Something went wrong please try again later."}); 
    }.bind(this));
  }

  handleDelete({target}) {
    axios.post(process.env.REACT_APP_API+'task/delete/'+target.id,target.id,{
      headers: {
        Authorization: 'Bearer '+this.state.token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(function (response) {
       this.setState({data: response.data.data, message: "Task has been deleted successfully!"});
       this.notify2();
    }.bind(this)).catch(function (error) {
            this.setState({isSubmitting: false, isError: true, message: "Something went wrong please try again later."}); 
    }.bind(this));
  }

  fetch_data() {
    axios.get(process.env.REACT_APP_API+'tasks',{
      headers: {
        Authorization: 'Bearer '+this.state.token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(function (response) {
       this.setState({data: response.data});
    }.bind(this)).catch(function (error) {
            this.setState({isSubmitting: false, isError: true, message: "Something went wrong please try again later."}); 
    }.bind(this));


    }
  render() {
      const data = this.state.data;
      var i = 1;
      const state = this;
      var row_data = Object.keys(data).map(function(key){ 
        const checked = data[key].status > 0 ? true : false;
        const url = "/tasks/edit?id="+data[key].id; 
        return(
             <tr>
                <th scope="row">{i++}</th>
                <td><input id={data[key].id} onClick={state.handleChange} checked={checked && ('checked')} type="checkbox"/></td>
                <td>{data[key].title}</td>
                <td>{data[key].description}</td>
                <td>
                  <button className="btn-info action">
                    <a href={url} title="Edit">
                      <i class="pe-7s-pen"></i>
                    </a> 
                  </button>
                    <button type="button" onClick={state.handleDelete} id={data[key].id} className="btn-info action">
                        <i class="pe-7s-trash" id={data[key].id}></i>
                    </button>
                </td>
              </tr>
        )}); 
    return (

      <Table striped className="mb-0">
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
         {row_data}
        </tbody>
      </Table>
    );
  }
}
