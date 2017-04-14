import React, { Component } from 'react'
import { Grid, Header } from 'semantic-ui-react'

let date = new Date();


export default class PageHeader extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return(
      <Grid.Column verticalAlign='middle'>
        <Grid.Row columns={this.props.cols}>
          <Grid.Column width={this.props.cols}>
            <Header as='h1'>{this.props.header}</Header>
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
  cols: 16
}