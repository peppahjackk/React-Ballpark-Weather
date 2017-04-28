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
      console.log(this.state);
      console.log(dailyParks[0][0].event_time);
      let times1 = mlbHelper.convertTime(dailyParks[0][0]);
      let times2 = mlbHelper.convertTime(dailyParks[0][11]);
      let times3 = mlbHelper.convertTime(dailyParks[0][12]);
      let times4 = mlbHelper.convertTime(dailyParks[0][13]);
      // Condense total list of active ballparks for the next X days
      let allParks = darkSkyHelper.condenseParks(dailyParks);
      //return darkSkyHelper.getWeather(allParks)
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
     return darkSkyHelper.formatDateInfo(info, this.state.days, this.state.sortedParks[0]);
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