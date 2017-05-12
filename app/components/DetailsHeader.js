import React from 'react'
import { Table } from 'semantic-ui-react'
import styles from '../styles'

export default class DetailsHeader extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return(
      <Table.Header style={styles.precipTHead}>
        <Table.Row>
          <Table.HeaderCell>Matchup</Table.HeaderCell>
          <Table.HeaderCell>Time</Table.HeaderCell>
          <Table.HeaderCell>Precip %</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    )
  }
}