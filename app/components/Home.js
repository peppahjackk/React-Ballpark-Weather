import React from 'react';
import { Grid, Button, Header } from 'semantic-ui-react'
import ThreeDay from './ThreeDay'


export default class Home extends React.Component {
  render() {
    return (
      <ThreeDay header='New York, NY'></ThreeDay>
    )
  }
}