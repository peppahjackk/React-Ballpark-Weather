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
        {Math.round(this.props.parkData[1][this.props.hour].precipProbability * 100)}%{gameTime}
      </span>
    )
  }
}

PrecipPercent.defaultProps = {
  hour: 0
}