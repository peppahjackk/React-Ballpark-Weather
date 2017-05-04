import React from 'react';
import { Grid, Container } from 'semantic-ui-react'
import PageHeader from './PageHeader'
import FiveDayLeague from './FiveDayLeague'
import styles from '../styles'


export default class Home extends React.Component {
  render() {
    return (
      <Container fluid style={styles.container}>
        <Grid centered style={styles.fullGrid}>
          <Grid.Row>    
            <PageHeader/>
          </Grid.Row>
          <FiveDayLeague header='Ballpark Weather'></FiveDayLeague>
        </Grid>
      </Container>
    )
  }
}