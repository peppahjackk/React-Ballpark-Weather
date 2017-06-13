import React from 'react'

export default class PrecipPercent extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let gameTime;
    let displayPercent = Math.round(this.props.parkData[1][this.props.hour].precipProbability * 100);
    // Obtains highest precipitation percent in given array of weather data
    if (this.props.pickHighest) {
      let hoursPrecip = this.props.parkData[1].map((hour)=>hour.precipProbability);
      displayPercent = Math.round(Math.max(...hoursPrecip) * 100);
    }
    // Adds indicator if hourly weather data is utilized
    if (this.props.parkData[0] != 'dome' && this.props.parkData[0] != 'daily' && !this.props.noStar) {
      gameTime = '*';
    } 
    return(
      <span className='precipItem'>
        {displayPercent}%{gameTime}
      </span>
    )
  }
}

PrecipPercent.defaultProps = {
  hour: 0
}