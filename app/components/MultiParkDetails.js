import React from 'react'
import { Grid, Header } from 'semantic-ui-react'

export default class MultiParkDetails extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props);
  }
  
  render() {
    return (
      <Header as='h3'>{this.props.cities}</Header>
    )
  }
}