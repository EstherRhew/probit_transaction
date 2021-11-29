import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import Select2 from './component/select2'

import ListBox from './component/list_box';


const App = ({ Platforms }) => {
  const [coinList, setCoinList] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState('probit')
  const [selectedCoin, setSelectedCoin] = useState('');
  const [lastTransaction, setLastTransaction] = useState('');
  const [time, setTime] = useState();
  const [list, setList] = useState([]);

  const inputRef = useRef();

  const onSelectPlatform = (e) => {
    e.preventDefault();
    setSelectedCoin('');
    setSelectedPlatform(e.target.dataset.name)
    setLastTransaction('');
    inputRef.current.value = '';
  }

  const onSelectCoin = (coin) => {
    setSelectedCoin(coin);
  }

  const formatDate = useCallback((strDate) => {
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
  }, [])

  const dateWithZero = useCallback((number) => {
    return (number < 10 ? `0${number}` : number)
  }, [])

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

    return (formatDate(result));
  }, [Platforms, formatDate])

  const addList = (e) => {
    e.preventDefault();
    const updated = [...list];
    updated.push({
      id: Date.now(),
      platform: selectedPlatform,
      coin: selectedCoin,
      lastTransaction: lastTransaction,
      time: time
    })
    setList(updated);
    setTime();
    inputRef.current.value = "";
  }

  const deleteList = (id) => {
    const updated = list.filter((a) => a.id !== id);
    setList(updated);
  }

  const setTimer = (e) => {
    setTime(parseInt(e.target.value))
  }

  useEffect(() => {
    getCoinList(selectedPlatform)
  }, [getCoinList, selectedPlatform])

  useEffect(() => {
    if (selectedCoin == (null || '')) {
      return;
    }
    getTickerTime(selectedPlatform, selectedCoin);
  }, [selectedPlatform, selectedCoin, getTickerTime])

  return (
    <div className="App">
      <div className="container">
        <form className="add_form">
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
              <span className="text">분</span>
            </div>
          </div>

          <div className="input_box">
            <button className="btn_add" onClick={addList}>추가</button>
          </div>
        </form>
        <ListBox list={list} dateWithZero={dateWithZero} getTickerTime={getTickerTime} deleteList={deleteList}></ListBox>
      </div>


    </div>
  );
}

export default App;

