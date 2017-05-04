import React from 'react'
import { Table } from 'semantic-ui-react'

export default class PrecipPercent extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return(
      <Table.Cell>
        {this.props.data.daily.data[this.props.day].precipType || 'rain'}
      </Table.Cell>
    )
  }
}