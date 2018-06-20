import React, { Component, Fragment } from 'react';
import { Button, Collapse } from 'mdbreact';
import { observer } from 'mobx-react';
import {Row, Col} from 'reactstrap'
import TableStore from '../store/TableStore'
import CreateResolveTable from '../components/CreateResolveTable'

@observer
export default class ResolveContainer extends Component {

  constructor (props) {
    super(props)
    TableStore.calculate()

  }

  render() {

    let ResolveTable = !TableStore.fetched
    ? TableStore.data.map((item,i )=>{
        return (<CreateResolveTable key={i} data={item} rowLength={TableStore.notNormalizeData[i].tariffs[0].length}/>)
      })
      : null
    return (
      <Row>
        <Col>
          <Row>
            {ResolveTable}
          </Row>
          <Row className={'justify-content-center'}>
            <Button onClick={() => {
              this.props.history.push('/')
            }}>Новый расчет</Button>
          </Row>
        </Col>
      </Row>
    );
  }
}
