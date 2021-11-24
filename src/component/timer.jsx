import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

const Timer = ({ dateWithZero }) => {
  const [min, setMin] = useState(10);
  const [sec, setSec] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (parseInt(sec) > 0) {
        setSec(parseInt(sec) - 1);
      }
      if (parseInt(sec) === 0) {
        if (parseInt(min) === 0) {
          clearInterval(interval);
        } else {
          setMin(parseInt(min) - 1);
          setSec(59);
        }
      }
    }, 1000)

    return () => clearInterval(interval);
  }, [min, sec])

  return (
    <div className="content">
      <span className="min">{dateWithZero(min)}</span>
      <span>:</span>
      <span className="sec">{dateWithZero(sec)}</span>
    </div>
  );
};

export default Timer;