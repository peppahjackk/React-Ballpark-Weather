import React from 'react'
import { Grid } from 'semantic-ui-react'

export default class MultiLocation extends React.Component {
  constructor(props) {
    super(props)
  }
  
  componentDidMount() {
   darkSkyHelper.getWeather()
    .then(function(info) {
      let data = {};
      for (var i = 0; i < Object.keys(info).length; i++) {
        data[i] = darkSkyHelper.formatWeather(info[i], this.state.days);
      }
      console.log(data);
      return data;
    }.bind(this))
    .then(function(weatherData) {
      let totalWeather = {};
      for (let i = 1; i <= this.state.days; i++) {
        let today = 'day' + i;
        totalWeather[today] = weatherData[today].day;
        totalWeather[today + 'Date'] = weatherData[today].date;
        totalWeather[today + 'Summary'] = weatherData[today].summary;
        if (weatherData[today].precipPercent) {
          totalWeather[today + 'Precip'] = weatherData[today].precipPercent + '% chance of ' + weatherData[today].precipType;  
        }
      }
      this.setState(totalWeather)
    }.bind(this))
  }
  
  render() {
    return (
        <Grid.Row>
          <Grid.Column>Mon</Grid.Column>
          <Grid.Column>Tues</Grid.Column>
          <Grid.Column>Wed</Grid.Column>
          <Grid.Column>Thur</Grid.Column>
          <Grid.Column>Fri</Grid.Column>
        </Grid.Row>
    )
  }
}