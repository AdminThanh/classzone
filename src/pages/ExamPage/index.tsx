import { useQuery } from '@apollo/client';
import { Col, Row, Skeleton } from 'antd';
import BreadCrumb from 'components/BreadCrumb';
import FilterMenu, { TField } from 'components/FilterMenu';
import FilterTags, { IOptionTag } from 'components/FilterTags';
import {
  GetAllExamClassDocument,
  GetAllMyAssignmentDocument,
} from 'gql/graphql';
import i18next from 'i18next';
import moment from 'moment';
import { useMemo, useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { isTypeNode } from 'typescript';
import ExamItem from './components/ExamItem';
import './ExamPage.scss';

export interface IExamList {
  id_exam: number;
  name: string;
  start_time: string;
  deadline: string;
  work_time: number;
  num_question: number;
  status: number;
  status_btn: number;
}

const datas: IExamList[] = [
  {
    id_exam: 1,
    name: 'Bài kiểm tra số 1',
    start_time: '10:55 - 15/02/2022',
    deadline: '10:55 - 15/02/2022',
    work_time: 45,
    num_question: 60,
    status: 1,
    status_btn: 1,
  },
  {
    id_exam: 2,
    name: 'Bài kiểm tra số 2',
    start_time: '10:55 - 15/02/2022',
    deadline: '10:55 - 15/02/2022',
    work_time: 45,
    num_question: 60,
    status: 2,
    status_btn: 1,
  },
  {
    id_exam: 3,
    name: 'Bài kiểm tra số 3',
    start_time: '10:55 - 15/02/2022',
    deadline: '10:55 - 15/02/2022',
    work_time: 45,
    num_question: 60,
    status: 3,
    status_btn: 2,
  },
  {
    id_exam: 4,
    name: 'Bài kiểm tra số 4',
    start_time: '10:55 - 15/02/2022',
    deadline: '10:55 - 15/02/2022',
    work_time: 45,
    num_question: 60,
    status: 4,
    status_btn: 3,
  },
];

function ExamPage() {
  const { t } = useTranslation();

  const [listExam, setListExam] = useState<any[]>(datas);
  //status 1 : đã làm, 2: Chưa làm, 3: Đã có điểm, 4: Chưa bắt đầu

  const {
    data: allMyAssignment,
    loading,
    refetch,
  } = useQuery(GetAllMyAssignmentDocument);
  const dataAllMyAssignment = allMyAssignment?.getAllMyAssignment;
  const allExamClassList = allMyAssignment?.getAllMyAssignment;

  const fields: TField[] = useMemo(
    () => [
      {
        name: 'start_date',
        type: 'datepicker',
        label: t('my_class.start_date'),
        placeholder: t('my_class.choose_start_date'),
      },
      {
        name: 'end_date',
        type: 'datepicker',
        label: t('my_class.end_date'),
        placeholder: t('my_class.choose_end_date'),
      },
      {
        name: 'status',
        type: 'select',
        label: t('my_class.status'),
        placeholder: t('my_class.choose_status'),
        options: [
          {
            value: 0,
            label: t('my_class.is_activating'),
          },
          {
            value: 1,
            label: t('my_class.is_finished'),
          },
        ],
      },
    ],
    [i18next.language]
  );

  const handleChangeFilterMenu = (values: any) => {
    console.log('Change', values);
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="exam-page">
      <BreadCrumb
        routes={[
          {
            name: t('bread_crumb.home'),
            path: '/',
          },
          {
            name: t('bread_crumb.exam'),
            path: '/exam',
          },
        ]}
      />

      <Row gutter={16}>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={8}
          xxl={8}
          className="filter-action"
        >
          <div className="filter-item">
            <h3 className="title-filter">{t('exam.filter')}</h3>
            <FilterMenu
              initialValues={{
                search: '',
                start_date: '',
                end_date: '',
                status: undefined,
              }}
              fields={fields}
              onChange={handleChangeFilterMenu}
              searchPlaceholder={t('my_class.fill_in_class_name')}
              changeDelay={1000}
            />
          </div>
        </Col>
      </Row>
      <Row gutter={[20, 20]}>
        {dataAllMyAssignment ? (
          !loading ? (
            dataAllMyAssignment?.map((item) => (
              <Col
                className="exam_col"
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={8}
                xxl={8}
                key={item.id}
              >
                <ExamItem
                  examId={item.examClass.exam.id}
                  name_exam={item.examClass.exam.name}
                  start_time={moment(item.examClass.dateFrom).format(
                    'HH:MM - DD/MM/YYYY'
                  )}
                  deadline={moment(item.examClass.dateEnd).format(
                    'HH:MM - DD/MM/YYYY'
                  )}
                  dateEnd={item.examClass.dateEnd}
                  work_time={item.examClass.minutes + ' Phút'}
                  num_question={item.examClass.exam.questions.length}
                  status={item.status}
                  isAllowReview={item.examClass.isAllowReview}
                  examClassId={item.examClass.id}
                  assignmentId={item.id}
                />
              </Col>
            ))
          ) : (
            <Row className="exam-loading-list">
              {[1, 2, 3].map(() => (
                <div className="exam-loading-item">
                  <Skeleton.Node active />
                </div>
              ))}
            </Row>
          )
        ) : (
          <div className="not-exam">Chưa có bài kiểm tra nào</div>
        )}
      </Row>
    </div>
  );
}

export default ExamPage;
