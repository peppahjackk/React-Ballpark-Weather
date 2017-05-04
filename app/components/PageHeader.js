import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import styles from '../styles'

export default class PageHeader extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return(
        <Grid.Column width={this.props.cols}>
          <Grid.Row>
            <Grid.Column>
              <img src="images/bpw-logo-green-v3.png" alt="Ballpark Weather Logo" style={styles.headerImg} />
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>
    )
  }
}

PageHeader.defaultProps = {
  cols: 12
}