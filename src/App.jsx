import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import Select2 from './component/select2'
import Timer from './component/timer';
import ListBox from './component/list_box';
import axios from 'axios'

const TIME = 600000;

const App = ({ Platforms }) => {
  const [coinList, setCoinList] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState('bibox')
  const [selectedCoin, setSelectedCoin] = useState('');
  const [lastTransaction, setLastTransaction] = useState('');

  // const { probit, bittrex, bibox, cashierest } = Platforms

  const lastTime = useRef('');

  const inputRef = useRef();

  const selectPlatform = (e) => {
    console.log(e.target.dataset.name)
    setSelectedPlatform(e.target.dataset.name)
  }

  const compareTime = (prevTime, lastTime) => {
    if (prevTime === lastTime) {
      axios.post('https://api.telegram.org/bot2101900443:AAE7d5THUf_jRP2h81zWHcOv2pRJrXTwPGk/sendMessage',
        {
          chat_id: '1816739969',
          text: '10분간 거래가 일어나지 않았습니다'
        })
    } else {
      return;
    }
  }

  const onSelect = (coin) => {
    setSelectedCoin(coin);
  }

  const formatDate = (strDate) => {
    if (strDate === '') {
      return ``;
    }
    const date = new Date(strDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    return `${year}.${dateWithZero(month)}.${dateWithZero(day)} ${dateWithZero(hour)}:${dateWithZero(min)}:${dateWithZero(sec)}`
  }

  const dateWithZero = (number) => {
    return (number < 10 ? `0${number}` : number)
  }



  const getCoinList = useCallback(async (platform) => {
    const result = await Platforms[platform].getCoinList();
    setCoinList(result);
  }, [Platforms])

  const getTickerTime = useCallback(async (coin) => {
    await axios.get(`/probit/api/exchange/v1/ticker?market_ids=${coin}`)
      .then(res => {
        const ticker = res.data.data
        setLastTransaction(ticker[0].time)

        const prevTime = lastTime.current;
        lastTime.current = ticker[0].time
        compareTime(prevTime, lastTime.current);
      }).catch(error => {
        console.log(error);
      })

  }, [])

  useEffect(() => {
    getCoinList(selectedPlatform)
  }, [getCoinList, selectedPlatform])

  useEffect(() => {
    if (selectedCoin == (null || '')) {
      return;
    }
    lastTime.current = '';
    getTickerTime(selectedCoin);
    const interval = setInterval(() => {
      getTickerTime(selectedCoin);

    }, TIME);

    return () => clearInterval(interval);

  }, [selectedCoin, getTickerTime])

  // //test cashierest api 업데이트가 좀 느린듯
  // useEffect(async () => {
  //   await axios.get('/cashierest/TickerAll')
  //     .then((res) => console.log(res.data.Cashierest))
  //   await axios.get('/cashierest/RecentTransactions?PaymentCurrency=USDT&CoinCode=BTC&Count=1')
  //     .then((res) => console.log(res.data.ReturnData[0].TransactionDate))
  // })

  //test bibox
  // useEffect(async () => {
  //   await axios.get('/bibox/pairList')
  //     .then((res) => console.log(res.data.result))
  //   await axios.get('/bibox/deals?pair=DAI_USDT&size=1')
  //     .then((res) => {
  //       console.log(res.data.result[0])
  //       const time = res.data.result[0].time
  //       const date = new Date(time)
  //       console.log(formatDate(date))
  //     })
  // })

  // //test bittrex
  // useEffect(async () => {
  //   await axios.get('/bittrex/markets')
  //     .then((res) => console.log(res.data))
  //   await axios.get('/bittrex/markets/BMP-BTC/trades')
  //     .then((res) => {
  //       console.log(res.data[0].executedAt)
  //       const data = res.data[0].executedAt
  //       console.log(formatDate(data))
  //     })
  // })

  return (
    <div className="App">
      <div className="container">
        <div className="add_form">
          <ul className="logos">
            <li className="logo" onClick={selectPlatform}>
              <button className="btn_logo">
                <img src="./image/logo_probit.png" alt="logo" data-name="probit" />
              </button>
            </li>
            <li className="logo" onClick={selectPlatform}>
              <button className="btn_logo">
                <img src="./image/logo_bittrex.png" alt="logo" data-name="bittrex" />
              </button>
            </li>
            <li className="logo" onClick={selectPlatform}>
              <button className="btn_logo">
                <img src="./image/logo_bibox.png" alt="logo" data-name="bibox" />
              </button>
            </li>
            <li className="logo" onClick={selectPlatform}>
              <button className="btn_logo">
                <img src="./image/logo_cashierest.png" alt="logo" data-name="cashierest" />
              </button>
            </li>

          </ul>


          <div className="input_box coin_select">
            <div className="tit">코인명 - 시장</div>
            <Select2
              coinList={coinList}
              onSelect={onSelect}
            />
          </div>

          <div className="input_box time">
            <div className="tit">최근 거래 시간</div>

            <div className="content">
              {formatDate(lastTransaction)}
            </div>
          </div>


          <div className="input_box time">
            <div className="tit">타이머 설정 시간</div>

            <div className="content">
              <input type="number" className="timerSetter" ref={inputRef} />
              <button className="btn_timer">확인</button>
            </div>
          </div>

          <div className="input_box timer">
            <div className="tit">타이머</div>
            <Timer dateWithZero={dateWithZero}></Timer>
          </div>
        </div>
        <ListBox></ListBox>
      </div>


    </div>
  );
}

export default App;

