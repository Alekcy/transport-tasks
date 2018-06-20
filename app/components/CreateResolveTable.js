import React, { Component, Fragment } from 'react';
import { Button, Collapse } from 'mdbreact';
import { observer } from 'mobx-react';
import {Row, Col} from 'reactstrap'
import TableStore from '../store/TableStore'
import ReactTable from 'react-table'
import { observable, computed, flow, action } from 'mobx';

@observer
export default class CreateResolveTable extends Component {
  @computed TableStore;

  constructor (props) {
    super(props)
    this.data = props.data
  }

  createColumns = () => {
    let columnsForTable = []

    columnsForTable.push({
      Header: "Пункты отправления",
      accessor: 'firstColumn',
    })


    for (let j = 0; j < this.props.rowLength; j++) {
      let colName = 'B'+(j+1)
      columnsForTable.push({
        Header: colName,
        accessor: colName,
      })
    }

    columnsForTable.push({
      Header: "Запасы",
      accessor: 'holdings',
    })

    columnsForTable.push({
      Header: "Избыток и недостаток",
      accessor: 'deficiencyAndExcess',
    })

    return columnsForTable
  }

  createTable = () => {
    let columns = this.createColumns()
    console.log({
      data: this.data,
      col: columns
    })
    return (
      <ReactTable
        style={{
          maxHeight: "400px" // This will force the table body to overflow and scroll, since there is not enough room
        }}
        data={this.data}
        columns={columns}
        defaultPageSize={10}
        showPagination={false}
        className="-striped -highlight"
      />
    )
  }


  render() {
    return (
        <Col sm={12}>
          <Row>
            <Col sm={12}>
              {this.createTable()}
            </Col>
          </Row>
        </Col>
    );
  }
}
