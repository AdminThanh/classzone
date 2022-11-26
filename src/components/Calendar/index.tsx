import { useState } from 'react';
// import './index.css';
import { Alert, Calendar, Checkbox, Input } from 'antd';
import type { Dayjs } from 'dayjs';
import moment from 'moment';
import './calendar.scss';

const from_date = moment('10112022', 'DDMMYYYY');
const end_date = moment('20112022', 'DDMMYYYY');

const Calendars = () => {
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [data, setData] = useState<any>({
    '26-11-2022': {
      content: 'Học lập trình NodeJS',
      isLearnDay: true,
    },
  });

  const dateCellRender = (value: Dayjs) => {
    // const listData = getListData(value);
    const key = value.format('DD-MM-YYYY') as any;

    return (
      data?.[key]?.content && (
        <span className="calendar-content">{data?.[key]?.content}</span>
      )
    );
  };

  const handleSelect = (newValue: any) => {
    setSelectedDate(newValue);
  };

  const handleChangeNote = (e: any) => {
    setData({
      ...data,
      [selectedDate.format('DD-MM-YYYY')]: {
        ...data[selectedDate.format('DD-MM-YYYY')],
        content: e.target.value,
      },
    });
  };

  const handleChangeIsLearnDay = (e: any) => {
    setData({
      ...data,
      [selectedDate.format('DD-MM-YYYY')]: {
        ...data[selectedDate.format('DD-MM-YYYY')],
        isLearnDay: e.target.checked,
      },
    });
  };

  return (
    <div className="calendar">
      <Alert
        message={`You selected date: ${moment(selectedDate)?.format(
          'DD-MM-YYYY'
        )}`}
      />
      <div>
        Nội dung
        <Input
          value={data[selectedDate?.format('DD-MM-YYYY')]?.content}
          onChange={handleChangeNote}
        />
        <div>
          Ngày học
          <Checkbox
            onChange={handleChangeIsLearnDay}
            checked={data[selectedDate?.format('DD-MM-YYYY')]?.isLearnDay}
          />
        </div>
      </div>
      <Calendar
        mode="month"
        validRange={[from_date, end_date]}
        onSelect={handleSelect}
        dateCellRender={dateCellRender as any}
      />
    </div>
  );
};

export default Calendars;
