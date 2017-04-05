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
        <Header as='h3' style={styles.infoHeader}>{this.props.data['Day'+this.props.day]}</Header>
        <Header as='h4' style={styles.infoSubHeader}>{this.props.data['Day'+this.props.day+'Date']}</Header>
        <ul style={styles.list}>
          {this.props.cities[this.props.day].map((park) => <li key={park+this.props.day}>{park} {this.props.data[park+'Day'+this.props.day+'PrecipPercent']}</li>)}
        </ul>
      </div>
    )
  }
}