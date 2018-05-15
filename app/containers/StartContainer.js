import React, { Component, Fragment } from 'react';
import { Button, Collapse } from 'mdbreact';
import { observer } from 'mobx-react';
import {Row, Col} from 'reactstrap'
import { Router, Route, withRouter } from 'react-router';
import { Switch, BrowserRouter , NavLink } from 'react-router-dom';

@observer
export default class StartContainer extends Component {

  constructor (props) {
    super(props)
  }

  render() {
    return (
      <Row>
        <Button>start</Button>
      </Row>
    );
  }
}
