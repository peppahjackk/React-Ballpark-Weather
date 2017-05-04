import React from 'react'
import { Grid, Header, Table } from 'semantic-ui-react'
import styles from '../styles'
import EmptyTableRow from './EmptyTableRow'

export default class DetailsSkeleton extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      // Skeleton for weather details display
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
            
              <EmptyTableRow cells={3} />
              <EmptyTableRow cells={3} />
                
            </Table.Header>
          </Table>
            <Header as='h4' style={Object.assign({},styles.infoHeader,styles.noMarginTop)}>Low or No Chance Parks</Header>
            <p style={Object.assign({}, styles.infoSubHeader, styles.skeleIndicator)}>* indicates game time data</p>
        </div>
      </Grid.Column>
    )
  }
}