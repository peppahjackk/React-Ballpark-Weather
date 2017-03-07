import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

var FillMenuOptions = props => {
  const options = props.navOptions;
  const menuOptions = options.map((option) => <Menu.Item key={option} name={option} active={props.that.state.activeItem === option} onClick={props.that.handleItemClick.bind(props.that)}>{option}</Menu.Item>)
  
  if (props.navTitle) { return (
    <Menu>
      <Menu.Item key={props.navTitle}>{props.navTitle}</Menu.Item>
      {menuOptions}
    </Menu>
    )} else { return(
    <Menu>{menuOptions}</Menu>
    )}
}

export default class Nav extends Component {
  constructor(props) {
    super(props);
    const that = this;
    this.state = {
      title: props.title,
      items: props.items,
      activeItem: props.start,
      it: that
    }
  }
  
  handleItemClick(e, {name}) {this.setState({activeItem: name})}
  
  render() {
    return(
      <FillMenuOptions navTitle={this.state.title} navOptions={this.state.items} that={this.state.it}/>
    )
  }
}