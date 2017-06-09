import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import MessageError from './MessageError'

export default class ErrorMsg extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let message;
    if (this.props.e) {
      message = <MessageError e={this.props.e} />
    } else {
      message = <div className='detailsContainer'>
          <p>{this.props.msg}</p>
      </div>
    }
    return (
      <Grid.Column tablet={16} mobile={16} computer={10}>
        {message}
      </Grid.Column>
    )
  }
}