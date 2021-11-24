import React from 'react';
import ListItem from './list_item';

const ListBox = ({ list, dateWithZero, getTickerTime }) => {
  return (
    <div className="list_box">
      <ul className="tabs">
        <li className="tab">All</li>
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
        {list && list.map((item, index) =>
          <ListItem item={item} key={index} number={index + 1} dateWithZero={dateWithZero} getTickerTime={getTickerTime} />
        )}
      </ul>
    </div>
  );
};

export default ListBox;