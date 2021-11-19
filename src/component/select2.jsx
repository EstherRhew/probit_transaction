import React, { useEffect, useState } from 'react';

const Select2 = ({ coinList, onSelect }) => {

  // useEffect(() => {
  //   console.log(coinList[0].id)
  // })
  // const [selected, setSelected] = useState('');

  const onChange = (e) => {
    console.log(e.target.value)
    // setSelected(e.target.value)
    onSelect(e.target.value)
  }

  return (
    <select name="market" id="market" className="coin_name" onChange={onChange}>
      <option value="">--선택--</option>
      {coinList.map((item, index) =>
        <option value={item.id} key={index}>{item.id}</option>
      )}
    </select>
  )
};

export default Select2;