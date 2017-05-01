import React from 'react'
import { Grid, Header, Table, Divider } from 'semantic-ui-react'
import styles from '../styles'
import PrecipPercent from './PrecipPercent'
import PrecipType from './PrecipType'
import LowChancePrecip from './LowChancePrecip'

export default class MultiParkDetails extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let domeParks = [], highChanceParks = [], lowChanceParks = [], emptyPark = [], highChanceTable;
    Object.keys(this.props.parks).map(function(park) {
       if (['ARI','HOU','MIA','MIL','SEA','TB','TOR'].indexOf(this.props.parks[park].home_name_abbrev) > -1) {
        domeParks.push(this.props.parks[park]);
      } else if (this.props.precipData[this.props.parks[park].home_name_abbrev][1] > 0.4) {
        highChanceParks.push(this.props.parks[park]);
      } else {
        lowChanceParks.push(this.props.parks[park]);
      }
    }.bind(this))
    if (highChanceParks.length) {
      highChanceTable = <Table celled compact unstackable style={styles.precipTable}>
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
                  <Table.Cell>{park.away_name_abbrev} vs {park.home_name_abbrev}</Table.Cell>
                  <Table.Cell><PrecipPercent park={park.home_name_abbrev} precipData={this.props.precipData} /></Table.Cell>
                  <PrecipType data={this.props.data[park.home_name_abbrev]} day={this.props.day} />
                </Table.Row>
               )}
            </Table.Body>
          </Table>
    } else {
      highChanceTable = <div><Header as='h3' style={Object.assign({}, styles.infoSubHeader,styles.noHighChanceHeader)}>No parks have a high chance of precipitation!</Header> <Divider /></div>
    }
    let lowChanceNum = lowChanceParks.length + domeParks.length;
    if (lowChanceNum % 2) {
      emptyPark.push('-');
    }
    return (
      <Grid.Column tablet={16} mobile={16} computer={5}>
        <div style={styles.detailsContainer}>
          <Header as='h3' style={styles.infoHeader}>{this.props.dateInfo['Day'+this.props.day]}</Header>
          <Header as='h4' style={Object.assign({},styles.infoSubHeader,styles.noMarginTop)}>{this.props.dateInfo['Day'+this.props.day+'Date'].month}  {this.props.dateInfo['Day'+this.props.day+'Date'].day + ' '}  
{this.props.dateInfo['Day'+this.props.day+'Date'].year}</Header>
        </div>
        <div style={styles.detailsContainer}>
            {highChanceTable}
            <Header as='h4' style={Object.assign({},styles.infoHeader,styles.noMarginTop)}>Low or No Chance Parks</Header>
            <ul style={Object.assign({}, styles.list, styles.lowChance)}>
              {lowChanceParks.map((park) => <li key={park.home_name_abbrev+this.props.day} style={styles.listItem}>{park.away_name_abbrev} vs {park.home_name_abbrev} <PrecipPercent park={park.home_name_abbrev} precipData={this.props.precipData} /></li>)}
            {domeParks.map((park) => <li key={park.home_name_abbrev+this.props.day} style={styles.listItem}>{park.away_name_abbrev} vs {park.home_name_abbrev} -%</li>)}
                           {emptyPark.map((park) => <li key={'emptyPark'+this.props.day} style={styles.listItem}>-</li>)}</ul>
              <p style={styles.infoSubHeader}>* indicates game time data</p>
        </div>
      </Grid.Column>
    )
  }
}