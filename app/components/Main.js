import React from 'react'
import Footer from './Footer'

export default class Main extends React.Component {
   constructor(props) {
     super(props);
   }
  
  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, {key: this.props.location.pathname})}
        <Footer />
      </div>  
    )
  }
}

/* Proper Nav call

import Nav from './Nav';
const menuOptions = ['Home', 'Day', 'Stadium'];
const menuTitle = 'Ballpark Weather';
<Nav items={menuOptions} title={menuTitle} start={menuOptions[0]}></Nav>
*/