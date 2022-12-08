import './ExamItem.scss';
import { EditIcon } from 'utils/drawer';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import Link from 'antd/lib/typography/Link';
import { useNavigate } from 'react-router-dom';
import {
  CreateAssignmentDocument,
  UpdateAssignmentDocument,
} from 'gql/graphql';
import { useMutation } from '@apollo/client';
import { notification, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import Item from 'antd/lib/list/Item';
import moment from 'moment';

function ExamItem(props: any) {
  const {
    name_exam,
    start_time,
    work_time,
    deadline,
    num_question,
    status,
    isAllowReview,
    examClassId,
    assignmentId,
  } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [fireCreateAssignment, { data: dataAssignment }] = useMutation(
    CreateAssignmentDocument
  );
  const [fireUpdateAssignment] = useMutation(UpdateAssignmentDocument);
  const [loadingItem, setLoadingItem] = useState(false);

  const handleCreateAssignment = async () => {
    setLoadingItem(true);
    if (status === 'DONE') {
      alert('chưa xem được đâu');
    } else if (status === 'DOING') {
      setTimeout(() => {
        navigate('/assignments/' + examClassId + '/' + assignmentId);
        notification.success({
          key: 'success',
          message: t('action.load_data_success'),
        });
      }, 2000);
    } else {
      try {
        await fireUpdateAssignment({
          variables: {
            updateAssignmentInput: {
              startTime: new Date(),
            },
            id: assignmentId,
          },
        });
        setTimeout(() => {
          navigate('/assignments/' + examClassId + '/' + assignmentId);
          notification.success({
            key: 'success',
            message: t('action.load_data_success'),
          });
        }, 2000);
      } catch (error) {
        notification.error({
          key: 'error',
          message: t('action.load_data_error'),
        });
      }
    }
  };

  useEffect(() => {
    if (dataAssignment != undefined) {
      setTimeout(() => {
        notification.success({
          key: 'success',
          message: t('action.load_data_success'),
        });
        navigate(examClassId + '/' + dataAssignment?.createAssignment.id);
      }, 2500);
    }
  }, [dataAssignment]);

  return (
    <Spin spinning={loadingItem} delay={500}>
      <div className="exam-box">
        <img
          className="exam-img"
          src={require('assets/images/icons/class-img.png')}
          alt=""
        />
        <div className="exam-container">
          <h3 className="content-title">{name_exam}</h3>
          <div className="exam-detail">
            <p className="title-detail">
              {t('exam.start_time')} {start_time}
            </p>
            <p className="title-detail">
              {t('exam.deadline')} {deadline}
            </p>
            <p className="title-detail">
              {t('exam.work_time')} {work_time}
            </p>
            <p className="title-detail">
              {t('exam.num_question')} {num_question}
            </p>
            <div className="title-detail">
              {t('exam.status')}
              <p
                className={clsx('status-exam', {
                  done: status === 'DONE',
                  not: status === 'DONT_DO',
                  notStart: status === 'DOING',
                  hadScore: status === 4,
                })}
              >
                {status === 'DONE'
                  ? t('exam.status_done')
                  : status === 'DONT_DO'
                  ? t('exam.status_not')
                  : status === 'DOING'
                  ? t('exam.status_doing')
                  : t('exam.status_notStart')}
              </p>
            </div>
          </div>
          {/* //status 1 : đã làm, 2: Chưa làm, 3: Đã có điểm, 4: Chưa bắt đầu */}
          <div className="button-action">
            <button
              type="button"
              onClick={() => {
                handleCreateAssignment();
              }}
              className={clsx('btn-make', {
                take: status === 'DONT_DO',
                seen: status === 'DOING',
                disable: status === 'DONE' && isAllowReview == false,
                disable2: moment(Date()).isBetween(start_time, deadline),
              })}
            >
              <EditIcon />
              {/* {status === 'DONE' ? t('exam.review') : t('exam.doing')} */}
              {status === 'DONE'
                ? 'Xem điểm'
                : status === 'DONT_DO'
                ? 'Làm bài'
                : status === 'DOING'
                ? 'Làm tiếp'
                : 'Làm bài'}
            </button>
          </div>
        </div>
      </div>
    </Spin>
  );
}

export default ExamItem;
