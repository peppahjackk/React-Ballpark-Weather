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
        {Math.round(this.props.precipData[this.props.park][1] * 100)} %
      </Table.Cell>
    )
  }
}