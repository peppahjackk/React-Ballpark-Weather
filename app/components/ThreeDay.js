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
    darkSkyHelper.getWeather()
    .then(function(info) {
      var data = darkSkyHelper.formatWeather(info, this.state.days);
    return data;}.bind(this))
    .then(function(weatherData) {
      let totalWeather = {};
      for (let i = 1; i <= this.state.days; i++) {
        let today = 'day' + i;
        totalWeather[today] = weatherData[today];
        totalWeather[today + 'Date'] = weatherData[today + 'Date'];
        totalWeather[today + 'Summary'] = weatherData[today + 'Summary'];
        if (weatherData[today + 'PrecipPercent']) {
          totalWeather[today + 'Precip'] = weatherData[today + 'PrecipPercent'] + '% chance of ' + weatherData[today + 'PrecipType'];  
        }
      }
      this.setState(totalWeather)
      }.bind(this))
  }
  
  render() {
    return (
      <Container>
        <Grid columns={3} centered>
          <PageHeader header={this.props.header} subheader={this.props.subheader} cols={3}></PageHeader>
          <Grid.Row>
            <Grid.Column width={3}>
              <h1>Map</h1>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header as='h3'>{this.state.day1}</Header>
              <p>{this.state.day1Date}</p>
              <p>{this.state.day1Summary}</p>
              <p>{this.state.day1Precip}</p>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3'>{this.state.day2}</Header>
              <p>{this.state.day2Date}</p>
              <p>{this.state.day2Summary}</p>
              <p>{this.state.day2Precip}</p>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3'>{this.state.day3}</Header>
              <p>{this.state.day3Date}</p>
              <p>{this.state.day3Summary}</p>
              <p>{this.state.day3Precip}</p>
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