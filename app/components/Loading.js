import React from 'react'
import { Container, Grid, Header, Loader } from 'semantic-ui-react'
import PageHeader from './PageHeader'
import styles from '../styles'

export default class Loading extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
          <Grid.Row>
            <Loader active size='large'>Grilling Hot Dogs...</Loader>
          </Grid.Row>
    )
  }
}