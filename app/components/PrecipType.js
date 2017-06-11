import React from 'react'

export default class PrecipPercent extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let isHighChance;
    console.log(this.props.parkData);
    if (this.props.parkData[1][0].precipProbability >= 0.4) {
      console.log('high chance');
      isHighChance = this.props.parkData[1][0].precipType;
    }
    return(
      <span>
        {isHighChance}
      </span>
    )
  }
}