import React, { Component } from 'react'
import { Container, Grid, Header } from 'semantic-ui-react'
import PageHeader from './PageHeader'
import darkSkyHelper from '../utils/darkSkyHelper'
import WeatherDetails from './WeatherDetails'
import MultiParkDetails from './MultiParkDetails'

export default class ThreeDay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      days: 3,
      isLoading: true
    }
  }
  
  componentDidMount() {
   darkSkyHelper.getWeather(this.props.parks)
    .then (function(info) {
     let sortedCities = darkSkyHelper.sortCities(info,this.props.parks);
     this.setState({sortedCities: sortedCities});
     return info;
    }.bind(this))
    .then(function(info) {
     console.log(this.state);
      return darkSkyHelper.formatWeather(info, this.state.days, this.props.parks);
    }.bind(this))
    .then(function(weatherData) {
      this.setState({
        weatherData,
        isLoading: false
      });
     console.log(this.state);
    }.bind(this))
  }
  
  render() {
    return ( this.state.isLoading === true
            ? <Container>
                <Grid columns={this.state.days} centered>
                  <PageHeader header={this.props.header} subheader={this.props.subheader} cols={3}></PageHeader>
                  <Grid.Row>
                    <Grid.Column>      
                      <Header as='h2'>Loading</Header>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            :
      <Container>
        <Grid columns={this.state.days} centered>
          <PageHeader header={this.props.header} subheader={this.props.subheader} cols={3}></PageHeader>
          <Grid.Row>
            <Grid.Column width={this.state.days}>
              <h1>Map</h1>
            </Grid.Column>
          </Grid.Row> 
      <Grid.Row>
            <MultiParkDetails cities={this.state.sortedCities} data={this.state.weatherData} />
          </Grid.Row>
          <Grid.Row>
            <WeatherDetails day={this.state.Day0} date={this.state.Day0Date} precipPercent={this.state[this.props.parks[0]+'Day0PrecipPercent']} summary={this.state[this.props.parks[0]+'Day0Summary']}/>
            <WeatherDetails day={this.state.Day1} date={this.state.Day1Date} precipPercent={this.state[this.props.parks[0]+'Day1PrecipPercent']} summary={this.state[this.props.parks[0]+'Day1Summary']}/>
            <WeatherDetails day={this.state.Day2} date={this.state.Day2Date} precipPercent={this.state[this.props.parks[0]+'Day2PrecipPercent']} summary={this.state[this.props.parks[0]+'Day2Summary']}/>
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