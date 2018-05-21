class DiffRentMethod {

  data = null
  allData = []

  init = (d) => {

    d.tariffs = d.tariffs.map((item) => {
      return item.map((tariff) => {
        return {
          value: tariff,
          inventory: null,
          check: false,
          checkGlobal: false
        }
      })
    })
    this.data = d
    let inn = 0


    let currentData = d
    let globalData = []
    while (!this.isAllInventoriesIsDistributed(currentData)) {

      let data = currentData
      let minTariffs = this.getMinTariffs(data.tariffs)

      data.tariffs = this.distributeInventory(data, minTariffs)
      data.deficiencyAndExcess = this.addDeficiencyAndExcess(data)
      data.differences = this.addDifferences(data)

      data.tariffs = this.addMinRentToRow(data)


      let newTariffs = []
      data.tariffs.forEach((tariffsRow, index) => {
        let tariffRow = []
        tariffsRow.forEach((tariff) => {
          tariffRow.push({
            ...tariff,
            check: false
          })
        })
        newTariffs.push(tariffRow)
      })
      data.tariffs = newTariffs
      console.log(data.tariffs[1])
      globalData.push({
        ...data,
        deficiencyAndExcess: data.deficiencyAndExcess,
        tariffs: data.tariffs.map((row) => {
          return row
        }),
        holdings: data.holdings,
        inventory: data.inventory,
        differences: data.differences
      })
      currentData = data

      inn++;
    }
    return globalData
  }

  isAllInventoriesIsDistributed = (data) => {
    if (data.deficiencyAndExcess !== undefined) {
      let check = true
      for (let i = 0; i< data.deficiencyAndExcess.length; i++) {
        if (data.deficiencyAndExcess[i].deficiency !== null || data.deficiencyAndExcess[i].excess !== null) {
          check = false
          break
        }
      }
      return check
    }
    return false
  }

  getMinTariffs = (tariffs) => {
    let minTariffs = []
    for (let i = 0; i < tariffs[0].length; i++) {
      let min = {
        tariff: null,
        index: null
      }
      tariffs.forEach((item, index) => {
        if (min.tariff === null && item[i].inventory === null) {
          min = {
            tariff: item[i].value,
            index: index
          }
        } else if ((item[i].inventory === 0 || item[i].inventory === null) && Number(item[i].value) <= Number(min.tariff)) {
          min = {
            tariff: item[i].value,
            index: index
          }
        }
      })
      minTariffs.push(min)
    }
    return minTariffs
  }

  getMinTarrifByRedundantRows = (data, redundantRowIndexes) => {
    let minTariffs = []
    let tariffs = data.tariffs
    for (let i = 0; i < tariffs[0].length; i++) {
      let min = null

      for (let j = 0; j < tariffs.length; j++) {
        if (redundantRowIndexes.indexOf(j) !== -1) {

          if (tariffs[j][i].checkGlobal) {
            min = null
            break
          }
          if (min === null) {
            min = tariffs[j][i].value
          } else if (min !== null && Number(tariffs[j][i].value) <= Number(min)) {
            min = tariffs[j][i].value
          }
        }
      }
      minTariffs.push(min)
    }
    return minTariffs
  }

  distributeInventory = (data, minTariffs) => {
    let tariffs = data.tariffs
    let inventories = data.inventory
    let holdings = data.holdings
    inventories = this.getFreeInventories(data)
    for (let i = 0; i < tariffs[0].length; i++) {
      if (inventories[i] !== 0) {
        let minTariffCurrentIndex = minTariffs[i].index
        let remainder = this.checkHolding(holdings[minTariffCurrentIndex], inventories[i], tariffs, minTariffCurrentIndex)
        if (Number(inventories[i]) < remainder) {
          tariffs[minTariffCurrentIndex][i].inventory = inventories[i]
        } else {
          tariffs[minTariffCurrentIndex][i].inventory = remainder
        }
        tariffs[minTariffCurrentIndex][i].check = true
        tariffs[minTariffCurrentIndex][i].checkGlobal = true
      }
    }
    return tariffs
  }

  getFreeInventories = (data) => {
    let freeInventories = []

    for (let i = 0; i < data.tariffs[0].length; i++) {
      let columnCount = 0;
      for (let j = 0; j < data.tariffs.length; j++){
        if (data.tariffs[j][i].inventory !== null) {
          columnCount += Number(data.tariffs[j][i].inventory)
        }
      }
      freeInventories.push(data.inventory[i] - columnCount)
    }
    return freeInventories
  }

  checkHolding = (holding, inventory, tariffs, index) => {
    let count = 0
    tariffs[index].forEach((item) => {
      if (item.inventory !== null) {
        count += Number(item.inventory)
      }
    })
    return Number(holding)-count
  }

  addDeficiencyAndExcess = (data) => {
    let tariffs = data.tariffs
    let inventories = data.inventory
    let holdings = data.holdings
    let deficiencyAndExcess = []

    let numbersOfTariffRow = this.getNumbersOfTariffRow(tariffs)
    let indexes = []
    holdings.forEach((holding, index) => {
      if (holding > numbersOfTariffRow[index]) {
        let difference = Number(holding)-numbersOfTariffRow[index]

        deficiencyAndExcess.push({
          deficiency: null,
          excess: difference
        })
      } else {

        let freeInventories = this.getFreeInventories(data)
        let difference = null
        freeInventories.forEach((inventory, inventoryIndex) => {
          if (inventory !== 0) {

            if (indexes.indexOf(inventoryIndex) === -1) {
              difference = inventory
              indexes.push(inventoryIndex)
            } else {
              difference = '-0'
            }
            /*if (Number(numbersOfTariffRow[index]) !== Number(holding)) {
              difference = inventory
            } else {
              difference = 0
            }*/

          }
          /*let tariffInventory = tariffs[index][inventoryIndex].inventory
          if (inventory > tariffInventory) {
            difference = inventory-tariffInventory
          }*/
        })
        deficiencyAndExcess.push({
          deficiency: difference,
          excess: null
        })
      }
    })
    return deficiencyAndExcess
  }

  getNumbersOfTariffRow = (tariffs) => {
    let numbersOfTariffRow = []
    tariffs.forEach((tariffRow) => {
      let numbers = 0
      tariffRow.forEach((tariff) => {
        if (tariff.inventory !== null && tariff.inventory !== 0 && tariff.inventory && tariff.inventory !== '0') {
          numbers += Number(tariff.inventory)
        }
      })
      numbersOfTariffRow.push(numbers)
    })
    return numbersOfTariffRow
  }

  addDifferences = (data) => {
    let differences = []

    let redundantRowIndexes = this.getRedundantRowIndexes(data)
    let minTariff = this.getMinTarrifByRedundantRows(data, redundantRowIndexes)
    let checkedTariffs = this.getCheckedTariffs(data)

    for (let i = 0; i < data.tariffs[0].length; i++) {
      if (minTariff[i] !== null) {
        differences.push(Number(minTariff[i]) - Number(checkedTariffs[i]))
      } else {
        differences.push(null)
      }
    }
    return differences
  }

  getCheckedTariffs = (data) => {
    let checkedTariffs = []
    let tariffs = data.tariffs

    //let flawRowIndexes = this.getFlawRowIndex(data)

    for (let i = 0; i < tariffs[0].length; i++) {
      for (let j = 0; j < tariffs.length; j++) {
        if (tariffs[j][i].checkGlobal) {
          checkedTariffs.push(tariffs[j][i].value)
          break
        }
      }
    }
    return checkedTariffs
  }

  getMinDifference = (differences) => {
    let minDifference = null
    differences.forEach((difference) => {
      if (minDifference === null && difference !== null) {
        minDifference = Number(difference)
      }
      if (difference !== null && Number(difference) < minDifference) {
        minDifference = Number(difference)
      }
    })
    return minDifference
  }

  getRedundantRowIndexes = (data) => {
    let redundantRowIndexes = []
    data.deficiencyAndExcess.forEach((item, index) => {
      if (item.excess !== null && item.deficiency === null) {
        redundantRowIndexes.push(index)
      }
    })
    return redundantRowIndexes
  }

  getFlawRowIndex = (data) => {
    let flawRowIndex = []
    data.deficiencyAndExcess.forEach((item, index) => {
      if (item.deficiency !== null && item.excess === null) {
        flawRowIndex.push(index)
      }
    })
    return flawRowIndex
  }

  addMinRentToRow = (data) => {
    let flawRowIndex = this.getFlawRowIndex(data)
    let tariffs = data.tariffs

    let minDifference = this.getMinDifference(data.differences)

    flawRowIndex.forEach((item) => {
      let flawRow = []
      data.tariffs[item].forEach((tariff) => {
        flawRow.push({
          ...tariff,
          value: Number(tariff.value) + Number(minDifference)
        })
      })
      tariffs[item] = flawRow
    })



    return tariffs
  }

}

export default new DiffRentMethod();