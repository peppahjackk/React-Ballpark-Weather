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
   darkSkyHelper.getWeather(this.props.parks)
    .then(function(info) {
     console.log(info);
      return darkSkyHelper.formatWeather(info, this.state.days, this.props.parks);
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
              <Header as='h3'>{this.state.Day0}</Header>
              <p>{this.state.Day0Date}</p>
              <p>{this.state.cinDay0PrecipPercent}</p>
              <p>{this.state.cinDay0Summary}</p>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3'>{this.state.Day1}</Header>
              <p>{this.state.Day1Date}</p>
              <p>{this.state.cinDay1PrecipPercent}</p>
              <p>{this.state.cinDay1Summary}</p>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3'>{this.state.Day2}</Header>
              <p>{this.state.Day2Date}</p>
              <p>{this.state.cinDay2PrecipPercent}</p>
              <p>{this.state.cinDay2Summary}</p>
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