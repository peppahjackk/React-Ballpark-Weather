import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import styles from '../styles'

export default class WeatherDetails extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div>
        <Grid.Column width={4}>
          <Header as='h3' style={styles.infoHeader}>{this.props.day}</Header>
          <p>{this.props.date}</p>
          <p style={styles.bold}>{this.props.precipPercent}</p>
          <p>{this.props.summary}</p>
        </Grid.Column>
      </div>
    )
  }
}

WeatherDetails.defaultProps = {
  precipPercent: '0% chance of rain'
}