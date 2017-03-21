import React from 'react'
import ReactRouter from 'react-router'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import Main from '../components/Main'
import Home from '../components/Home'

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

