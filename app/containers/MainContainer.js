import React, { Component, Fragment } from 'react';
import { Button, Collapse } from 'mdbreact';
import { observer } from 'mobx-react';
import {Row, Col} from 'reactstrap'
import { Router, Route, withRouter } from 'react-router';
import { Switch, BrowserRouter , NavLink } from 'react-router-dom';
import StartContainer from './StartContainer'
import ResolveContainer from './ResolveContainer'

@observer
export default class MainContainer extends Component {

  constructor (props) {
    super(props)
  }

  render() {
    return (
      <div>s</div>
    );
  }
}
