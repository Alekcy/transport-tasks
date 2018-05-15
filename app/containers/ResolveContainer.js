import React, { Component, Fragment } from 'react';
import { Button, Collapse } from 'mdbreact';
import { observer } from 'mobx-react';
import {Row, Col} from 'reactstrap'
import { Router, Route, withRouter } from 'react-router';
import { Switch, BrowserRouter , NavLink } from 'react-router-dom';
import StartContainer from './StartContainer'
@observer
export default class ResolveContainer extends Component {

  constructor (props) {
    super(props)
  }

  render() {
    return (
      <Row>
        <Button>resolve</Button>
      </Row>
    );
  }
}
