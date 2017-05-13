import React from 'react'
import { Grid, Header, Table, Divider } from 'semantic-ui-react'
import styles from '../styles'
import GameTime from './GameTime'
import PrecipPercent from './PrecipPercent'
import PrecipType from './PrecipType'
import DetailsHeader from './DetailsHeader'
import officialTeamTwitter from '../utils/officialTeamTwitter'

export default class MultiParkDetails extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let domeParks = [], highChanceParks = [], lowChanceParks = [], emptyPark = [], highChanceTable;
    // Distributes the days parks into high chance, low chance, and dome parks
    Object.keys(this.props.parks).map(function(park) {
       if (['ARI','HOU','MIA','MIL','SEA','TB','TOR'].indexOf(this.props.parks[park].home_name_abbrev) > -1) {
        domeParks.push(this.props.parks[park]);
      } else if (this.props.gameData[this.props.parks[park].home_name_abbrev+this.props.parks[park].game_nbr][1].precipProbability >= 0.4) {
        highChanceParks.push(this.props.parks[park]);
      } else {
        lowChanceParks.push(this.props.parks[park]);
      }
    }.bind(this))
    // Places high chance parks into a table
    if (highChanceParks.length) {
      highChanceTable = <Table celled compact unstackable style={styles.precipTable}>
            <DetailsHeader />
            <Table.Body>
              {highChanceParks.map((park) =>
                <Table.Row key={park.home_name_abbrev+this.props.day+'gm'+park.game_nbr}>
                  <Table.Cell><a href={'http://www.twitter.com/' + officialTeamTwitter.twitterLinks[park.away_name_abbrev]} target="_blank">{park.away_name_abbrev}</a> vs <a href={'http://www.twitter.com/' + officialTeamTwitter.twitterLinks[park.home_name_abbrev]} target="_blank">{park.home_name_abbrev}</a></Table.Cell>
                  <Table.Cell><GameTime data={this.props.gameData[park.home_name_abbrev+park.game_nbr][2]} /></Table.Cell>
                  <Table.Cell><PrecipPercent park={park.home_name_abbrev+park.game_nbr} gameData={this.props.gameData} /></Table.Cell>
                  <PrecipType data={this.props.data[park.home_name_abbrev]} day={this.props.day} />
                </Table.Row>
               )}
            </Table.Body>
          </Table>
    } else {
      // Delivers the good news that no games have a high precipitation chance
      highChanceTable = <div><Header as='h3' style={Object.assign({}, styles.infoSubHeader,styles.noHighChanceHeader)}>No parks have a high chance of precipitation!</Header> <Divider /></div>
    }
    // Adds a dash to keep the two column list looking even stevens
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
            {lowChanceParks.map((park) => <li key={park.home_name_abbrev+this.props.day+'gm'+park.game_nbr} style={styles.listItem}>{park.away_name_abbrev} vs {park.home_name_abbrev} <PrecipPercent park={park.home_name_abbrev+park.game_nbr} gameData={this.props.gameData} /></li>)}
            {domeParks.map((park) => <li key={park.home_name_abbrev+this.props.day+'gm'+park.game_nbr} style={styles.listItem}>{park.away_name_abbrev} vs {park.home_name_abbrev} -%</li>)}
            {emptyPark.map((park) => <li key={'emptyPark'+this.props.day} style={styles.listItem}>-</li>)}
          </ul>
          <p style={styles.infoSubHeader}>* indicates game time data</p>
        </div>
      </Grid.Column>
    )
  }
}