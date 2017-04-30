import React from 'react'
import { Container, Grid, Header } from 'semantic-ui-react'
import darkSkyHelper from '../utils/darkSkyHelper'
import MultiParkDetails from './MultiParkDetails'
import Loading from './Loading'
import PageHeader from './PageHeader'
import dateManip from '../utils/dateManipulation'
import mlbHelper from '../utils/mlbHelper'
import styles from '../styles'

export default class FiveDayLeague extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      days: 3,
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
      // Obtain weather data
      return darkSkyHelper.getWeather(allParks)
    }.bind(this))
    .then(function(info) {
     this.setState({
       weatherData: info
     });
     // Set the days and dates for details component headers 
     return darkSkyHelper.formatDateInfo(info, this.state.days, this.state.dailyParks[0]);
    }.bind(this))
    .then(function(dateInfo) {
      console.log(this.state);
      let gameTimesMs = Object.keys(this.state.dailyParks).map(function(day) {
        return Object.keys(this.state.dailyParks[day]).map(function(game) {
          return mlbHelper.convertTime(this.state.dailyParks[day][game], this.state.weatherData[game.home_name_abbrev], day, dateInfo)
        }.bind(this)) 
      }.bind(this));
      let sortedParks = {}, parksGameTime = {};
      // Sort parks for each day in order of precipitation chance
      for (let i = 0; i < this.state.days; i++) {
        parksGameTime[i] = darkSkyHelper.extractGameTimes(gameTimesMs[i]);
        sortedParks[i] = darkSkyHelper.sortParks(this.state.weatherData,this.state.dailyParks[i],i,parksGameTime[i]);
      }
      this.setState({
        dateInfo,
        sortedParks: sortedParks,
        gameTimes: gameTimesMs,
        isLoading: false
      });
      console.log(this.state);
    }.bind(this))
    .catch(function(error) {
        console.log(error);
      });
  }
  
   render() {
     let eachDay =[];
     // Builds array of Details components for each day
     if (this.state.isLoading === false) {
     for (var i = 0; i < this.state.days; i++) {
       eachDay.push(<MultiParkDetails key={i} parks={this.state.sortedParks[i]} data={this.state.weatherData} dateInfo={this.state.dateInfo} cols={this.props.cols} days={this.state.days} day={i}></MultiParkDetails>);
     }}
     return ( this.state.isLoading === true
            ? <Loading days={this.state.days} header={this.props.header} subheader={this.props.subheader} />
            : <Grid.Row columns='3' style={styles.detailsRow}>
                {eachDay}
              </Grid.Row>
    )
  }
}