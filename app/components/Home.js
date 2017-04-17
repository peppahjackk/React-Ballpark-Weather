import React from 'react';
import { Grid, Button, Header, Container } from 'semantic-ui-react'
import PageHeader from './PageHeader'
import FiveDayLeague from './FiveDayLeague'
import styles from '../styles'


export default class Home extends React.Component {
  render() {
    return (
      <Container>
        <Grid columns='12' centered style={styles.fullGrid}>
          <Grid.Row columns='12'>    
            <PageHeader cols='12'></PageHeader>
          </Grid.Row>
          <FiveDayLeague cols='12' header='Ballpark Weather'></FiveDayLeague>
        </Grid>
      </Container>
    )
  }
}