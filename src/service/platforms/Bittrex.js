import axios from 'axios';

export default class Bittrex {
  async getCoinList() {
    try {
      const res = await axios.get('/bittrex/markets');
      const result = res.data.map((item) => {
        return {
          base: item.baseCurrencySymbol,
          quote: item.quoteCurrencySymbol
        }
      })
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getLastTransaction(coin) {
    try {
      const res = await axios.get(`/bittrex/markets/${coin}/trades`)
      return res.data[0].executedAt; //"2021-11-24T06:35:31.12Z",
    } catch (error) {
      console.log(error);
    }

  }
}