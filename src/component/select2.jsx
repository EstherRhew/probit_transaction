import React from 'react';

const Select2 = ({ coinList, onSelect }) => {

  const onChange = (e) => {
    onSelect(e.target.value)
  }

  return (
    <select name="market" id="market" className="content" onChange={onChange}>
      <option value="">--선택--</option>
      {coinList.map((item, index) =>
        <option value={`${item.base}-${item.quote}`} key={index}>{`${item.base}-${item.quote}`}</option>
      )}
    </select>
  )
};

export default Select2;