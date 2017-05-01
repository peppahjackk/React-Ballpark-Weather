import React from 'react';
import { Grid, Button, Header, Container } from 'semantic-ui-react'
import PageHeader from './PageHeader'
import FiveDayLeague from './FiveDayLeague'
import Footer from './Footer'
import styles from '../styles'


export default class Home extends React.Component {
  render() {
    return (
      <Container fluid style={styles.container}>
        <Grid columns='16' centered style={styles.fullGrid}>
          <Grid.Row columns='16'>    
            <PageHeader cols='16'></PageHeader>
          </Grid.Row>
          <FiveDayLeague cols='16' header='Ballpark Weather'></FiveDayLeague>
        </Grid>
      <Footer />
      </Container>
    )
  }
}