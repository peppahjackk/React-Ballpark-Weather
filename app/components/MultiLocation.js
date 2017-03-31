import React from 'react'
import { Grid } from 'semantic-ui-react'

export default class MultiLocation extends React.Component {
  constructor(props) {
    super(props)
  }
  
  componentDidMount() {
    darkSkyHelper.getWeather(this.props.parks)
    .then(function(info) {
      return darkSkyHelper.formatWeather(info, this.state.days, this.props.parks);
    }.bind(this))
    .then(function(data) {
      this.setState(data);
    }.bind(this))
  }
  
  render() {
    return (
        <Grid.Row>
          <Grid.Column>Mon</Grid.Column>
          <Grid.Column>Tues</Grid.Column>
          <Grid.Column>Wed</Grid.Column>
          <Grid.Column>Thur</Grid.Column>
          <Grid.Column>Fri</Grid.Column>
        </Grid.Row>
    )
  }
}