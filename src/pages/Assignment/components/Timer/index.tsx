import { useEffect, useState } from 'react';
const Timer = (props: any) => {
  const { startTime, endTime } = props;
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timerRef = 0;

    if (startTime && endTime) {
      const timer = (+new Date(endTime) - +new Date(startTime)) / 1000;

      setSeconds(timer);

      timerRef = window.setInterval(() => {
        setSeconds((prevValue) => {
          return prevValue - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timerRef);
    };
  }, [startTime, endTime]);

  return (
    <>
      <span>
        {Math.floor(seconds / 60) < 9
          ? '0' + Math.floor(seconds / 60)
          : Math.floor(seconds / 60)}
      </span>{' '}
      <b>:</b>{' '}
      <span>{seconds % 60 < 10 ? '0' + (seconds % 60) : seconds % 60}</span>
    </>
  );
};
export default Timer;
