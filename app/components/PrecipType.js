import React from 'react'
import { Table } from 'semantic-ui-react'
import styles from '../styles'

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