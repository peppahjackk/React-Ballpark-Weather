import React from 'react'
import { Table } from 'semantic-ui-react'

export default class GameTime extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    // Utilizes game status if it has begun
    let time = this.props.data.status;
    if (time === 'Preview' || time === 'Pre-Game')
      {
        time = this.props.data.event_time;
      }
    if (this.props.data.event_time === '3:33 AM' && (time ==='Preview' || time === 'Pre-Game')) 
    {
      time = 'After Gm 1'
    }
    return(
      <span>
        {time}
      </span>
    )
  }
}