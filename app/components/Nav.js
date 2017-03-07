import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      activeItem: ''
    }
  }
  
  handleItemClick(e, {name}) {this.setState({activeItem: name})}
  
  render() {
    return(
      <Menu>
        <Menu.Item>Baseball Weather</Menu.Item>
        <Menu.Item name={this.state.items[1]} active={this.state.activeItem === this.state.items[1]} onClick={this.handleItemClick.bind(this)}>{this.state.items[1]}</Menu.Item>
        <Menu.Item name={this.state.items[2]} active={this.state.activeItem === this.state.items[2]} onClick={this.handleItemClick.bind(this)}>{this.state.items[2]}</Menu.Item>
        <Menu.Item name={this.state.items[3]} active={this.state.activeItem === this.state.items[3]} onClick={this.handleItemClick.bind(this)}>{this.state.items[3]}</Menu.Item>
      </Menu>
    )
  }
}