import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import Select2 from './component/select2'
import Timer from './component/timer';
import ListBox from './component/list_box';
import axios from 'axios'

const App = ({ Platforms }) => {
  const [coinList, setCoinList] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState('probit')
  const [selectedCoin, setSelectedCoin] = useState('');
  const [lastTransaction, setLastTransaction] = useState('');
  const [time, setTime] = useState();
  const [list, setList] = useState([]);

  const lastTime = useRef('');

  const inputRef = useRef();

  const onSelectPlatform = (e) => {
    e.preventDefault();
    setSelectedPlatform(e.target.dataset.name)
    setLastTransaction('');
    inputRef.current.value = '';
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

  const onSelectCoin = (coin) => {
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

  const getTickerTime = useCallback(async (platform, coin) => {
    const result = await Platforms[platform].getLastTransaction(coin)
    console.log(result)
    if (result == undefined) {
      setLastTransaction()
      return
    }
    setLastTransaction(formatDate(result))
    const prevTime = lastTime.current;
    lastTime.current = result
    compareTime(prevTime, lastTime.current);

    // await axios.get(`/probit/api/exchange/v1/ticker?market_ids=${coin}`)
    //   .then(res => {
    //     const ticker = res.data.data
    //     setLastTransaction(ticker[0].time)

    //     const prevTime = lastTime.current;
    //     lastTime.current = ticker[0].time
    //     compareTime(prevTime, lastTime.current);
    //   }).catch(error => {
    //     console.log(error);
    //   })

  }, [])

  const addList = (e) => {
    e.preventDefault();
    const updated = [...list];
    updated.push({
      platform: selectedPlatform,
      coin: selectedCoin,
      lastTransaction: lastTransaction,
      time: time
    })
    console.log(updated);
    setList(updated);
  }

  const setTimer = (e) => {
    setTime(e.target.value)
  }

  useEffect(() => {
    getCoinList(selectedPlatform)
  }, [getCoinList, selectedPlatform])

  useEffect(() => {
    if (selectedCoin == (null || '')) {
      return;
    }
    lastTime.current = '';
    getTickerTime(selectedPlatform, selectedCoin);
    const interval = setInterval(() => {
      getTickerTime(selectedPlatform, selectedCoin);

    }, 600000);

    return () => clearInterval(interval);

  }, [selectedPlatform, selectedCoin, getTickerTime])

  return (
    <div className="App">
      <div className="container">
        <form className="add_form">
          {/* <span>거래소를 선택하세요.</span> */}
          <ul className="logos">
            <li className="logo" onClick={onSelectPlatform}>
              <button className={`btn_logo ${selectedPlatform === 'probit' ? "clicked" : "a"}`}>
                <img src="./image/logo_probit.png" alt="logo" data-name="probit" />
              </button>
            </li>
            <li className="logo" onClick={onSelectPlatform}>
              <button className={`btn_logo ${selectedPlatform === 'bittrex' && "clicked"}`}>
                <img src="./image/logo_bittrex.png" alt="logo" data-name="bittrex" />
              </button>
            </li>
            <li className="logo" onClick={onSelectPlatform}>
              <button className={`btn_logo ${selectedPlatform === 'bibox' && "clicked"}`}>
                <img src="./image/logo_bibox.png" alt="logo" data-name="bibox" />
              </button>
            </li>
            <li className="logo" onClick={onSelectPlatform}>
              <button className={`btn_logo ${selectedPlatform === 'cashierest' && "clicked"}`}>
                <img src="./image/logo_cashierest.png" alt="logo" data-name="cashierest" />
              </button>
            </li>

          </ul>

          <div className="input_box coin_select">
            <div className="tit">코인명 - 시장</div>
            <Select2
              coinList={coinList}
              onSelectCoin={onSelectCoin}
              selectedPlatform={selectedPlatform}
            />
          </div>

          <div className="input_box time">
            <div className="tit">최근 거래 시간</div>

            <div className="content">
              {lastTransaction ? lastTransaction : ''}
            </div>
          </div>


          <div className="input_box time">
            <div className="tit">타이머 설정 시간</div>

            <div className="content">
              <input type="number" className="timerSetter" ref={inputRef} onChange={setTimer} />
              <button className="btn_timer">확인</button>
            </div>
          </div>

          <div className="input_box timer">
            <div className="tit">타이머</div>
            <Timer dateWithZero={dateWithZero}></Timer>
          </div>

          <div className="input_box">
            <button className="btn_add" onClick={addList}>추가</button>
          </div>
        </form>
        <ListBox list={list}></ListBox>
      </div>


    </div>
  );
}

export default App;

