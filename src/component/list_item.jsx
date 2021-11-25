import React, { useRef, useEffect, useState } from 'react';
import Timer from './timer';
import axios from 'axios';

const ListItem = ({ item, number, dateWithZero, getTickerTime }) => {
  const [last, setLast] = useState(item.lastTransaction)
  const lastTime = useRef(item.lastTransaction);

  const compareTime = async () => {
    const prevTime = lastTime.current;
    lastTime.current = await getTickerTime(item.platform, item.coin)
    setLast(lastTime.current)
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

  return (
    <li className="list_item">
      <span className="cell">{number}</span>
      <span className="cell">{item.platform}</span>
      <span className="cell">{item.coin}</span>
      <span className="cell">{last}</span>
      <span className="cell">{item.time}분</span>
      <span className="cell"><Timer dateWithZero={dateWithZero} time={item.time} compareTime={compareTime} /></span>
    </li>
  );
};

export default ListItem;