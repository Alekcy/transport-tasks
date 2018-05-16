import React, { Component, Fragment } from 'react';
import { Button, Collapse } from 'mdbreact';
import { observer } from 'mobx-react';
import {Row, Col} from 'reactstrap'
import TableStore from '../store/TableStore'
import ReactTable from 'react-table'
import { observable, computed, flow, action } from 'mobx';

@observer
export default class CreateTableContainer extends Component {
  @computed TableStore;

  constructor (props) {
    super(props)
    TableStore.data = TableStore.createData()
    /*this.state = {
      data: this.createData()
    }*/
  }

  createColumns = () => {
    let columnsForTable = []
    let columns = TableStore.columns


    columnsForTable.push({
      Header: "Пункты отправления",
      accessor: 'firstColumn',
    })

    for (let j = 0; j < columns; j++) {
      let colName = 'B'+(j+1)
      columnsForTable.push({
        Header: colName,
        accessor: colName,
        Cell: (
          (cellInfo) => {
            return this.createCell(cellInfo)
          }
        ),
      })
    }

    columnsForTable.push({
      Header: "Запасы",
      accessor: 'holdings',
      Cell: (
        (cellInfo) => {
          return this.createCell(cellInfo)
        }
      ),
    })
    return columnsForTable
  }

  createCell = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        onBlur={e => {
          const data = [...TableStore.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          TableStore.data = data
        }}
        dangerouslySetInnerHTML={{
          __html: TableStore.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    )
  }

  createTable = () => {
    let columns = this.createColumns()
    console.log({
      data: TableStore.data,
      col: columns
    })
    return (
      <ReactTable
        style={{
          maxHeight: "400px" // This will force the table body to overflow and scroll, since there is not enough room
        }}
        data={TableStore.data}
        columns={columns}
        defaultPageSize={10}
        showPagination={false}
        className="-striped -highlight"
      />
    )
  }
  /*Footer: (
                <div>
                  <div>
                    <span>
                      Потребности
                    </span>
                  </div>
                  <div>
                    <span>
                      Разности
                    </span>
                  </div>
                </div>
              )*/
  /*
  *
  *
  *  */

  clickSolveButton = () => {
    TableStore.dataNormalizeForCalculate(TableStore.data)
    this.props.history.push('/resolve')
  }

  render() {
    return (
      <Row className={'justify-content-center align-items-center height-100'}>
        <Col sm={12}>
          <Row>
            <Col sm={12}>
              {this.createTable()}
            </Col>
          </Row>
          <Row className={'justify-content-center'}>
            <Button color="primary" onClick={this.clickSolveButton}>
              Решение
            </Button>
          </Row>
        </Col>
      </Row>
    );
  }
}
