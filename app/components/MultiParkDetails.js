import React from 'react'
import { Grid, Header, Table, Divider } from 'semantic-ui-react'
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
      highChanceTable = <Table celled compact unstackable className='precipTable'>
            <DetailsHeader />
            <Table.Body>
              {highChanceParks.map((park) =>
                <Table.Row key={park.home_name_abbrev+this.props.day+'gm'+park.game_nbr}>
                  <Table.Cell>{park.away_name_abbrev} vs {park.home_name_abbrev}</Table.Cell>
                  <Table.Cell><GameTime data={this.props.gameData[park.home_name_abbrev+park.game_nbr][2]} /></Table.Cell>
                  <Table.Cell><PrecipPercent park={park.home_name_abbrev+park.game_nbr} gameData={this.props.gameData} /> <PrecipType park={park.home_name_abbrev+park.game_nbr} gameData={this.props.gameData} /></Table.Cell>
                  <Table.Cell>
                    <a href={'http://www.twitter.com/' + officialTeamTwitter.twitterLinks[park.home_name_abbrev]} target="_blank" className='infoIconLink'>
                      <img src="images/icons/social-1_logo-twitter.svg" alt="twitter" className='infoIcon' />
                    </a><
                  /Table.Cell>
                </Table.Row>
               )}
            </Table.Body>
          </Table>
    } else {
      // Delivers the good news that no games have a high precipitation chance
      highChanceTable = <div><Header as='h3' className='infoSubHeader noHighChanceHeader'>No parks have a high chance of precipitation!</Header> <Divider /></div>
    }
    // Adds a dash to keep the two column list looking even stevens
    let lowChanceNum = lowChanceParks.length + domeParks.length;
    if (lowChanceNum % 2) {
      emptyPark.push('-');
    }
    return (
      <Grid.Column tablet={16} mobile={16} computer={5}>
        <div className='detailsContainer'>
          <Header as='h3' className='infoHeader'>{this.props.dateInfo['Day'+this.props.day]}</Header>
          <Header as='h4' className='infoSubHeader noMarginTop'>{this.props.dateInfo['Day'+this.props.day+'Date'].month}  {this.props.dateInfo['Day'+this.props.day+'Date'].day + ' '}  
{this.props.dateInfo['Day'+this.props.day+'Date'].year}</Header>
        </div>
        <div className='detailsContainer'>
          {highChanceTable}
          <Header as='h4' className='infoHeader noMarginTop'>Low or No Chance Parks</Header>
          <ul className='list lowChance'>
            {lowChanceParks.map((park) => <li key={park.home_name_abbrev+this.props.day+'gm'+park.game_nbr} className='listItem'>{park.away_name_abbrev} vs {park.home_name_abbrev} <PrecipPercent park={park.home_name_abbrev+park.game_nbr} gameData={this.props.gameData} /></li>)}
            {domeParks.map((park) => <li key={park.home_name_abbrev+this.props.day+'gm'+park.game_nbr} className='listItem'>{park.away_name_abbrev} vs {park.home_name_abbrev} -%</li>)}
            {emptyPark.map((park) => <li key={'emptyPark'+this.props.day} className='listItem'>-</li>)}
          </ul>
          <p className='infoSubHeader'>* indicates game time data</p>
        </div>
      </Grid.Column>
    )
  }
}