import dingAudio from 'assets/audio/ding.mp3';
import votayAudio from 'assets/audio/votay.mp3';
import { ArcElement, Chart as ChartJS } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import Swal from 'sweetalert2';
import './WheelOfNames.scss';

interface IPropsWheelOfNames {
  names?: string[];
  onClick?: (values: string) => void;
}

const WheelOfNames: FunctionComponent<IPropsWheelOfNames> = (props) => {
  const {
    names = [
      'Đào Đức Minh Khôi',
      'Phan Trọng Nghĩa',
      'Trường Trung Kiên',
      'Phan Quốc Huy',
      'Nguyễn Đăng Thành',
      'Lý Quốc Sư',
      'OPtimus',
      'Phan Bội Chau',
      'Huỳnh Văn Hưng',
      'Lê Thị Thúy',
      'Mỹ Nga',
      'PKD',
      'Hình ',
      'Ảnh',
      'Của',
      'Ai',
    ],
    onClick,
  } = props;

  ChartJS.register(ArcElement);
  // Spinner count
  // Số vòng thực nhỏ nhất và lớn nhất sẽ bị nhân 2 lên
  const MIN_ROUNDS = 7;
  const MAX_ROUNDS = 8;

  const dingSound = useRef(new Audio(dingAudio));
  const votaySound = useRef(new Audio(votayAudio));
  const timer1 = useRef<number>(0);
  const timer2 = useRef<number>(0);
  const timer3 = useRef<number>(0);
  const timerResult = useRef<number>(0);

  const [rotate, setRotate] = useState<number>(0);
  const [count, setCount] = useState<number>(1);
  const isWheeling = useRef(false);

  const data = {
    labels: names,
    datasets: [
      {
        label: '# Vote off',
        data: Array(names.length).fill(1),
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const options: any = {
    responsive: true,
    animation: { duration: 0 },
    // rotation: rotate,
    plugins: {
      datalabels: {
        display: true,
        color: '#000',
        formatter: (_: any, context: any) =>
          context.chart.data.labels[context.dataIndex],
        font: {
          size: 100 / Math.floor(names.length / 2),
        },
        anchor: 'center',
        rotation: function (ctx: any) {
          const valuesBefore = ctx.dataset.data
            .slice(0, ctx.dataIndex)
            .reduce((a: number, b: number) => a + b, 0);
          const sum = ctx.dataset.data.reduce(
            (a: number, b: number) => a + b,
            0
          );
          const rotation =
            ((valuesBefore + ctx.dataset.data[ctx.dataIndex] / 2) / sum) * 360;
          return rotation - 90;
        },
      },
    },
  };

  // Start spinning
  const handleSpinning = () => {
    // Empty final value
    if (isWheeling.current === false) {
      isWheeling.current = true;
      const random = Math.random();
      // Generate random degree to stop at
      let randomDegree =
        (MIN_ROUNDS * 360 +
          Math.floor(random * 360) * (MAX_ROUNDS - MIN_ROUNDS)) *
        count *
        2;

      // console.log(
      //   `(${MIN_ROUNDS * 360} + ${Math.floor(random * 360)} * ${
      //     MAX_ROUNDS - MIN_ROUNDS
      //   }) * ${count * 2} = ${randomDegree}`
      // );

      setCount(count + 1);
      setRotate(randomDegree);

      const winner = Math.floor(
        ((randomDegree - 90) % 360) / (360 / names.length)
      );

      const newData = names.reverse();

      timer1.current = window.setInterval(() => {
        dingSound.current.play();
      }, 100);

      timer2.current = window.setInterval(() => {
        dingSound.current.play();
      }, 250);

      timer3.current = window.setInterval(() => {
        dingSound.current.play();
      }, 400);

      setTimeout(() => {
        clearInterval(timer1.current);
      }, 6000);

      setTimeout(() => {
        clearInterval(timer2.current);
      }, 6500);

      setTimeout(() => {
        clearInterval(timer3.current);
      }, 7000);

      timerResult.current = window.setTimeout(() => {
        Swal.fire('Xin chúc mừng !', newData[winner]);
        if (onClick) onClick(newData[winner]);
        votaySound.current.play();
        isWheeling.current = false;
      }, 7500);
    }
  };

  useEffect(() => {
    return () => {
      dingSound.current.pause();
      votaySound.current.pause();
      clearInterval(timer1.current);
      clearInterval(timer2.current);
      clearInterval(timer3.current);

      clearTimeout(timerResult.current);
    };
  }, []);

  return (
    <div className="wheel-of-name">
      <div onClick={handleSpinning} className="wheel-spin">
        <div className="wheel" style={{ transform: `rotate(${rotate}deg)` }}>
          <Pie
            data={data}
            options={options}
            plugins={[ChartDataLabels as any]}
          />
        </div>
        <div className="wheel-spin__result"></div>
      </div>
    </div>
  );
};

export default WheelOfNames;
