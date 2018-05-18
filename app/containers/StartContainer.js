import React, { Component, Fragment } from 'react';
import { Button, Collapse, Input ,Card, CardBody, CardImage, CardTitle, CardText} from 'mdbreact';
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
          <Row>
            <Card cascade>
              <CardBody>
                <CardText style={{
                  textAlign: 'center'
                }}>
                  Калькулятор предназначен для решения транспортной задачи методом дифференциальных рент.
                  Для этого выберите размерность матрицы тарифов (количество поставщиков и количество магазинов).
                </CardText>
              </CardBody>
            </Card>
          </Row>
          {this.renderInputs()}
          {this.renderCreateTableButton()}
        </Col>
      </Row>
    );
  }

  renderInputs = () => {
    return (
      <Row className={'justify-content-center'}>
        <Col xs={4} md={3}>
          <Input
            style={{width: '100%'}}
            label="Поставщики"
            value={TableStore.rows}
            onChange={(e) => {
              TableStore.rows = e.target.value
            }}
          />
        </Col>
        <Col xs={4} md={3}>
          <Input
            style={{width: '100%'}}
            label="Магазины"
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
        <Col xs={8} md={6} lg={6}>
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
