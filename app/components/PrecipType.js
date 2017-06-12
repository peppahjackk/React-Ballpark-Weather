import React from 'react'

export default class PrecipType extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return(
      <span>
        {this.props.parkData[1][this.props.hour].precipType}
      </span>
    )
  }
}

PrecipType.defaultProps = {
  hour: 0
}