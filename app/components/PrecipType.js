import React from 'react'
import { Table } from 'semantic-ui-react'

export default class PrecipPercent extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return(
      <span>
        {this.props.parkData[1].precipType || 'rain'}
      </span>
    )
  }
}