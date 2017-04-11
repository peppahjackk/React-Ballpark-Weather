import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import styles from '../styles'

export default class MultiParkDetails extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div style={styles.details}>
        <Header as='h3' style={styles.infoHeader}>{this.props.dateInfo['Day'+this.props.day]}</Header>
        <Header as='h4' style={styles.infoSubHeader}>{this.props.dateInfo['Day'+this.props.day+'Date']}</Header>
        <ul style={styles.list}>
          {this.props.cities.map((park) => <li key={park.home_name_abbrev+this.props.day}>{park.home_team_name} {this.props.data[park.home_name_abbrev].daily.data[this.props.day].precipProbability}</li>)}
        </ul>
      </div>
    )
  }
}