import React from 'react'
import { Grid } from 'semantic-ui-react'
import axios from 'axios'
import openWeatherHelper from '../utils/openWeatherHelper'

export default class WeatherMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      map: false
    }
  }

  componentDidMount() {
    openWeatherHelper.getMap()
    .then (function(map) {
      console.log(map);
      this.setState({map: map.data});
    }.bind(this))   
  }
  
  render() {
    return (
      <Grid.Row>
        <h1>Map {this.state.map}</h1>
      </Grid.Row>
    )
  }
}