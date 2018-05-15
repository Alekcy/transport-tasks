import React, { Component, Fragment } from 'react';
import TestStore from '../store/TestStore'
import { Button, Collapse } from 'mdbreact';
import { observer } from 'mobx-react';
import MainContainer from './MainContainer'
import {Container} from 'reactstrap'
import {Row, Col} from 'reactstrap'
import { Router, Route, withRouter  } from 'react-router';
import { Switch, BrowserRouter , NavLink , HashRouter } from 'react-router-dom';
import StartContainer from './StartContainer'
import ResolveContainer from './ResolveContainer'

@observer
export default class App extends Component {

  constructor (props) {
    super(props)
    console.log(window.location)
  }
  render() {
    return (
      <HashRouter>
        <Container fluid>
           <Switch>
             <Route exact path={ '/' } component={ StartContainer }/>
             <Route exact path={ '/resolve' } component={ ResolveContainer }/>
           </Switch>
        </Container>
      </HashRouter>
    );
  }
}
