import React from 'react';
import Nav from './Nav';

 const menuOptions = {1: 'Home', 2: 'Day', 3: 'Stadium'};

export default class Main extends React.Component {
   constructor(props) {
     super(props);
   }
  
  render() {
    return (
      <div>
        <Nav items={menuOptions}></Nav>
        {React.cloneElement(this.props.children, {key: this.props.location.pathname})}
      </div>  
    )
  }
}