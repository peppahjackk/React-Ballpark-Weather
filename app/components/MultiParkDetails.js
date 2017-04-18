import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import styles from '../styles'

export default class MultiParkDetails extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let domeParks = [], outdoorParks = [], lowChanceParks = [], emptyPark = [];
    for (let i = 0; i < this.props.parks.length; i++) {
      if (['ARI','HOU','MIA','MIL','SEA','TB','TOR'].indexOf(this.props.parks[i].home_name_abbrev) > -1) {
        domeParks.push(this.props.parks[i]);
      } else if (this.props.data[this.props.parks[i].home_name_abbrev].daily.data[this.props.day].precipProbability < .4) {
        lowChanceParks.push(this.props.parks[i]);
      } else {
        outdoorParks.push(this.props.parks[i]);
      }
    }
    let lowChanceNum = lowChanceParks.length + domeParks.length;
    if (lowChanceNum % 2) {
      emptyPark.push('-');
    }
    return (
      <Grid.Column style={styles.details}>
        <Header as='h3' style={styles.infoHeader}>{this.props.dateInfo['Day'+this.props.day]}</Header>
        <Header as='h4' style={styles.infoSubHeader}>{this.props.dateInfo['Day'+this.props.day+'Date']}</Header>
          <div style={styles.detailsContainer}>
            <ul style={Object.assign({}, styles.list, styles.highChance)}>
            {outdoorParks.map((park) => <li key={park.home_name_abbrev+this.props.day} style={styles.listItem}>{park.away_name_abbrev} vs {park.home_name_abbrev} {Math.round(this.props.data[park.home_name_abbrev].daily.data[this.props.day].precipProbability * 100)}% {this.props.data[park.home_name_abbrev].daily.data[this.props.day].precipType || 'rain'}</li>)} </ul>
            <ul style={Object.assign({}, styles.list, styles.lowChance)}>
              {lowChanceParks.map((park) => <li key={park.home_name_abbrev+this.props.day} style={styles.listItem}>{park.away_name_abbrev} vs {park.home_name_abbrev} {Math.round(this.props.data[park.home_name_abbrev].daily.data[this.props.day].precipProbability * 100)}%</li>)}
            {domeParks.map((park) => <li key={park.home_name_abbrev+this.props.day} style={styles.listItem}>{park.away_name_abbrev} vs {park.home_name_abbrev} DOME</li>)}
                           {emptyPark.map((park) => <li key={'emptyPark'+this.props.day} style={styles.listItem}>-</li>)}</ul></div>
      </Grid.Column>
    )
  }
}