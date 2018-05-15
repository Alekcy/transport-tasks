import React, { Component, Fragment } from 'react';
import TestStore from '../store/TestStore'
import { Button, Collapse } from 'mdbreact';
import { observer } from 'mobx-react';
import MainContainer from './MainContainer'
import {Container} from 'reactstrap'

@observer
export default class App extends Component {

  constructor (props) {
    super(props)
  }
  render() {
    return (
      <Container fluid>
        <MainContainer/>
      </Container>
    );
  }
}
