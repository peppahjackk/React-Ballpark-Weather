import React from 'react'
import { Grid, Header, Table } from 'semantic-ui-react'
import styles from '../styles'
import EmptyTableRows from './EmptyTableRows'
import DetailsHeader from './DetailsHeader'

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
            <DetailsHeader />
            <EmptyTableRows rows={2} cells={5} />
          </Table>
            <Header as='h4' style={Object.assign({},styles.infoHeader,styles.noMarginTop)}>Low or No Chance Parks</Header>
            <p style={Object.assign({}, styles.infoSubHeader, styles.skeleIndicator)}>* indicates game time data</p>
        </div>
      </Grid.Column>
    )
  }
}