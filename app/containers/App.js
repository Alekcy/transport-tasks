import React, { Component, Fragment } from 'react';
import { Button, Collapse } from 'mdbreact';
import { observer } from 'mobx-react';
import {Container} from 'reactstrap'
import {Row, Col} from 'reactstrap'
import { Router, Route, withRouter, Redirect  } from 'react-router';
import { Switch, BrowserRouter , NavLink , HashRouter } from 'react-router-dom';
import StartContainer from './StartContainer'
import ResolveContainer from './ResolveContainer'
import CreateTableContainer from './CreateTableContainer'
@observer
class App extends Component {

  constructor (props) {
    super(props)
    this.props.history.push('/')
  }
  render() {
    return (
        <Container fluid style={{
          height: '100vh',
          overflow: 'scroll'
        }}>
          <Route exact path={ '/' } component={ StartContainer }/>
          <Route exact path={ '/create-table' } component={ CreateTableContainer }/>
          <Route exact path={ '/resolve' } component={ ResolveContainer }/>
        </Container>
    );
  }
}
export default withRouter(App);