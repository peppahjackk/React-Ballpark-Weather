import React from 'react'
import { Grid, Header } from 'semantic-ui-react'

export default class ErrorMsg extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <Grid.Column tablet={16} mobile={16} computer={10}>
        <div className='detailsContainer errorMsg'>
          <Header as='h2' className='infoHeader'>Oops, we've committed an error!</Header>
          <p>Try loading the page again. If the problem persists please email me the following error message at theodore.moke@gmail.com</p>
          <p>{this.props.e}</p>
        </div>
      </Grid.Column>
    )
  }
}