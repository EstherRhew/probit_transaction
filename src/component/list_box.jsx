import React, { useEffect, useState } from 'react';
import ListItem from './list_item';

const ListBox = ({ list, dateWithZero, getTickerTime, deleteList }) => {
  const [tab, setTab] = useState('all')
  const [showSortBy, setShowSortBy] = useState(false)
  const [sortOption, setSortOption] = useState('id')

  const onClickTab = (e) => {
    setTab(e.target.textContent.toLowerCase())
  }

  const onClickSortBy = () => {
    setShowSortBy(!showSortBy)
  }

  const onSetSortOption = (e) => {
    setSortOption(e.target.dataset.name)

  }

  return (
    <div className="list_box">
      <div className="sortBy" onClick={onClickSortBy}>
        <span className="sort_text">sort by <i className="fas fa-sort-down"></i></span>
        <ul className={`sort_tab ${showSortBy && 'show'}`} onClick={(e) => {
          onSetSortOption(e);

        }}>
          <li className="tab_item" data-name="platform">거래소</li>
          <li className="tab_item" data-name="coin">코인명</li>
          <li className="tab_item" data-name="lastTransaction">최근거래시간</li>
          <li className="tab_item" data-name="time">설정시간</li>
        </ul>
      </div>
      <ul className="tabs" onClick={onClickTab}>
        <li className={`tab ${tab === 'all' && 'clicked'}`}>All</li>
        <li className={`tab ${tab === 'probit' && 'clicked'}`}>Probit</li>
        <li className={`tab ${tab === 'bittrex' && 'clicked'}`}>Bittrex</li>
        <li className={`tab ${tab === 'bibox' && 'clicked'}`}>Bibox</li>
        <li className={`tab ${tab === 'cashierest' && 'clicked'}`}>Cashierest</li>
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
        {list && list.sort((function (a, b) {
          if (a[sortOption] > b[sortOption]) {
            return 1;
          }
          if (a[sortOption] < b[sortOption]) {
            return -1;
          }
          return 0;
        }))
          .map((item, index) =>
            <ListItem tab={tab} item={item} key={item.id} number={index + 1} dateWithZero={dateWithZero} getTickerTime={getTickerTime} deleteList={deleteList} />
          )}
      </ul>
    </div>
  );
};

export default ListBox;