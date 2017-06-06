import React from 'react'
import {
  Container,
  Grid,
  Header
} from 'semantic-ui-react'
import darkSkyHelper from '../utils/darkSkyHelper'
import MultiParkDetails from './MultiParkDetails'
import Loading from './Loading'
import PageHeader from './PageHeader'
import dateManip from '../utils/dateManipulation'
import mlbHelper from '../utils/mlbHelper'

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
      darkSkyHelper.getParks()
      .then((dailyParks) => {
          this.setState({
            dailyParks: dailyParks
          })
          // Obtains weather data for necessary parks
          return darkSkyHelper.getWeather();
        })
        .then((info)=> {
          this.setState({
            weatherData: info
          });
          // Sets the days and dates for details component headers 
          return darkSkyHelper.formatDateInfo(this.state.dailyParks);
        })
        .then((dateInfo)=> {
          this.setState({dateInfo})
          // Converts time from string (e.g. '7:05 pm') to Date ms (e.g. 1493906056000)
          let gameTimesMs = Object.keys(this.state.dailyParks).map((date)=> {
            return Object.keys(this.state.dailyParks[date]).map((game)=> {
              let curr = this.state.dailyParks[date][game].data;
              let day = Object.keys(this.state.dailyParks).indexOf(date);
              return mlbHelper.convertTime(curr, this.state.weatherData[curr.home_name_abbrev], day, dateInfo)
            })
          });
          let fullGameData = {};
          for (let i = 0; i < this.state.days; i++) {
            let dailyKeys = Object.keys(this.state.dailyParks);
            // Packs game times into new game object
            fullGameData[i] = darkSkyHelper.extractGameTimes(gameTimesMs[i], this.state.dailyParks[dailyKeys[i]]);
            // Adds hourly weather data to game object
            fullGameData[i] = darkSkyHelper.checkHourlyPrecip(this.state.weatherData, i, fullGameData[i], this.state.dailyParks[dailyKeys[i]]);
            // Filters and sorts parks based on precipitation chance
            fullGameData[i] = darkSkyHelper.sortParks(this.state.dailyParks[dailyKeys[i]], i, fullGameData[i]);
          }
        console.log(fullGameData);
          this.setState({
            gameData: fullGameData,
            isLoading: false
          });
        })
        .catch((e)=> {
          console.log(e);
        });
    }

    render() {
      let eachDay = [];
      // Builds an array of Details components for each day
      if (this.state.isLoading === false) {
        for (var i = 0; i < this.state.days; i++) {
          eachDay.push( <MultiParkDetails key={i} gameData={this.state.gameData[i]} dateInfo={this.state.dateInfo} days={this.state.days} day={i}></MultiParkDetails>);
          }
        }
        return (this.state.isLoading === true ?
          <Loading days={this.state.days} header={this.props.header} subheader={this.props.subheader} /> 
        :
          <Grid.Row columns='3' className='detailsRow'> { eachDay } </Grid.Row>
        )
      }
    }