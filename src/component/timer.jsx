import React, { useRef, useState, useEffect, memo } from 'react';

const Timer = memo(({ dateWithZero, item, compareTime }) => {
  const [min, setMin] = useState(dateWithZero(item.time));
  const [sec, setSec] = useState(dateWithZero(0));
  const totalInSeconds = useRef(item.time * 60)

  useEffect(() => {
    const interval = setInterval(() => {
      if (totalInSeconds.current > 0) {
        totalInSeconds.current -= 1;
        setSec(dateWithZero(totalInSeconds.current % 60))
        setMin(dateWithZero(Math.floor(totalInSeconds.current / 60)))
      } else {
        compareTime();
        totalInSeconds.current = item.time * 60;
        setSec(dateWithZero(0));
        setMin(dateWithZero(item.time));
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    };
  }, [])

  return (
    <div className="timer">
      <span className="min">{min}</span>
      <span>:</span>
      <span className="sec">{sec}</span>
    </div>
  );
});

export default Timer;