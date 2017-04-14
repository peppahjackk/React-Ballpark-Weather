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
      <Container>
        <Grid columns={this.props.days} centered style={styles.fullGrid}>
          <Loader active size='large'>Loading</Loader>
        </Grid>
      </Container>
    )
  }
}