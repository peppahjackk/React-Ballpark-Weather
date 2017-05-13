import React from 'react'
import { Table } from 'semantic-ui-react'

export default class GameTime extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let time;
    if (this.props.data.status === 'Preview' || this.props.data.status === 'Pre-Game')
      {
        time = this.props.data.event_time;
      } else {
        time = this.props.data.status;
      }
    return(
      <span>
        {time}
      </span>
    )
  }
}