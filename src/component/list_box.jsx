import React, { useState } from 'react';
import ListItem from './list_item';

const ListBox = ({ list, dateWithZero, getTickerTime, deleteList }) => {
  const [tab, setTab] = useState('all')

  const onClickTab = (e) => {
    console.log(e.target.textContent.toLowerCase())
    setTab(e.target.textContent.toLowerCase())
  }

  const filterList = (list) => {
    if (tab === 'all') {
      return list;
    }
    const filteredList = list.filter((item) => item.platform === tab)
    return filteredList;
  }

  return (
    <div className="list_box">
      <ul className="tabs" onClick={onClickTab}>
        <li className="tab clicked">All</li>
        <li className="tab">Probit</li>
        <li className="tab">Bittrex</li>
        <li className="tab">Bibox</li>
        <li className="tab">Cashierest</li>
      </ul>
      <ul className="list">
        <li className="list_title">
          <span className="cell">번호</span>
          <span className="cell">거래소</span>
          <span className="cell">코인명</span>
          <span className="cell">마지막 거래</span>
          <span className="cell">설정시간</span>
          <span className="cell">타이머</span>
        </li>
        {list && filterList(list).map((item, index) =>
          <ListItem item={item} key={item.id} number={index + 1} dateWithZero={dateWithZero} getTickerTime={getTickerTime} deleteList={deleteList} />
        )}
      </ul>
    </div>
  );
};

export default ListBox;