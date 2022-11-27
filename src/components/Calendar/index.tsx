import { useEffect, useState } from 'react';
// import './index.css';
import { Alert, Calendar, Checkbox, Input, notification, Spin } from 'antd';
import clsx from 'clsx';
import type { Dayjs } from 'dayjs';
import moment from 'moment';
import './calendar.scss';
import Button from 'components/Button';
import { useMutation, useQuery } from '@apollo/client';
import {
  CreateAndUpdateAttendanceInput,
  GetAttandanceByClassDocument,
  UpdateAttendencesDocument,
} from 'gql/graphql';

const from_date = moment('10112022', 'DDMMYYYY');
const end_date = moment('20112022', 'DDMMYYYY');

const Calendars = () => {
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const { data, loading, refetch } = useQuery(GetAttandanceByClassDocument, {
    variables: {
      id: '584fd188-fabf-454b-9158-66c027ef06c7',
    },
  });
  const [fireUpdateAttendences] = useMutation(UpdateAttendencesDocument);

  const [attendance, setAttendance] = useState<any>(null);

  console.log('attendance', attendance);
  const dateCellRender = (value: Dayjs) => {
    // const listData = getListData(value);
    const key = value.format('DD-MM-YYYY') as any;

    return (
      (attendance?.[key]?.is_learn_date || attendance?.[key]?.content) && (
        <span
          className={clsx(
            'calendar-content',
            attendance?.[key]?.is_learn_date && 'calendar-content--active'
          )}
        >
          {attendance?.[key]?.content}
        </span>
      )
    );
  };

  const handleSelect = (newValue: any) => {
    setSelectedDate(newValue);
  };

  const handleChangeNote = (e: any) => {
    setAttendance({
      ...attendance,
      [selectedDate.format('DD-MM-YYYY')]: {
        ...attendance?.[selectedDate.format('DD-MM-YYYY')],
        content: e.target.value,
      },
    });
  };

  const handleChangeis_learn_date = (e: any) => {
    setAttendance({
      ...attendance,
      [selectedDate.format('DD-MM-YYYY')]: {
        ...attendance?.[selectedDate.format('DD-MM-YYYY')],
        is_learn_date: e.target.checked,
      },
    });
  };

  const handleSaveAttendance = () => {
    const payload: any = [];

    notification.open({
      message: (
        <>
          <Spin /> &nbsp; Cập nhật thời khóa biểu
        </>
      ),
    });
    Object.entries(attendance).forEach(([learn_date, attdnc]: any) => {
      const newAttendance: { [key: string]: any } = {};

      newAttendance.is_learn_date = Boolean(attdnc.is_learn_date);
      learn_date && (newAttendance.learn_date = learn_date);
      attdnc.content && (newAttendance.content = attdnc.content);
      attdnc.id && (newAttendance.id = attdnc.id);

      payload.push(newAttendance);
    });

    try {
      notification.destroy();
      notification.success({
        message: 'Cập nhật thời khóa biểu thành công',
      });
      fireUpdateAttendences({
        variables: {
          updateAttandancesInput: {
            attendances: payload,
          },
          class_id: '584fd188-fabf-454b-9158-66c027ef06c7',
        },
      });
    } catch (err) {
      notification.destroy();
      notification.error({
        message: 'Có lỗi xảy ra khi cập nhật thời khóa biểu',
      });
    }
  };

  useEffect(() => {
    const newAttendance: any = {};
    data?.getAttendanceByClass.forEach((attendance) => {
      if (attendance.learn_date) {
        newAttendance[attendance.learn_date] = {
          id: attendance.id,
          content: attendance.content,
          is_learn_date: attendance.is_learn_date,
        };
      } else {
        throw new Error('Learn date not found');
      }
    });

    setAttendance(newAttendance);
  }, [data]);

  return (
    <div className="calendar">
      <div className="calendar__panel">
        <div className="calendar__panel-item">
          <span>Nội dung</span>
          <Input
            value={attendance?.[selectedDate?.format('DD-MM-YYYY')]?.content}
            onChange={handleChangeNote}
          />
        </div>

        <div className="calendar__panel-item">
          <span>Ngày học</span>
          <Checkbox
            onChange={handleChangeis_learn_date}
            checked={
              attendance?.[selectedDate?.format('DD-MM-YYYY')]?.is_learn_date
            }
          />
        </div>
      </div>
      <Calendar
        mode="month"
        validRange={[from_date, end_date]}
        onSelect={handleSelect}
        dateCellRender={dateCellRender as any}
      />
      <div className="calendar__panel-action">
        <Button type="primary" title="Lưu" onClick={handleSaveAttendance} />
      </div>
    </div>
  );
};

export default Calendars;
