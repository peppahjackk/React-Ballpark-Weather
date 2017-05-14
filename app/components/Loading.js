import React from 'react'
import { Grid, Loader, Dimmer } from 'semantic-ui-react'
import DetailsSkeleton from './DetailsSkeleton'

export default class Loading extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
          <Grid.Row columns={3} className='detailsRow'>
            <Dimmer active>
              <Loader active inverted size='large'>Grilling Hot Dogs...</Loader></Dimmer>
              <DetailsSkeleton />
              <DetailsSkeleton />
              <DetailsSkeleton /> 
          </Grid.Row>
    )
  }
}