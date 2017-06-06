import React from 'react';
import { Grid, Container } from 'semantic-ui-react'
import PageHeader from './PageHeader'
import FullLeague from '../containers/FullLeagueContainer'

export default class Home extends React.Component {
  render() {
    return (
      <Container fluid className='container'>
        <Grid centered className='fullGrid'>
          <Grid.Row>    
            <PageHeader/>
          </Grid.Row>
          <FullLeague header='Ballpark Weather'></FullLeague>
        </Grid>
      </Container>
    )
  }
}