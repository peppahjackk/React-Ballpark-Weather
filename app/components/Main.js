import React from 'react';
import Nav from './Nav';

const menuOptions = ['Home', 'Day', 'Stadium'];
const menuTitle = 'Ballpark Weather';

export default class Main extends React.Component {
   constructor(props) {
     super(props);
   }
  
  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, {key: this.props.location.pathname})}
      </div>  
    )
  }
}

//Proper Nav call
//<Nav items={menuOptions} title={menuTitle} start={menuOptions[0]}></Nav>