import axios from 'axios';

export default class Api {
  async getCoinList(platform) {
    let url
    switch (platform) {
      case 'probit':
        url = '/probit/api/exchange/v1/market';
        break;
      case 'bittrex':
        url = '/bittrex/markets';
        break;
      case 'bibox':
        url = '/bibox/pairList';
        break;
      case 'cashierest':
        url = '/cashierest/TickerAll';
        break;
    }

    try {
      const res = await axios.get(url);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getLastTransaction(platform, coin) {
    let url
    switch (platform) {
      case 'probit':
        url = `/probit/api/exchange/v1/ticker?market_ids=${coin}`;
        break;
      case 'bittrex':
        url = `/bittrex/markets/${coin}/trades`;
        break;
      case 'bibox':
        url = `/bibox/deals?pair=${coin}&size=1`;
        break;
      case 'cashierest':
        url = `/cashierest/RecentTransactions?PaymentCurrency=USDT&CoinCode=${coin}&Count=1`;
        break;
    }

    await axios.get(url)
      .then(res => {
        const ticker = res.data.data
        // setLastTransaction(ticker[0].time)
        // const prevTime = lastTime.current;
        // lastTime.current = ticker[0].time
        // compareTime(prevTime, lastTime.current);
        return (ticker[0].time)
      }).catch(error => {
        console.log(error);
      })
  }
}