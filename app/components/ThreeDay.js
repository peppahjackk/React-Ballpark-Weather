import React, { Component } from 'react'
import { Container, Grid, Header } from 'semantic-ui-react'
import PageHeader from './PageHeader'

export default class ThreeDay extends Component {
  render() {
    return (
      <Container>
        <Grid columns={3} centered>
          <PageHeader header='Baseball Weather' subheader='Three Day Forecast' cols={3}></PageHeader>
          <Grid.Row>
            <Grid.Column width={3}>
              <h1>Map</h1>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header as='h3'>Monday</Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3'>Tuesday</Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3'>Wednesday</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}