import { useEffect, useState } from 'react';
// import './index.css';
import { useMutation, useQuery } from '@apollo/client';
import { Calendar, Checkbox, Input, notification, Spin } from 'antd';
import clsx from 'clsx';
import Button from 'components/Button';
import type { Dayjs } from 'dayjs';
import {
  GetScheduleByClassDocument,
  UpdateSchedulesDocument,
} from 'gql/graphql';
import moment from 'moment';
import './calendar.scss';
import { useParams } from 'react-router';

const Calendars = (props: any) => {
  const { endDate, fromDate } = props;
  const [selectedDate, setSelectedDate] = useState<any>(moment());
  const { classId = '' } = useParams();
  const { data, loading, refetch } = useQuery(GetScheduleByClassDocument, {
    variables: {
      id: classId,
    },
  });

  const [fireUpdateAttendences] = useMutation(UpdateSchedulesDocument);

  const [attendance, setAttendance] = useState<any>(null);

  const from_date = moment(moment(fromDate).format('DDMMYYYY'), 'DDMMYYYY');
  const end_date = moment(moment(endDate).format('DDMMYYYY'), 'DDMMYYYY');

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
    console.log('E', e.target.checked, selectedDate);
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
          updateSchedulesInput: {
            Schedules: payload,
          },
          class_id: classId,
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
    data?.getScheduleByClass.forEach((schedule) => {
      if (schedule.learn_date) {
        newAttendance[schedule.learn_date] = {
          id: schedule.id,
          content: schedule.content,
          is_learn_date: schedule.is_learn_date,
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
            disabled={!selectedDate.isBetween(from_date, end_date)}
            value={attendance?.[selectedDate?.format('DD-MM-YYYY')]?.content}
            onChange={handleChangeNote}
          />
        </div>

        <div className="calendar__panel-item">
          <span>Ngày học</span>
          <Checkbox
            disabled={!selectedDate.isBetween(from_date, end_date)}
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
