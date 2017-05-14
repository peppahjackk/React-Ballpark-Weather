import React from 'react'
import { Grid } from 'semantic-ui-react'

export default class PageHeader extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return(
        <Grid.Column width={this.props.cols}>
          <Grid.Row>
            <Grid.Column>
              <img src="images/bpw-logo-green-v3.png" alt="Ballpark Weather Logo" className='headerImg' />
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>
    )
  }
}