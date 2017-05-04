import React, { PropTypes } from 'react'
import { Table } from 'semantic-ui-react'

export default class EmptyTableRow extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    // Inserts X number of blank cells into Semantic UI Table
    let cells = [];
    for (let i = 0; i < this.props.cells; i++) {
      cells.push(<Table.Cell key={i}>{this.props.fill}</Table.Cell>)
    }
    return (
      <Table.Row>
        {cells}
      </Table.Row>
    )
  }
}
  
  EmptyTableRow.defaultProps = {
    fill: 'n/a'
  }
  
  EmptyTableRow.propTypes = {
    cells: React.PropTypes.number.isRequired,
    fill: React.PropTypes.string
  }