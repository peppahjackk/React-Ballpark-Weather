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
    // Obtains game data for the next X days
    darkSkyHelper.getParks(this.state.days)
    .then(function(dailyParks) {
      this.setState({
        dailyParks: dailyParks
      })
      // Condenses total list of active ballparks for the next X days
      let allParks = darkSkyHelper.condenseParks(dailyParks);
      // Obtains weather data for necessary parks
      return darkSkyHelper.getWeather(allParks)
    }.bind(this))
    .then(function(info) {
     this.setState({
       weatherData: info
     });
     // Sets the days and dates for details component headers 
     return darkSkyHelper.formatDateInfo(info, this.state.days, this.state.dailyParks[0]);
    }.bind(this))
    .then(function(dateInfo) {
      // Converts time from string (e.g. '7:05 pm') to Date ms (e.g. 1493906056000)
      let gameTimesMs = Object.keys(this.state.dailyParks).map(function(day) {
        return Object.keys(this.state.dailyParks[day]).map(function(game) {
          let curr = this.state.dailyParks[day][game];
          return mlbHelper.convertTime(curr, this.state.weatherData[curr.home_name_abbrev], day, dateInfo)
        }.bind(this)) 
      }.bind(this));
      let sortedParks = {}, fullGameData = {};
      for (let i = 0; i < this.state.days; i++) {
        // Packs game times into new game object
        fullGameData[i] = darkSkyHelper.extractGameTimes(gameTimesMs[i]);
        // Adds hourly weather data to game object
        fullGameData[i] = darkSkyHelper.checkHourlyPrecip(this.state.weatherData,i,fullGameData[i],this.state.dailyParks[i]);
        // Sorts parks in order of precipitation chance
        sortedParks[i] = darkSkyHelper.sortParks(this.state.dailyParks[i],i,fullGameData[i]);
      }
      this.setState({
        dateInfo,
        sortedParks: sortedParks,
        gameData: fullGameData,
        isLoading: false
      });
    }.bind(this))
    .catch(function(error) {
        console.log(error);
      });
  }
  
   render() {
     let eachDay = [];
     // Builds an array of Details components for each day
     if (this.state.isLoading === false) {
     for (var i = 0; i < this.state.days; i++) {
       eachDay.push(<MultiParkDetails key={i} parks={this.state.sortedParks[i]} gameData={this.state.gameData[i]} data={this.state.weatherData} dateInfo={this.state.dateInfo} days={this.state.days} day={i}></MultiParkDetails>);
     }}
     return ( this.state.isLoading === true
            ? <Loading days={this.state.days} header={this.props.header} subheader={this.props.subheader} />
            : <Grid.Row columns='3' style={styles.detailsRow}>
                {eachDay}
              </Grid.Row>
    )
  }
}