const Timer = (props: any) => {
  const { minutes } = props;

  const seconds = minutes * 60;

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
