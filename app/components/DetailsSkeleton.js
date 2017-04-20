import React from 'react'
import { Grid, Segment, Header } from 'semantic-ui-react'
import styles from '../styles'

export default class DetailsSkeleton extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <Grid.Column>
        <div style={styles.detailsContainer}>
          <Header as='h3' style={styles.infoHeader}>Weekday</Header>
          <Header as='h4' style={styles.infoSubHeader}>Date</Header>
        </div>
        <div style={Object.assign({}, styles.detailsContainer, styles.skeleton)}>
          
        </div>
      </Grid.Column>
    )
  }
}