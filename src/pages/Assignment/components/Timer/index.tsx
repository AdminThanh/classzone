import { Modal } from 'antd';
import { useEffect, useMemo, useState } from 'react';

const Timer = (props: any) => {
  const { minutes, handleSubmitAsignmentAuto, setLoadingItem } = props;
  const [seconds, setSeconds] = useState(0);

  const handleTimeOut = () => {
    let secondsToGo = 5;

    const modal = Modal.error({
      title: 'Đã hết thời gian làm bài',
      content: `Trang sẽ chuyển hướng sau ${secondsToGo} giây.`,
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `Trang sẽ chuyển hướng sau ${secondsToGo} giây.`,
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
      handleSubmitAsignmentAuto();
    }, secondsToGo * 1000);
  };

  useEffect(() => {
    let timerRef = 0;
    if (minutes) {
      const timer = minutes;
      setSeconds(timer);
      timerRef = window.setInterval(() => {
        setSeconds((prevValue) => {
          if (prevValue === 1) {
            handleTimeOut();
            setLoadingItem(true);
            clearInterval(timerRef);
          }
          return prevValue - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timerRef);
    };
  }, [minutes]);

  return (
    <>
      <span>
        {Math.floor(seconds / 60) < 10
          ? '0' + Math.floor(seconds / 60)
          : Math.floor(seconds / 60)}
      </span>{' '}
      <b>:</b>{' '}
      <span>{seconds % 60 < 10 ? '0' + (seconds % 60) : seconds % 60}</span>
    </>
  );
};
export default Timer;
