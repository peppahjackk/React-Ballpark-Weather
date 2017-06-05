import React from 'react'

export default class PrecipPercent extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let gameTime;
    // Adds indicator if hourly weather data is utilized
    if (this.props.parkData[0]) {
      gameTime = '*';
    } 
    return(
      <span>
        {Math.round(this.props.parkData[1][0].precipProbability * 100)}%{gameTime}
      </span>
    )
  }
}