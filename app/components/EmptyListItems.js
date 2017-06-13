import React from 'react'

export default class EmptyListItems extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let emptyRows = [];
    for (let i = 0; i < this.props.rows; i++) {
      emptyRows.push(<li className='listItem' key={i}><span className='parkItem'>Park</span> - Time - <span className='precipItem'>0%</span></li>)
    }
    return (
      <div>{emptyRows}</div>
    )
  }
}
  
  EmptyListItems.defaultProps = {
    rows: 3
  }