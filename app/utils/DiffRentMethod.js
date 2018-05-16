class DiffRentMethod {

  init = (data) => {

    data.tariffs = data.tariffs.map((item) => {
      return item.map((tariff) => {
        return {
          value: tariff,
          inventory: null
        }
      })
    })

    let minTariffs = this.searchMinTariff(data.tariffs)
    console.log(minTariffs)
    this.distributeInventory(data, minTariffs)
  }

  searchMinTariff = (tariffs) => {
    let minTariffs = []
    for (let i = 0; i < tariffs[0].length; i++) {
      let min = {
        tariff: tariffs[0][i].value,
        index: 0
      }
      tariffs.forEach((item, index) => {
      /*  if (i === 1) {
          console.log(item[i], min.tariff)
          console.log(Number(item[i]) < Number(min.tariff))
        }*/
        if (Number(item[i].value) <= Number(min.tariff)) {
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

  distributeInventory = (data, minTariffs) => {
    let tariffs = data.tariffs
    let inventories = data.inventory
    let holdings = data.holdings

    for (let i = 0; i < tariffs[0].length; i++) {
      let minTariffCurrentIndex = minTariffs[i].index
     /* console.log(tariffs[minTariffCurrentIndex][i])
      console.log(inventories[i])
      console.log(holdings[minTariffCurrentIndex])*/
      let remainder = this.checkHolding(holdings[minTariffCurrentIndex], inventories[i], tariffs, minTariffCurrentIndex)
      if (Number(inventories[i]) < remainder) {
        console.log(tariffs[minTariffCurrentIndex][i])
        tariffs[minTariffCurrentIndex][i].inventory = inventories[i]
      } else {
        tariffs[minTariffCurrentIndex][i].inventory = remainder
      }
      console.log(remainder)
    }
    console.log(tariffs)
  }

  checkHolding = (holding, inventory, tariffs, index) => {
    let count = 0
    console.log(tariffs[index])
    tariffs[index].forEach((item) => {
      if (item.inventory !== null) {
        count += Number(item.inventory)
      }
    })
    return Number(holding)-count
  }

}

export default new DiffRentMethod();