import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { Alert } from 'antd';
import BreadCrumb from 'components/BreadCrumb';
import { useAuth } from 'contexts/AuthContext';
import {
  GetAttendanceTodayDocument,
  GetClassByIdDocument,
  GetMyHistoryAttendanceDocument,
  UppdateAttendancesDocument,
} from 'gql/graphql';
import { getClassById } from 'graphql/classes';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import './CheckMyAttendance.scss';

function CheckMyAttendance() {
  const { t } = useTranslation();
  const { classId } = useParams();
  const { auth } = useAuth();
  const { data: scheduleData } = useQuery(GetMyHistoryAttendanceDocument, {
    variables: {
      class_id: classId || '',
    },
  });

  const { data: dataClass } = useQuery(GetClassByIdDocument, {
    variables: {
      id: classId || '',
    },
  });

  console.log('dataClass', dataClass);

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
                  <th>{t('attendance.topic')}</th>
                  <th>{t('attendance.learn_date')}</th>
                  <th>{t('attendance.content')}</th>
                  <th>{t('attendance.present')}</th>
                  <th>{t('attendance.note')}</th>
                </tr>
              </thead>
              <tbody>
                {scheduleData?.getMyHistoryAttendance?.map(
                  (attendance: any, index) => (
                    <tr key={attendance?.id}>
                      <td className="td-attendance">{index + 1}</td>
                      <td className="td-attendance">
                        <p>{attendance.schedule.learn_date}</p>
                      </td>
                      <td className="td-attendance">
                        {attendance.schedule.content}
                      </td>
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
                      <td className="td-attendance">{attendance.note}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckMyAttendance;
