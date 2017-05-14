import React from 'react'
import { Table } from 'semantic-ui-react'

export default class PrecipPercent extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return(
      <Table.Cell>
        {this.props.gameData[this.props.park][1].precipType || 'rain'}
      </Table.Cell>
    )
  }
}