import React from 'react'
import { Grid, Header, Table, Divider } from 'semantic-ui-react'
import GameTime from './GameTime'
import PrecipPercent from './PrecipPercent'
import PrecipType from './PrecipType'
import DetailsHeader from './DetailsHeader'
import officialTeamTwitter from '../utils/officialTeamTwitter'
import PopupHourly from './PopupHourly'
import PopupDaily from './PopupDaily'
import dateManipulation from '../utils/dateManipulation'

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
      highChanceTable = <div><Header as='h3' className='infoHeader'>MLB Parks with a high rain chance</Header><Table celled compact='very' unstackable className='precipTable'>
            <DetailsHeader />
            <Table.Body>
              {gameData.high.map((currPark) => {
                let isHourly;
                let parkData = currPark[Object.keys(currPark)[0]];
                // Set the hourly or daily detail popup on hover
                if (parkData[0] === 'hourly') {
                  isHourly = <Table.Cell><PopupHourly parkData={parkData} time={dateManipulation.stripMinutes(parkData[2].data.event_time)}/></Table.Cell>;
                } else if (parkData[0] === 'current') {
                  isHourly = <Table.Cell><PopupHourly parkData={parkData} time='Current' /></Table.Cell>
                } else {
                  isHourly = <Table.Cell><PopupDaily parkData={parkData} /></Table.Cell>;
                }
                return (<Table.Row key={parkData[2].park+parkData[2].gm}>
                  <Table.Cell>{parkData[2].data.away_name_abbrev} vs {parkData[2].park}</Table.Cell>
                  <Table.Cell><GameTime data={parkData[2].data} /></Table.Cell>
                  {isHourly}
                  <Table.Cell>
                    <a href={'http://www.twitter.com/' + officialTeamTwitter.twitterLinks[parkData[2].park]} target="_blank" className='infoIconLink'>
                      <img src="images/icons/social-1_logo-twitter.svg" alt="twitter" className='infoIcon' />
                    </a><
                  /Table.Cell>
                </Table.Row>)
              })}
            </Table.Body>
          </Table></div>
    } else {
      // Delivers the good news that no games have a high precipitation chance
      highChanceTable = <div><Header as='h3' className='infoHeader noHighChanceHeader'>No games have a high chance of rain!</Header> <Divider /></div>
    }
      // Places low chance parks into a list
      lowChanceList = gameData.low.map((currPark) => {
        let isHourly;
        let parkData = currPark[Object.keys(currPark)[0]];
        // Sets hourly or daily detail popup on hover
        if (parkData[0] === 'hourly') {
          isHourly = <PopupHourly parkData={parkData} time={dateManipulation.stripMinutes(parkData[2].data.event_time)} noType/>;
        } else if (parkData[0] === 'current') {
          isHourly = <PopupHourly parkData={parkData} time='Current' noType/>
        } else {
          isHourly = <PopupDaily parkData={parkData} noType/>;
        }
        // Displays game start time or status if it is in play or delayed
        let time = parkData[2].data.event_time;
        if (['preview','pre-game','warmup'].indexOf(parkData[2].data.status.toLowerCase()) < 0) {
             time = parkData[2].data.status;
             }
        return (<li key={parkData[2].park+parkData[2].gm} className='listItem'><span className='parkItem'>{parkData[2].data.away_name_abbrev} vs {parkData[2].park}</span> - <span>{time} </span> - {isHourly}</li>)
      });

      // Adds Dome parks to the end of the low chance parks list
      gameData.dome.map((currPark) => {
        let parkData = currPark[Object.keys(currPark)[0]];
        // Displays game start time or status if it is in play or delayed
        let time = parkData[2].data.event_time;
        if (['preview','pre-game','warmup'].indexOf(parkData[2].data.status.toLowerCase()) < 0) {
             time = parkData[2].data.status;
             }
        lowChanceList.push(<li key={parkData[2].park+parkData[2].gm} className='listItem'><span className='parkItem'>{parkData[2].data.away_name_abbrev} vs {parkData[2].park}</span> - <span>{time}</span> - <span className='precipItem'>DOME</span></li>);
      return; 
      });
                         
    return (
      <Grid.Column tablet={16} mobile={16} computer={5}>
        <div className='detailsContainer'>
          <Header as='h3' className='infoHeader'>{this.props.dateInfo['Day'+this.props.day]}</Header>
          <Header as='h4' className='infoSubHeader noMarginTop'>{this.props.dateInfo['Day'+this.props.day+'Date'].month}  {this.props.dateInfo['Day'+this.props.day+'Date'].day + ' '}  
{this.props.dateInfo['Day'+this.props.day+'Date'].year}</Header>
        </div>
        <div className='detailsContainer'>
          {highChanceTable}
          <Header as='h3' className='infoHeader noMarginTop'>MLB Parks with a low rain chance</Header>
          <ul className='list lowChance'>{lowChanceList}</ul>
          <Divider />
          <p className='infoSubHeader indicator'>* indicates game time data</p>
        </div>
      </Grid.Column>
    )
  }
}