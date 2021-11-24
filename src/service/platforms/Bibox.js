import axios from 'axios';

export default class Bibox {
  async getCoinList() {
    try {
      const res = await axios.get('/bibox/marketAll');
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
    const currency = coin.split('-');
    try {
      const res = await axios.get(`/bibox/deals?pair=${currency[0]}_${currency[1]}&size=1`)
      return res.data.result[0].time //1604316939377
    } catch (error) {
      console.log(error);
    }
  }
}