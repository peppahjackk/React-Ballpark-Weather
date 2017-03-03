import React from 'react';

export default class Main extends React.Component {
   constructor(props) {
    super(props); }
  render() {
    return (
      <div>
        <h1>Itsa me Main</h1>
        {React.cloneElement(this.props.children, {key: this.props.location.pathname})}
      </div>  
    )
  }
}