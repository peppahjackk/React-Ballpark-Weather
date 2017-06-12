import React from 'react'

export default class PrecipPercent extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let isHighChance;
    if (this.props.parkData[1][this.props.hour].precipProbability >= 0.4) {
      console.log('high chance');
      isHighChance = this.props.parkData[1][this.props.hour].precipType;
    }
    return(
      <span>
        {isHighChance}
      </span>
    )
  }
}

PrecipPercent.defaultProps = {
  hour: 0
}