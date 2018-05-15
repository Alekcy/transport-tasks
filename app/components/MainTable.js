import React, { Component, Fragment } from 'react';
import { Button, Collapse } from 'mdbreact';
import { observer } from 'mobx-react';

@observer
export default class MainTable extends Component {

  constructor (props) {
    super(props)
  }

  render() {
    return (
      <div className={'container'}>
        <Button>table</Button>
      </div>
    );
  }
}
