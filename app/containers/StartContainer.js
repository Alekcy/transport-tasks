import React, { Component, Fragment } from 'react';
import { Button, Collapse, Input } from 'mdbreact';
import { observer } from 'mobx-react';
import {Row, Col} from 'reactstrap'
import { Switch, BrowserRouter , NavLink } from 'react-router-dom';
import TableStore from '../store/TableStore'


@observer
export default class StartContainer extends Component {

  constructor (props) {
    super(props)
  }

  render() {
    return (
      <Row className={'justify-content-center align-items-center height-100'}>
        <Col sm={6}>
          {this.renderInputs()}
          {this.renderCreateTableButton()}
        </Col>
      </Row>
    );
  }

  renderInputs = () => {
    return (
      <Row className={'justify-content-center'}>
        <Col xs={3}>
          <Input
            style={{width: '100%'}}
            label="Строк"
            value={TableStore.rows}
            onChange={(e) => {
              TableStore.rows = e.target.value
            }}
          />
        </Col>
        <Col xs={3}>
          <Input
            style={{width: '100%'}}
            label="Столбцов"
            value={TableStore.columns}
            onChange={(e) => {
              TableStore.columns = e.target.value
            }}
          />
        </Col>
      </Row>
    )
  }

  renderCreateTableButton = () => {
    return (
      <Row className={'justify-content-center'}>
        <Col xs={6}>
          <Button
            style={{width: '100%'}}
            onClick={this.clickCreateTableButton}
          >
            Создать таблицу
          </Button>
        </Col>
      </Row>
    )
  }

  clickCreateTableButton = () => {
    console.log(this.props.history)
    if (TableStore.columns && TableStore.rows) {
      this.props.history.push('/create-table')
    }
  }
}
