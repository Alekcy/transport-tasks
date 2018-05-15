import { observable, computed, flow, action } from 'mobx';

export default class TableStore {

  @observable _columns = null;
  @observable _rows = null;

  set columns(value) {
    this._columns = value
  }

  get columns() {
    return this._columns
  }

  set row(value) {
    this._rows = value
  }

  get row() {
    return this._rows
  }



}