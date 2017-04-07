import React from 'react'
import { Container, Grid, Header } from 'semantic-ui-react'
import darkSkyHelper from '../utils/darkSkyHelper'
import MultiParkDetails from './MultiParkDetails'
import Loading from './Loading'
import PageHeader from './PageHeader'
import dateManip from '../utils/dateManipulation'

export default class FiveDayLeague extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      days: 5,
      isLoading: true
    }
  }
  
  componentDidMount() {
    let allParks = [];
    let current = new Date();
    for (let i = 0; i < this.state.days; i++) {
      let time = current.getTime() + (86400000 * i);
      allParks.push(darkSkyHelper.getParks(time));
    }
    console.log(allParks);
    darkSkyHelper.getWeather(allParks)
    .then(function(info) {
      console.log(info)
      let sortedCities = {};
      for (let i = 0; i < this.state.days; i++) {
        sortedCities[i] = darkSkyHelper.sortCities(info,allParks,i);
      }
     this.setState({sortedCities: sortedCities});
     return info;
    }.bind(this))
    .then(function(info) {
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
     let eachDay =[];
    if (this.state.isLoading === false) {
    for (var i = 0; i < this.state.days; i++) {
      eachDay.push(<MultiParkDetails key={i} cities={this.state.sortedCities} data={this.state.weatherData} cols={5} day={i}></MultiParkDetails>);
    }}
    return ( this.state.isLoading === true
            ? <Loading days={this.state.days} header={this.props.header} subheader={this.props.subheader} />
            : <Container>
                <Grid columns={this.state.days} centered>
                  <PageHeader header={this.props.header} subheader={this.props.subheader} cols={this.state.days}></PageHeader>
                  <Grid.Row>
                    <Grid.Column width={this.state.days}>
                      <h1>Map</h1>
                    </Grid.Column>
                  </Grid.Row>
            <Grid.Row>
            {eachDay}
      </Grid.Row>
      </Grid>
              </Container>
    )
  }
}