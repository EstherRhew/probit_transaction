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
    try {
      const res = await axios.get(`/cashierest/RecentTransactions?PaymentCurrency=USDT&CoinCode=${coin}&Count=1`)
      return res.data
    } catch (error) {
      console.log(error);
    }
  }
}