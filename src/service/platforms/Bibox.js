import axios from 'axios';

export default class Bibox {
  async getCoinList() {
    try {
      const res = await axios.get('/bibox/pairList');
      const result = res.data.result.map((item) => {
        return {
          base: item.coin_symbol,
          quote: item.currency_symbol
        }
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getLastTransaction(coin) {
    try {
      const res = await axios.get(`/bibox/deals?pair=${coin}&size=1`)
      return res.data.data[0].time
    } catch (error) {
      console.log(error);
    }
  }
}