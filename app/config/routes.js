import React from 'react'
import ReactRouter from 'react-router'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import Main from '../components/Main'
import Home from '../components/Home'
import OneDay from '../containers/OneDayContainer'

/* var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var Main = require('../components/Main');
var Home = require("../components/Home"); */

export default class routes extends React.Component {
  render() {
    return(
      <Router history={ hashHistory }>
        <Route path='/' component={Main}>
          <IndexRoute component={Home} />
        </Route>
      </Router>
    )
  }
}

