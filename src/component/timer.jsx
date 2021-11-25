import React, { useRef, useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

const Timer = ({ dateWithZero, time, compareTime }) => {
  const [min, setMin] = useState(dateWithZero(time));
  const [sec, setSec] = useState(dateWithZero(0));
  const totalInSeconds = useRef(time * 60)

  useEffect(() => {

    const interval = setInterval(() => {
      if (totalInSeconds.current > 0) {
        totalInSeconds.current -= 1;
        setSec(dateWithZero(totalInSeconds.current % 60))
        setMin(dateWithZero(Math.floor(totalInSeconds.current / 60)))
      } else {
        compareTime();
        totalInSeconds.current = time * 60;
        setSec(dateWithZero(0));
        setMin(dateWithZero(time));
      }

      //console.log(dateWithZero(totalInSeconds.current % 60))
      //console.log(dateWithZero(Math.floor(totalInSeconds.current / 60)))
      //if (parseInt(sec) > 0) {
      //  setSec(parseInt(sec) - 1);
      //}
      //if (parseInt(sec) === 0) {
      //  if (parseInt(min) === 0) {
      //    clearInterval(interval);
      //  } else {
      //    setMin(parseInt(min) - 1);
      //    setSec(59);
      //  }
      //}
    }, 1000)

    return () => clearInterval(interval);
  }, [min, sec])

  return (
    <div className="timer">
      <span className="min">{min}</span>
      <span>:</span>
      <span className="sec">{sec}</span>
    </div>
  );
};

export default Timer;