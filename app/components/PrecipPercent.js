import React from 'react'

export default class PrecipPercent extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let gameTime;
    // Adds indicator if hourly weather data is utilized
    if (this.props.precipData[this.props.park][0]) {
      gameTime = '*';
    } 
    return(
      <span>
        {Math.round(this.props.precipData[this.props.park][1] * 100)}%{gameTime}
      </span>
    )
  }
}