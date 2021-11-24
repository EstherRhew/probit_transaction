import React from 'react';

const ListItem = ({ item, number }) => {
  return (
    <li className="list_item">
      <span className="cell">{number}</span>
      <span className="cell">{item.platform}</span>
      <span className="cell">{item.coin}</span>
      <span className="cell">{item.lastTransaction}</span>
      <span className="cell">{item.time}</span>
      <span className="cell">10:00</span>
    </li>
  );
};

export default ListItem;