import React from 'react'
import { Container, Grid, Header, Loader, Segment, Dimmer } from 'semantic-ui-react'
import PageHeader from './PageHeader'
import DetailsSkeleton from './DetailsSkeleton'
import styles from '../styles'

export default class Loading extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
          <Grid.Row columns={3} style={styles.detailsRow}>
              <Loader active inverted size='large'>Grilling Hot Dogs...</Loader>
            <DetailsSkeleton />
            <DetailsSkeleton />
            <DetailsSkeleton />   
          </Grid.Row>
    )
  }
}