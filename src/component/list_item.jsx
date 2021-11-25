import React, { useRef, useEffect } from 'react';
import Timer from './timer';
import axios from 'axios';

const ListItem = ({ item, number, dateWithZero, getTickerTime }) => {

  const lastTime = useRef(item.lastTransaction);

  const compareTime = async () => {
    const prevTime = lastTime.current;
    lastTime.current = await getTickerTime(item.platform, item.coin)
    console.log(prevTime)
    console.log(lastTime.current)
    if (prevTime === lastTime.current) {
      axios.post('https://api.telegram.org/bot2101900443:AAE7d5THUf_jRP2h81zWHcOv2pRJrXTwPGk/sendMessage',
        {
          chat_id: '1816739969',
          text: `${item.platform} ${item.coin} - ${item.time}분간 거래가 일어나지 않았습니다`
        })
    } else {
      return;
    }
  }

  //useEffect(() => {
  //const interval = setInterval(() => {
  //  console.log('start')
  //  getTickerTime(item.platform, item.coin);
  //  const prevTime = lastTime.current;
  //  lastTime.current = item.lastTransaction
  //  compareTime(prevTime, lastTime.current);
  //
  //}, item.time * 60000);
  //
  //}, [item, getTickerTime])

  return (
    <li className="list_item">
      <span className="cell">{number}</span>
      <span className="cell">{item.platform}</span>
      <span className="cell">{item.coin}</span>
      <span className="cell">{item.lastTransaction}</span>
      <span className="cell">{item.time}분</span>
      <span className="cell"><Timer dateWithZero={dateWithZero} time={item.time} compareTime={compareTime} /></span>
    </li>
  );
};

export default ListItem;