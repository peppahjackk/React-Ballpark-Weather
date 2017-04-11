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
    // Obtain game data for the next X days
    darkSkyHelper.getParks(this.state.days)
    .then(function(dailyParks) {
      this.setState({
        dailyParks: dailyParks
      })
      // Condense total list of active ballparks for the next X days
      let allParks = darkSkyHelper.condenseParks(dailyParks);
      return darkSkyHelper.getWeather(allParks)
    }.bind(this))
    .then(function(info) {
      let sortedParks = {};
      for (let i = 0; i < this.state.days; i++) {
        sortedParks[i] = darkSkyHelper.sortParks(info,this.state.dailyParks[i],i);
      }
     this.setState({
       sortedParks: sortedParks,
       weatherData: info
     });
     return darkSkyHelper.formatWeather(info, this.state.days, this.props.parks);
    }.bind(this))
    .then(function(dateInfo) {
      this.setState({
        dateInfo,
        isLoading: false
      });
     
    }.bind(this))
    .catch(function(error) {
        console.log(error);
      });
  }
  
   render() {
     let eachDay =[];
    if (this.state.isLoading === false) {
    for (var i = 0; i < this.state.days; i++) {
      eachDay.push(<MultiParkDetails key={i} parks={this.state.sortedParks[i]} data={this.state.weatherData} dateInfo={this.state.dateInfo} cols={5} day={i}></MultiParkDetails>);
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