import axios from 'axios';

export default class Cashierest {
  async getCoinList() {
    try {
      const res = await axios.get('/cashierest/TickerAll');
      // console.log(res.data)
      const result = Object.keys(res.data.Cashierest).map((item) => {
        const currency = item.split('_')
        return {
          base: currency[0],
          quote: currency[1]
        }
      })
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getLastTransaction(coin) {
    const currency = coin.split('-');
    try {
      const res = await axios.get(`/cashierest/RecentTransactions?PaymentCurrency=${currency[1]}&CoinCode=${currency[0]}&Count=1`)
      return res.data.ReturnData[0].TransactionDate //2021-11-24 15:36:37
    } catch (error) {
      console.log(error);
    }
  }
}