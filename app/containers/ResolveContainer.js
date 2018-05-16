import React, { Component, Fragment } from 'react';
import { Button, Collapse } from 'mdbreact';
import { observer } from 'mobx-react';
import {Row, Col} from 'reactstrap'
import TableStore from '../store/TableStore'

@observer
export default class ResolveContainer extends Component {

  constructor (props) {
    super(props)
    TableStore.calculate()
  }

  render() {
    return (
      <Row>
        <Button>resolve</Button>
      </Row>
    );
  }
}
