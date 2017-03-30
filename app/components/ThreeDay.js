import React, { Component } from 'react'
import { Container, Grid, Header } from 'semantic-ui-react'
import PageHeader from './PageHeader'
import darkSkyHelper from '../utils/darkSkyHelper'



export default class ThreeDay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      days: 3
    }
  }
  
  componentDidMount() {
   darkSkyHelper.getWeather(['cin','nya'])
    .then(function(info) {
      let data = darkSkyHelper.formatWeather(info, this.state.days, ['cin','nya']);
      return data;
    }.bind(this))
    .then(function(data) {
      this.setState(data);
     console.log(this.state);
    }.bind(this))
  }
  
  render() {
    return (
      <Container>
        <Grid columns={this.state.days} centered>
          <PageHeader header={this.props.header} subheader={this.props.subheader} cols={3}></PageHeader>
          <Grid.Row>
            <Grid.Column width={this.state.days}>
              <h1>Map</h1>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header as='h3'>{this.state.cinDay0}</Header>
              <p>{this.state.cinDay0Date}</p>
              <p>{this.state.cinDay0Precip}</p>
              <p>{this.state.cinDay0Summary}</p>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3'>{this.state.day2}</Header>
              <p>{this.state.day2Date}</p>
              <p>{this.state.day2Precip}</p>
              <p>{this.state.day2Summary}</p>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3'>{this.state.day3}</Header>
              <p>{this.state.day3Date}</p>
              <p>{this.state.day3Precip}</p>
              <p>{this.state.day3Summary}</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

ThreeDay.defaultProps = {
  header: 'Baseball Weather',
  subheader: 'Three Day Forecast'
}