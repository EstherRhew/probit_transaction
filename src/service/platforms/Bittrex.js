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
      return res.data
    } catch (error) {
      console.log(error);
    }

  }
}