import React, { Component } from 'react'
import { Grid, Header } from 'semantic-ui-react'
import styles from '../styles'
let date = new Date();


export default class PageHeader extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return(
        <Grid.Column width={this.props.cols}>
          <Grid.Row>
            <Grid.Column>
              <img src="images/bpw-logo-v2.png" alt="Ballpark Weather Logo" style={styles.headerImg} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={this.props.cols}>
            <Grid.Column width={this.props.cols}>
              <Header as='h2'>{this.props.subheader}</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>
    )
  }
}

PageHeader.defaultProps = {
  header: 'Today',
  subheader: date.toDateString(),
  cols: 12
}