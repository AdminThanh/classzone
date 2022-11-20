import { useEffect, useState } from 'react';
const Timer = (props: any) => {
    const [minutes, setMinutes] = useState(15);
    const [seconds, setSeconds] = useState(0);

    const start_time = "10:15 - 15/02/2022";
    const end_time = "10:30 - 15/02/2022";

    useEffect(() => {
        setTimeout(() => {
            setSeconds(seconds - 1);

            if (seconds === 0) {
                setSeconds(59);
                setMinutes(minutes - 1);
            }
        }, 1000)
    }, [seconds]);
    return (
        <>
            <span>{minutes < 10 ? '0' + minutes : minutes}</span> <b>:</b> <span>{seconds < 10 ? '0' + seconds : seconds}</span>
        </>
    )
}
export default Timer; 