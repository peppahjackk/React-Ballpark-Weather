import React from 'react'
import { Grid, Header, Table, Popup } from 'semantic-ui-react'
import PrecipPercent from './PrecipPercent'
import PrecipType from './PrecipType'
import dateManipulation from '../utils/dateManipulation'

export default class PopupDaily extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
        <Popup trigger={<span className='isHourly'><PrecipPercent parkData={this.props.parkData}/> <PrecipType parkData={this.props.parkData} /></span>} flowing hoverable>
          {this.props.parkData[1][0].summary}
        </Popup>
      )
  }
}