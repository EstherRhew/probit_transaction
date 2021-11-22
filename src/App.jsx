import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import Select2 from './component/select2'
import axios from 'axios'

const TIME = 600000;

const App = () => {
  const [coinList, setCoinList] = useState([]);
  const [selected, setSelected] = useState('');
  const [lastTransaction, setLastTransaction] = useState('');

  const lastTime = useRef('');

  const getCoinList = async () => {
    await axios.get('/api/exchange/v1/market')
      .then(res => {
        setCoinList(res.data.data)
      })
      .catch(error => {
        console.log(error);
      })
  }

  const getTickerTime = useCallback(async (coin) => {
    await axios.get(`/api/exchange/v1/ticker?market_ids=${coin}`)
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
    setSelected(coin);
  }

  const formatDate = (strDate) => {
    if (lastTransaction === '') {
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

  useEffect(() => {
    getCoinList()
  }, [])


  useEffect(() => {
    if (selected == (null || '')) {
      return;
    }
    lastTime.current = '';
    getTickerTime(selected);
    const interval = setInterval(() => {
      getTickerTime(selected);
    }, TIME);

    return () => clearInterval(interval);

  }, [selected, getTickerTime])

  return (
    <div className="App">
      <div className="container">
        <div className="logo">
          <a
            href="https://www.probit.kr/ko-kr/"
            target="blank"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 135 31">
              <g name="icon" className="ng-star-inserted">
                <path d="M16.81,9,14.29,7.53a1.69,1.69,0,0,0-1.52,0L10.25,9c-.54.32-.55.84,0,1.15l2.52,1.49a1.63,1.63,0,0,0,1.52,0l2.52-1.49A.61.61,0,0,0,16.81,9Z" className="cls-1"></path>
                <path d="M26.64,7.18,14.46.18a1.69,1.69,0,0,0-1.52,0L.76,7.18A1.71,1.71,0,0,0,0,8.5v14a1.71,1.71,0,0,0,.76,1.32l12.18,7a1.69,1.69,0,0,0,1.52,0l12.18-7a1.71,1.71,0,0,0,.76-1.32V8.5A1.71,1.71,0,0,0,26.64,7.18Zm-5.42,3.25-6.93,4.08a1.63,1.63,0,0,1-1.52,0l-4.4-2.58c-.54-.33-1-.07-1,.56V20.3a.63.63,0,0,1-1,.6l-.75-.39a1.62,1.62,0,0,1-.78-1.3V10.73a1.71,1.71,0,0,1,.76-1.32l7.16-4.16a1.69,1.69,0,0,1,1.52,0l6.93,4A.61.61,0,0,1,21.22,10.43Z" className="cls-1"></path>
              </g>
              <g name="lettering" className="ng-star-inserted">
                <g name="probit.kr" className="ng-star-inserted">
                  <path d="M36.73,7.7a.44.44,0,0,1,.47-.5h7.27a5.41,5.41,0,0,1,5.23,5.51,5.32,5.32,0,0,1-5.16,5.43H41.07v5.37c0,.34-.18.5-.52.5H37.2c-.34,0-.47-.16-.47-.5Zm4.34,3.08v3.78h2.45a1.77,1.77,0,0,0,1.74-1.88,1.83,1.83,0,0,0-1.74-1.9Z" className="cls-1"></path>
                  <path d="M53.71,7.7a.47.47,0,0,1,.48-.5H61.7a5.54,5.54,0,0,1,5.37,5.64,5.73,5.73,0,0,1-2.76,4.64l3.24,6a.31.31,0,0,1-.28.5H63.2c-.32,0-.43-.1-.61-.48l-2.7-5.12H58.08v5.1a.44.44,0,0,1-.5.5H54.19c-.32,0-.48-.16-.48-.5Zm4.37,3v4.1h2.51a2,2,0,0,0,2-2,2.11,2.11,0,0,0-2-2.06Z" className="cls-1"></path>
                  <path d="M79.3,7a8.65,8.65,0,1,1-8.65,8.68A8.66,8.66,0,0,1,79.3,7Zm0,13.14a4.29,4.29,0,0,0,4.28-4.49,4.28,4.28,0,1,0-8.56,0A4.29,4.29,0,0,0,79.3,20.09Z" className="cls-1"></path>
                  <path d="M92.5,7.72A.47.47,0,0,1,93,7.2h7.18A4.85,4.85,0,0,1,105,12.07a4.43,4.43,0,0,1-1,2.9,5.54,5.54,0,0,1,1.76,4A5.08,5.08,0,0,1,100.84,24H93a.45.45,0,0,1-.5-.48ZM99,10.53H96.89v3.29h2a1.62,1.62,0,0,0,1.75-1.64A1.65,1.65,0,0,0,99,10.53Zm.56,6.34H96.89v3.78h2.65a1.85,1.85,0,0,0,1.75-1.9A1.89,1.89,0,0,0,99.54,16.87Z" className="cls-1"></path>
                  <path d="M111,7.7c0-.34.15-.5.47-.5h3.4a.44.44,0,0,1,.5.5V23.51a.44.44,0,0,1-.5.5h-3.4c-.32,0-.47-.16-.47-.5Z" className="cls-1"></path>
                  <path d="M121,7.7c0-.34.15-.5.49-.5h12.28a.45.45,0,0,1,.5.5v2.88a.46.46,0,0,1-.5.5h-4V23.51c0,.34-.18.5-.52.5H126a.44.44,0,0,1-.5-.5V11.08h-4a.44.44,0,0,1-.49-.5Z" className="cls-1"></path>
                </g>
              </g>
            </svg>
          </a>
        </div>

        <div className="coin_select">
          <div className="tit">코인명 - 시장</div>
          <Select2
            coinList={coinList}
            onSelect={onSelect}
          />
        </div>

        <div className="time">
          <div className="tit">최근 거래 시간</div>
          <div className="transaction_time">
            {formatDate(lastTransaction)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

