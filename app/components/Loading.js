import React from 'react'
import { Grid, Loader, Dimmer } from 'semantic-ui-react'
import DetailsSkeleton from './DetailsSkeleton'

export default class Loading extends React.Component {
  render() {
    return (
          <Grid.Row columns={3} className='detailsRow'>
            <Dimmer active>
              <Loader active inverted size='large'>Grilling Hot Dogs...</Loader></Dimmer>
              <DetailsSkeleton />
              <DetailsSkeleton />
              <DetailsSkeleton />
              <p className='updated'>Weather data last updated: 0000-00-00 00:00:00</p>
          </Grid.Row>
    )
  }
}