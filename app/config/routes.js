import React from 'react'
import ReactRouter from 'react-router'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import Main from '../components/Main'
import Home from '../components/Home'
import styles from '../styles'

export default class routes extends React.Component {
  render() {
    return(
      <Router history={ hashHistory }>
        <Route path='/' component={Main} style={styles.app}>
          <IndexRoute component={Home} />
        </Route>
      </Router>
    )
  }
}

