import React from 'react'
import { Grid, Segment, Header, Table } from 'semantic-ui-react'
import styles from '../styles'

export default class DetailsSkeleton extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <Grid.Column tablet={16} mobile={16} computer={5}>
        <div style={styles.detailsContainer}>
          <Header as='h3' style={styles.infoHeader}>Weekday</Header>
          <Header as='h4' style={Object.assign({}, styles.infoSubHeader,styles.noMarginTop)}>Date</Header>
        </div>
        <div style={Object.assign({}, styles.detailsContainer, styles.skeleton)}>
          <Table celled compact unstackable style={styles.precipTable}>
            <Table.Header style={styles.precipTHead}>
              <Table.Row>
                <Table.HeaderCell>Matchup</Table.HeaderCell>
                <Table.HeaderCell>Precip %</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
              </Table.Row>
            
              <Table.Row>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
              </Table.Row>
            
              <Table.Row>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
              </Table.Row>
            </Table.Header>
          </Table>
            <Header as='h4' style={Object.assign({},styles.infoHeader,styles.noMarginTop)}>Low or No Chance Parks</Header>
            <p style={Object.assign({}, styles.infoSubHeader, styles.skeleIndicator)}>* indicates game time data</p>
        </div>
      </Grid.Column>
    )
  }
}