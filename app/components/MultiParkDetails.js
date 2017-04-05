import React from 'react'
import { Grid, Header } from 'semantic-ui-react'

export default class MultiParkDetails extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div>
        <Header as='h3'>{this.props.data['Day'+this.props.day]}</Header>
        <ul>
          {this.props.cities[this.props.day].map((park) => <li key={park+this.props.day}>{park} {this.props.data[park+'Day'+this.props.day+'PrecipPercent']}</li>)}
        </ul>
      </div>
    )
  }
}