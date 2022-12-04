import { useMutation, useQuery } from '@apollo/client';
import { Alert, notification, Spin } from 'antd';
import BreadCrumb from 'components/BreadCrumb';
import {
  GetAttendanceTodayDocument,
  GetClassByIdDocument,
  GetScheduleByLearnDateDocument,
  UppdateAttendancesDocument,
} from 'gql/graphql';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import './Attendance.scss';

function Attendance() {
  const { t } = useTranslation();
  const { classId } = useParams();

  const { data: studentData, refetch }: any = useQuery(GetClassByIdDocument, {
    variables: {
      id: classId || '',
    },
  });

  const { data: scheduleData } = useQuery(GetScheduleByLearnDateDocument, {
    variables: {
      class_id: classId || '',
      learn_date: moment(new Date()).format('DD-MM-YYYY'),
    },
  });

  const {
    data: attendanceData,
    loading: attendanceLoading,
    refetch: attendanceRefetch,
    error,
  } = useQuery(GetAttendanceTodayDocument, {
    variables: {
      class_id: classId || '',
    },
  });

  const [dataStudentAttendance, setDataStudentAttendance] = useState([]);

  const [fireUpdateAttendences] = useMutation(UppdateAttendancesDocument);

  useEffect(() => {
    const newStudentAttendance = studentData?.getClassById?.students.map(
      (student: any) => {
        const attendances = attendanceData?.getAttendanceToday;
        const indexAttendanceOfStudent = attendances?.findIndex(
          (attendance) => {
            return attendance.user_id === student.id;
          }
        );

        if (
          indexAttendanceOfStudent !== undefined &&
          indexAttendanceOfStudent !== -1
        ) {
          return {
            avatar: student.avatar,
            username: student.firstName + ' ' + student.lastName,
            id: student.id,
            note: attendances?.[indexAttendanceOfStudent].note || '',
            is_present:
              attendances?.[indexAttendanceOfStudent].is_present || false,
          };
        } else {
          return {
            avatar: student.avatar,
            username: student.firstName + ' ' + student.lastName,
            id: student.id,
            note: '',
            is_present: true,
          };
        }
      }
    );

    setDataStudentAttendance(newStudentAttendance);
  }, [studentData?.getClassById?.students, attendanceData?.getAttendanceToday]);

  const handleCheckedAttendance = (id: string): void => {
    const indexOfStudent = dataStudentAttendance.findIndex(
      (student: any) => student.id === id
    );

    if (indexOfStudent !== -1) {
      const newDataStudentAttendance: any = [...dataStudentAttendance];

      newDataStudentAttendance[indexOfStudent].is_present =
        !newDataStudentAttendance[indexOfStudent].is_present;
      setDataStudentAttendance(newDataStudentAttendance);
    }
  };

  const handleChangeNote = (id: string, value: string): void => {
    const indexOfStudent = dataStudentAttendance.findIndex(
      (student: any) => student.id === id
    );

    console.log('value', {
      indexOfStudent,
      value,
    });

    if (indexOfStudent !== -1) {
      const newDataStudentAttendance: any = [...dataStudentAttendance];

      newDataStudentAttendance[indexOfStudent].note = value;
      setDataStudentAttendance(newDataStudentAttendance);
    }
  };

  const handleSaveAttendance = (): void => {
    const payload: any = [];
    // const schedule_id = scheduleData?.getScheduleByClass?.find((schedule_id) => schedule_id.id);

    dataStudentAttendance?.map((student: any) => {
      const studentPayload = {
        user_id: student.id,
        note: student.note,
        is_present: student.is_present || false,
      };

      payload.push(studentPayload);
    });

    notification.open({
      message: (
        <>
          <Spin /> &nbsp; Cập nhật điểm danh
        </>
      ),
    });
    try {
      notification.destroy();
      notification.success({
        message: 'Cập nhật điểm danh thành công',
      });
      fireUpdateAttendences({
        variables: {
          attendanceClassInput: {
            Attendance: payload,
          },
          schedule_id: scheduleData?.getScheduleByLearnDate.id as any,
        },
      });
      console.log(payload);
    } catch (error) {
      notification.destroy();
      notification.error({
        message: 'Có lỗi xảy ra khi cập nhật điểm danh',
      });
    }
  };

  useEffect(() => {
    const newAttendanceData: any = {};
    attendanceData?.getAttendanceToday.forEach((att) => {
      if (att.user_id) {
        newAttendanceData[att.user_id] = {
          user_id: att.user_id,
          note: att.note,
          is_present: att.is_present,
        };
      }
    });
  }, [attendanceData]);

  return (
    <div className="site_wrapper">
      <div className="site_container">
        <div className="attendance-page">
          <BreadCrumb
            routes={[
              {
                name: t('bread_crumb.home'),
                path: '/',
              },
              {
                name: t('bread_crumb.attendance'),
                path: '/attendance',
              },
            ]}
          />
          <div className="attendance-container">
            {error?.message === 'Attendance today not found' && (
              <Alert type="error" message={'Hôm nay không có lịch học'} />
            )}

            {!error && (
              <>
                <table className="attendance-table">
                  <thead>
                    <tr>
                      <th>{t('attendance.img')}</th>
                      <th>{t('attendance.name')}</th>
                      <th>{t('attendance.activity')}</th>
                      <th>{t('attendance.note')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataStudentAttendance?.map((student: any) => (
                      <tr key={student?.id}>
                        <td className="td-attendance">
                          <img
                            src={
                              student?.avatar
                                ? student?.avatar
                                : require('assets/images/avatar/4.jpg')
                            }
                            alt=""
                            className="avatar-img"
                          />
                        </td>
                        <td className="td-attendance">
                          <p>{student?.username}</p>
                        </td>
                        <td className="td-attendance">
                          <button
                            type="button"
                            onClick={() => handleCheckedAttendance(student?.id)}
                          >
                            <img
                              alt=""
                              src={require(student?.is_present
                                ? 'assets/images/icons/bee-green.png'
                                : 'assets/images/icons/bee-red.png')}
                              className="icon-bee"
                            />
                          </button>
                        </td>
                        <td className="td-attendance">
                          <input
                            type="text"
                            name="note"
                            value={student?.note}
                            className="input-note"
                            onChange={(e) =>
                              handleChangeNote(student?.id, e.target.value)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="submit-button">
                  <button
                    className="btn-submit"
                    type="button"
                    onClick={handleSaveAttendance}
                  >
                    {t('attendance.save')}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
