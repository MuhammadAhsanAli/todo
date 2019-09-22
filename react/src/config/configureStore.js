import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers from '../reducers';
import {browserHistory, BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import { history } from '../History/';
import axios from 'axios';

export default function configureStore() {
  return  createStore(
    combineReducers({

      ...reducers
    }),
   apiMiddleware()

  );
}

const apiMiddleware = store => next => action => {
    if(window.location.pathname != "/login" && window.location.pathname != "/signup"){
  	  if (localStorage.getItem('token') === null) {
  	  	   window.location.href = "/login";
  	  }else{
        axios.get(process.env.REACT_APP_API+'user',{
          headers: {
            Authorization: 'Bearer '+localStorage.getItem('token'),
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        }).then(function (response) {
           //console.log(response);
        }).catch(function (error) {
              if(error.response.status == 401){
                localStorage.removeItem('token');
                window.location.href = "/login";
              }
        });
      }
	  }
    else if(localStorage.getItem('token') !== null){
        if(window.location.pathname == "/login" || window.location.pathname == "/signup"){
           window.location.href = "/tasks";
        }
    }
    return next(action);
}
