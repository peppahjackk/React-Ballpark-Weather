import React from 'react'
import { Container, Grid, Header } from 'semantic-ui-react'
import PageHeader from './PageHeader'
import styles from '../styles'

export default class Loading extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <Container>
        <Grid columns={this.props.days} centered style={styles.fullGrid}>
          <PageHeader header={this.props.header} subheader={this.props.subheader} cols={this.props.days}></PageHeader>
          <Grid.Row>
            <Grid.Column>      
              <Header as='h2'>Loading</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}