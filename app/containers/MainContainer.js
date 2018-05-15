import React, { Component, Fragment } from 'react';
import { Button, Collapse } from 'mdbreact';
import { observer } from 'mobx-react';
import {Row, Col} from 'reactstrap'

@observer
export default class MainContainer extends Component {

  constructor (props) {
    super(props)
  }

  render() {
    return (
      <Row noGutters className={'justify-content-center'}>
        <Button>s</Button>
      </Row>
    );
  }
}
