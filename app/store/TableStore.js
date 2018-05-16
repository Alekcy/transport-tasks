import { observable, computed, flow, action } from 'mobx';
import DiffRentMethod from '../utils/DiffRentMethod'

class TableStore {

  @observable _columns = null;
  @observable _rows = null;
  @observable _data = null;
  @observable _normalizeData = null


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

  set data(value) {
    this._data = value
  }

  get data() {
    return this._data
  }

  set normalizeData(value) {
    this._normalizeData = value
  }

  get normalizeData() {
    return this._normalizeData
  }

  createData () {
    let columns = this.columns
    let rows = this.rows

    let data = []
    let row = this.createRows(columns)

    for (let i = 0; i < rows; i++)
    {
      data.push({
        'firstColumn': 'A' + (i+1),
        ...row,
        'holdings': ''
      })
    }

    data.push({
      'firstColumn': 'Потребности',
      ...row,
      'holdings': ''
    })
    return data
  }

  createRows = (columns) => {
    let row = {}
    for (let j = 0; j < columns; j++) {
      let colName = 'B'+(j+1)
      row[colName] = ''
    }
    return row
  }

  dataNormalizeForCalculate(data) {
    let normalizeData = {
      tarifs: [],
      inventory: [],
      holdings: []
    }

    data.map((item, i) => {
      if (data.length !== i+1) {
        let row = []
        Object.entries(item).forEach(([key, value]) => {
          if (key.substring(0, key.length - 1) === 'B'){
            row.push(value)
          } else if (key === 'holdings') {
            normalizeData.holdings.push(value)
          }
        });
        normalizeData.tarifs.push(row)
      } else {
        Object.entries(item).forEach(([key, value]) => {
          if (key.substring(0, key.length - 1) === 'B'){
            normalizeData.inventory.push(value)
          }
        });
      }
    })
    this.normalizeData = normalizeData
  }

  calculate = () => {
    let s = {"tarifs":[["7","12","4","8","5"],["1","8","6","5","3"],["6","13","8","7","4"]],"inventory":["110","90","120","80","150"],"holdings":["180","350","20"]}
    DiffRentMethod.init(s)
  }
}
export default new TableStore();