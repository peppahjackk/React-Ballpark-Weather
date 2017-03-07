import React from 'react';
import Nav from './Nav';

const menuOptions = ['Home', 'Day', 'Stadium'];
const menuTitle = 'Baseball Weather';

export default class Main extends React.Component {
   constructor(props) {
     super(props);
   }
  
  render() {
    return (
      <div>
        <Nav items={menuOptions} title={menuTitle} start={menuOptions[0]}></Nav>
        {React.cloneElement(this.props.children, {key: this.props.location.pathname})}
      </div>  
    )
  }
}