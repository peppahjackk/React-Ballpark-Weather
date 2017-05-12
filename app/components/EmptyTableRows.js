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
      cells.push(<Table.Cell key={i}>{this.props.fill}</Table.Cell>);
    }
    let rows = [];
    for (let i = 0; i < this.props.rows; i++) {
      rows.push(<Table.Row key={i}>{cells}</Table.Row>)
    }
    return (
      <Table.Body>
        {rows}
      </Table.Body>
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