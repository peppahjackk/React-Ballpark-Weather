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
    let highChanceTable,
        lowChanceList,
        gameData = this.props.gameData;
    // Places high chance parks into a table
    if (gameData.high.length) {
      highChanceTable = <Table celled compact unstackable className='precipTable'>
            <DetailsHeader />
            <Table.Body>
              {gameData.high.map((currPark) => {
               let parkData = currPark[Object.keys(currPark)[0]];
               console.log(parkData);
                return (<Table.Row key={parkData[2].park+parkData[2].gm}>
                  <Table.Cell>{parkData[2].data.away_name_abbrev} vs {parkData[2].park}</Table.Cell>
                  <Table.Cell><GameTime data={parkData[2].data} /></Table.Cell>
                  <Table.Cell><PrecipPercent parkData={parkData} /> <PrecipType parkData={parkData} /></Table.Cell>
                  <Table.Cell>
                    <a href={'http://www.twitter.com/' + officialTeamTwitter.twitterLinks[parkData[2].park]} target="_blank" className='infoIconLink'>
                      <img src="images/icons/social-1_logo-twitter.svg" alt="twitter" className='infoIcon' />
                    </a><
                  /Table.Cell>
                </Table.Row>)
              })}
            </Table.Body>
          </Table>
    } else {
      // Delivers the good news that no games have a high precipitation chance
      highChanceTable = <div><Header as='h3' className='infoSubHeader noHighChanceHeader'>No more games have a high chance of rain!</Header> <Divider /></div>
    }

      // Places Low chance parks into a list
      lowChanceList = gameData.low.map((currPark) => {
        let parkData = currPark[Object.keys(currPark)[0]];
        return (<li key={parkData[2].park+parkData[2].gm} className='listItem'>{parkData[2].data.away_name_abbrev} vs {parkData[2].park} <PrecipPercent parkData={parkData} /></li>)
      });

      // Adds Dome parks to the end of the low chance parks list
      gameData.dome.map((currPark) => {
        let parkData = currPark[Object.keys(currPark)[0]];
        lowChanceList.push(<li key={parkData[2].park+parkData[2].gm} className='listItem'>{parkData[2].data.away_name_abbrev} vs {parkData[2].park} -%</li>);
      return; 
      });

      // Adds a dash to keep the two column list looking even stevens 
        if (!lowChanceList.length) {
          lowChanceList.push(<li key={'emptyPark1'} className='listItem'>n/a</li>);
          lowChanceList.push(<li key={'emptyPark2'} className='listItem'>n/a</li>);
        } else if (lowChanceList.length % 2) {
        lowChanceList.push(<li key={'emptyPark'+this.props.day} className='listItem'>-</li>);
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
          <ul className='list lowChance'>{lowChanceList}</ul>     
          <p className='infoSubHeader'>* indicates game time data</p>
        </div>
      </Grid.Column>
    )
  }
}