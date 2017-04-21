import React from 'react'
import { Grid, Header, Table } from 'semantic-ui-react'
import styles from '../styles'
import PrecipPercent from './PrecipPercent'
import PrecipType from './PrecipType'
import LowChancePrecip from './LowChancePrecip'

export default class MultiParkDetails extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let domeParks = [], highChanceParks = [], lowChanceParks = [], emptyPark = [];
    for (let i = 0; i < this.props.parks.length; i++) {
      if (['ARI','HOU','MIA','MIL','SEA','TB','TOR'].indexOf(this.props.parks[i].home_name_abbrev) > -1) {
        domeParks.push(this.props.parks[i]);
      } else if (this.props.data[this.props.parks[i].home_name_abbrev].daily.data[this.props.day].precipProbability < .4) {
        lowChanceParks.push(this.props.parks[i]);
      } else {
        highChanceParks.push(this.props.parks[i]);
      }
    }
    let lowChanceNum = lowChanceParks.length + domeParks.length;
    if (lowChanceNum % 2) {
      emptyPark.push('-');
    }
    return (
      <Grid.Column tablet={16} mobile={16} computer={5}>
        <div style={styles.detailsContainer}>
          <Header as='h3' style={styles.infoHeader}>{this.props.dateInfo['Day'+this.props.day]}</Header>
          <Header as='h4' style={styles.infoSubHeader}>{this.props.dateInfo['Day'+this.props.day+'Date']}</Header>
        </div>
          <div style={styles.detailsContainer}>
            <Table celled compact unstackable style={styles.precipTable}>
              <Table.Header style={styles.precipTHead}>
                <Table.Row>
                  <Table.HeaderCell>Matchup</Table.HeaderCell>
                  <Table.HeaderCell>Precip %</Table.HeaderCell>
                  <Table.HeaderCell>Type</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
      
            <Table.Body>
              {highChanceParks.map((park) =>
                <Table.Row key={park.home_name_abbrev+this.props.day}>
                  <Table.Cell>{park.home_name_abbrev} vs {park.away_name_abbrev}</Table.Cell>
                  <PrecipPercent data={this.props.data[park.home_name_abbrev]} day={this.props.day}/>
                  <PrecipType data={this.props.data[park.home_name_abbrev]} day={this.props.day} />
                </Table.Row>
               )}
            </Table.Body>
          </Table>
            <Header as='h4' style={styles.infoSubHeader}>Low or No Chance Parks</Header>
            <ul style={Object.assign({}, styles.list, styles.lowChance)}>
              {lowChanceParks.map((park) => <li key={park.home_name_abbrev+this.props.day} style={styles.listItem}>{park.away_name_abbrev} vs {park.home_name_abbrev} {Math.round(this.props.data[park.home_name_abbrev].daily.data[this.props.day].precipProbability * 100)}%</li>)}
            {domeParks.map((park) => <li key={park.home_name_abbrev+this.props.day} style={styles.listItem}>{park.away_name_abbrev} vs {park.home_name_abbrev} - %</li>)}
                           {emptyPark.map((park) => <li key={'emptyPark'+this.props.day} style={styles.listItem}>-</li>)}</ul>
        </div>
      </Grid.Column>
    )
  }
}