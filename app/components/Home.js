import React from 'react';
import { Grid, Button, Header } from 'semantic-ui-react'
import ThreeDay from './ThreeDay'
import FiveDayLeague from './FiveDayLeague'


export default class Home extends React.Component {
  render() {
    return (
      //<ThreeDay header='Cincinnati, OH' parks={['cin','laa','nya','col','was','tex','cle']}></ThreeDay>
      <FiveDayLeague header='Ballpark Weather' parks={['cin','laa','nya','col','was','tex','cle']}></FiveDayLeague>
    )
  }
}