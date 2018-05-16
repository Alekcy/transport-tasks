import React, { Component, Fragment } from 'react';
import { Button, Collapse } from 'mdbreact';
import { observer } from 'mobx-react';
import {Row, Col} from 'reactstrap'
import TableStore from '../store/TableStore'
import ReactTable from 'react-table'

@observer
export default class CreateTableContainer extends Component {



  constructor (props) {
    super(props)
    this.state = {
      data: this.createData()
    }
  }

  createData = () => {
    let columns = TableStore.columns
    let rows = TableStore.rows

    let data = []
    for (let i = 0; i < rows; i++)
    {
      let row = {}
      for (let j = 0; j < columns; j++) {
        let colName = 'B'+(j+1)
        row[colName] = ''
      }
      data.push({
        'firstColumn': 'A' + (i+1),
        ...row,
        'holdings': ''
      })
      console.log(data)
    }
    return data
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
            return (
              <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                  console.log(cellInfo)
                  const data = [...this.state.data];
                  data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                  this.setState({ data });
                }}
                dangerouslySetInnerHTML={{
                  __html: this.state.data[cellInfo.index][cellInfo.column.id]
                }}
              />
            )
          }
        ),
      })
    }

    columnsForTable.push({
      Header: "Запасы",
      accessor: 'holdings',
    })
    return columnsForTable
  }

  createTable = () => {
    let columns = this.createColumns()
    console.log({
      data: this.state.data,
      col: columns
    })
    return (
      <ReactTable
        style={{
          maxHeight: "400px" // This will force the table body to overflow and scroll, since there is not enough room
        }}
        data={this.state.data}
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
            <Button color="primary" onClick={() => {
              console.log(this.state.data)
            }}>
              Решение
            </Button>
          </Row>
        </Col>
      </Row>
    );
  }
}
