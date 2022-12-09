import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import BreadCrumb from 'components/BreadCrumb';
import { useAuth } from 'contexts/AuthContext';
import {
  GetClassByIdDocument,
  GetHistoryAttendanceByClassDocument, GetScheduleByClassDocument
} from 'gql/graphql';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import './CheckHistoryAttendance.scss';

function CheckHistoryAttendance() {
  const { t } = useTranslation();
  const { classId } = useParams();
  const { auth } = useAuth();
  const { data: historyData } = useQuery(GetHistoryAttendanceByClassDocument, {
    variables: {
      class_id: classId || '',
    },
  });

  const { data: scheduleData } = useQuery(GetScheduleByClassDocument, {
    variables: {
      id: classId || '',
    },
  });

  const { data: dataClass } = useQuery(GetClassByIdDocument, {
    variables: {
      id: classId || '',
    },
  });
  

  return (
    <div className="site_wrapper">
      <div className="site_container">
        <div className="attendance-page">
          <BreadCrumb
            routes={[
              {
                name: dataClass?.getClassById.name as string,
                path: '#',
              },
              {
                name: t('navbar.history_attendance'),
                path: '/attendance',
              },
            ]}
          />
          <div className="attendance-container">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>{t('history_attendance.student_name')}</th>
                  {scheduleData?.getScheduleByClass.map((schedule) => {
                    return (
                      <th>
                        {moment(schedule.learn_date, 'DD-MM-YYYY').format(
                          'D/M'
                        )}
                      </th>
                    );
                  })}

                  <th>{t('history_attendance.total')}</th>
                </tr>
              </thead>
              <tbody>
                {dataClass?.getClassById?.students?.map((student: any) => {
                  const indexOfStudent =
                    historyData?.getHistoryAttendanceByClass.findIndex(
                      (attendance) => {
                        if (attendance[0].user_id === student.id) return true;
                      }
                    );

                  const attendances =
                    indexOfStudent !== -1 && indexOfStudent !== undefined
                      ? historyData?.getHistoryAttendanceByClass[indexOfStudent]
                      : undefined;

                  let totalLession = 0;
                  attendances?.forEach((attendance) => {
                    if (attendance.is_present) totalLession++;
                  });

                  return (
                    <tr key={student?.id}>
                      <td className="td-attendance">
                        {student.lastName + ' ' + student.firstName}
                      </td>
                      {scheduleData?.getScheduleByClass.map((schedule) => {
                        const indexAttendanceOfLearnDay =
                          attendances?.findIndex((attendance) => {
                            if (attendance?.schedule?.id === schedule?.id)
                              return true;
                          });

                        const attendance =
                          indexAttendanceOfLearnDay !== -1 &&
                          indexAttendanceOfLearnDay !== undefined
                            ? attendances?.[indexAttendanceOfLearnDay]
                            : undefined;

                        return (
                          <td className="td-attendance">
                            {attendance?.is_present === true && (
                              <CheckOutlined
                                style={{
                                  color: 'green',
                                }}
                              />
                            )}
                            {attendance?.is_present === false && (
                              <CloseOutlined
                                style={{
                                  color: 'red',
                                }}
                              />
                            )}
                          </td>
                        );
                      })}

                      {/* {attendances?.map((attendance) => {
                        return (
                          <td className="td-attendance">
                            {attendance.is_present ? (
                              <CheckOutlined
                                style={{
                                  color: 'green',
                                }}
                              />
                            ) : (
                              <CloseOutlined
                                style={{
                                  color: 'red',
                                }}
                              />
                            )}
                          </td>
                        );
                      })} */}

                      <td className="td-attendance">
                        {totalLession}/{scheduleData?.getScheduleByClass.length}
                      </td>
                      {/* <td className="td-attendance">{attendance.note}</td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckHistoryAttendance;
