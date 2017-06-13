import React from 'react'
import { Grid, Header, Table, Divider } from 'semantic-ui-react'
import EmptyTableRows from './EmptyTableRows'
import EmptyListItems from './EmptyListItems'
import DetailsHeader from './DetailsHeader'

export default class DetailsSkeleton extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      // Skeleton for weather details display
      <Grid.Column tablet={16} mobile={16} computer={5}>
        <div className='detailsContainer'>
          <Header as='h3' className='infoHeader'>Weekday</Header>
          <Header as='h4' className='infoSubHeader noMarginTop'>Date</Header>
        </div>
        <div className='detailsContainer skeleton'>
          <Header as='h3' className='infoHeader'>MLB Parks with a high rain chance</Header>
          <Table celled compact unstackable className='precipTable'>
            <DetailsHeader />
            <EmptyTableRows rows={2} cells={4} />
          </Table>
            <Header as='h4' className='infoHeader noMarginTop'>Low or No Chance Parks</Header>
            <ul className='list lowChance'>
              <EmptyListItems rows={6} />
            </ul>
            <p className='infoSubHeader skeleIndicator'>* indicates game time data</p>
        </div>
      </Grid.Column>
    )
  }
}