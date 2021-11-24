import axios from 'axios';

export default class Probit {
  async getCoinList() {
    try {
      const res = await axios.get('/probit/api/exchange/v1/market');
      const result = res.data.data.map((item) => {
        return {
          base: item.base_currency_id,
          quote: item.quote_currency_id
        }
      })
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getLastTransaction(coin) {
    try {
      const res = await axios.get(`/probit/api/exchange/v1/ticker?market_ids=${coin}`)
      return res.data.data[0].time //2021-11-24T06:34:11.000Z
    } catch (error) {
      console.log(error);
    }

  }
}