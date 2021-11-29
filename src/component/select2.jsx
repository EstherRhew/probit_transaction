import React from 'react';
import { useEffect, useRef } from 'react';

const Select2 = ({ coinList, onSelectCoin }) => {
  const selectRef = useRef();
  const onChange = (e) => {
    onSelectCoin(e.target.value)
  }

  useEffect(() => {
    selectRef.current.value = ""
    onSelectCoin('')
  }, [coinList])

  return (
    <select name="market" id="market" className="content" onChange={onChange} defaultValue="" ref={selectRef}>
      <option value="">--선택--</option>
      {coinList.map((item, index) =>
        <option value={`${item.base}-${item.quote}`} key={index}>{`${item.base}-${item.quote}`}</option>
      )}
    </select>
  )
};

export default Select2;