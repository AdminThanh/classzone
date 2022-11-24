import { useEffect, useState } from 'react';
const Timer = (props: any) => {
  const { startTime, endTime } = props;

  const timer =
    (new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000 / 60;
  const minute = Number((Math.floor(timer * 100) / 100).toFixed());
  const second = Number(
    (
      (Math.round(timer * 100) / 100 -
        Number((Math.floor(timer * 100) / 100).toFixed())) *
      100
    ).toFixed()
  );

  const [minutes, setMinutes] = useState(Number(minute));
  const [seconds, setSeconds] = useState(Number(second));


  useEffect(() => {
    setTimeout(() => {
      setSeconds(seconds - 1);
      if (seconds === 0) {
        setSeconds(59);
        setMinutes(minutes - 1);
      }
    }, 1000);
  }, [seconds]);

  return (
    <>
      <span>{minutes < 10 ? '0' + minutes : minutes}</span> <b>:</b>{' '}
      <span>{seconds < 10 ? '0' + seconds : seconds}</span>
    </>
  );
};
export default Timer;
