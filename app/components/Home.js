import React from 'react';
import { Grid, Button, Header } from 'semantic-ui-react'
import ThreeDay from './ThreeDay'
import FiveDayLeague from './FiveDayLeague'


export default class Home extends React.Component {
  render() {
    return (
      <FiveDayLeague header='Ballpark Weather'></FiveDayLeague>
    )
  }
}