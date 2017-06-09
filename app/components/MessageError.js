import React from 'react'
import { Grid, Header } from 'semantic-ui-react'

export default class ErrorMsg extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
        <div className='detailsContainer errorContainer'>
          <Header as='h2' className='infoHeader'>Oops, we've committed an error!</Header>
          <p>Try loading the page again. If the problem persists, please email the following error message to: <a href="mailto:dev-support@ballpark-weather.com">dev-support@ballpark-weather.com</a></p>
          <div className='errorMsg'>
            <p>{this.props.e}</p>
          </div>
        </div>
    )
  }
}