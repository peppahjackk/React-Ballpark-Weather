import React from 'react'
import {
  Container,
  Grid,
  Header
} from 'semantic-ui-react'
import weatherHelper from '../utils/weatherHelper'
import MultiParkDetails from '../components/MultiParkDetails'
import Loading from '../components/Loading'
import ErrorMsg from '../components/ErrorMsg'
import PageHeader from '../components/PageHeader'
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
      mlbHelper.getParks()
      .then((dailyParks) => {
          this.setState({
            dailyParks: dailyParks
          })
          // Obtains weather data for necessary parks
          return weatherHelper.getWeather();
        })
        .then((info)=> {
          this.setState({
            weatherData: info
          });
          // Sets the days and dates for details component headers 
          return dateManip.formatDateInfo(this.state.dailyParks);
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
            fullGameData[i] = mlbHelper.extractGameTimes(gameTimesMs[i], this.state.dailyParks[dailyKeys[i]]);
            // Adds hourly weather data to game object
            fullGameData[i] = weatherHelper.checkHourlyPrecip(this.state.weatherData, i, fullGameData[i], this.state.dailyParks[dailyKeys[i]]);
            // Filters and sorts parks based on precipitation chance
            fullGameData[i] = weatherHelper.sortParks(this.state.dailyParks[dailyKeys[i]], i, fullGameData[i]);
          }
          this.setState({
            gameData: fullGameData,
            isLoading: false
          });
        })
        .catch((e)=> {
          console.log(e);
          this.setState({
            error: e.message,
            isLoading: false
          })
        });
    }

    render() {
      let content = [];
      // Builds an array of Details components for each day
      if (this.state.isLoading === false && !this.state.error) {
        for (var i = 0; i < this.state.days; i++) {
          content.push( <MultiParkDetails key={i} gameData={this.state.gameData[i]} dateInfo={this.state.dateInfo} days={this.state.days} day={i}></MultiParkDetails>);
          }
        } else {
          content = <ErrorMsg e={this.state.error} />
                       }
        return (this.state.isLoading === true ?
          <Loading days={this.state.days} header={this.props.header} subheader={this.props.subheader} /> 
        :
          <Grid.Row columns='3' className='detailsRow'> { content } </Grid.Row>
        )
      }
    }