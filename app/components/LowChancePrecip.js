import React from 'react'

export default class LowChancePrecip extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <span>
        {this.props.gameData.away_name_abbrev} vs {this.props.gameData.home_name_abbrev} ({Math.round(this.props.weatherData.daily.data[this.props.day].precipProbability * 100)}%), </span>
    )
  }
}