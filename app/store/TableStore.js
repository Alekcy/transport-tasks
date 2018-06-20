import { observable, computed, flow, action } from 'mobx';
import DiffRentMethod from '../utils/DiffRentMethod'

class TableStore {

  @observable _columns = null;
  @observable _rows = null;
  @observable _data = null;
  @observable _normalizeData = null;
  @observable fetched = false;
  @observable notNormalizeData = null


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
    let row = this.createNullRows(columns)

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
    console.log(data)
    return data
  }

  createNullRows = (columns) => {
    let row = {}
    for (let j = 0; j < columns; j++) {
      let colName = 'B'+(j+1)
      row[colName] = ''
    }
    return row
  }

  dataNormalizeForCalculate(data) {
    let normalizeData = {
      tariffs: [],
      inventory: [],
      holdings: []
    }

    data.map((item, i) => {
      if (data.length !== i+1) {
        let row = []
        Object.entries(item).forEach(([key, value]) => {
          if (key.substring(0, key.length - 1) === 'B'){
            row.push({
              value: value,
              inventory: ''
            })
          } else if (key === 'holdings') {
            normalizeData.holdings.push(value)
          }
        });
        normalizeData.tariffs.push(row)
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


  dataNormalizeForTable(data) {
    console.log(data)
    let newData = []
    data.forEach((item) => {
      console.log(item)
      //let rows = this.rows
      let tariffs = item.tariffs
      let newDataItem = []
      let deficiencyAndExcess = item.deficiencyAndExcess
      let holdings = item.holdings
      let inventories = item.inventory
      let differences = item.differences

      for (let i = 0; i < tariffs.length; i++)
      {
        let row = this.createRows(tariffs[i])
        console.log(row)
        let deficiencyAndExcessForRow = deficiencyAndExcess[i].deficiency !== null
        ? `-${deficiencyAndExcess[i].deficiency}`
        : `+${deficiencyAndExcess[i].excess}`

        newDataItem.push({
          'firstColumn': 'A' + (i+1),
          ...row,
          'deficiencyAndExcess': deficiencyAndExcessForRow,
          'holdings': holdings[i]
        })
      }

      inventories = this.createOtherRows(inventories)
      newDataItem.push({
        'firstColumn': 'Потребности',
        ...inventories
      })
      differences = this.createOtherRows(differences)
      newDataItem.push({
        'firstColumn': 'Разности',
        ...differences
      })

      newData.push(newDataItem)
    })

    console.log(newData)
    return newData
  }

  createRows = (row) => {
    let newRow = {}
    for (let j = 0; j < row.length; j++) {
      let colName = 'B'+(j+1)
      newRow[colName] = ''
      if (row[j].inventory === null) {
        newRow[colName] = String(row[j].value)
      } else {
        newRow[colName] = `(${row[j].value}) ${row[j].inventory}`
      }
    }
    return newRow
  }

  createOtherRows = (row) => {
    console.log(row)
    let newRow = {}
    for (let j = 0; j < row.length; j++) {
      let colName = 'B'+(j+1)
      newRow[colName] = row[j]
    }
    return newRow
  }

  calculate = () => {
    this.fetched = true
    //let s = {"tariffs":[["7","12","4","8","5"],["1","8","6","5","3"],["6","13","8","7","4"]],"inventory":["110","90","120","80","150"],"holdings":["180","350","20"]}
    console.log(this.normalizeData)
    //let d = {"tariffs":[[{"value":"1","inventory":""},{"value":"2","inventory":""}],[{"value":"2","inventory":""},{"value":"2","inventory":""}]],"inventory":["3","3"],"holdings":["3","3"]}

    let data = DiffRentMethod.init(this.normalizeData)
    this.notNormalizeData = data
    data = this.dataNormalizeForTable(data)
    this.data = data
    this.fetched = false
  }
}
export default new TableStore();