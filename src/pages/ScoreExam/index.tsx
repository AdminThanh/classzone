import React from 'react';
import { Button, Modal, Popconfirm, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import BreadCrumb from 'components/BreadCrumb';
import {
  CloseCircleOutlined,
  EditOutlined,
  EyeOutlined,
  PullRequestOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import {
  DeleteQuestionDocument,
  GetAllQuestionDocument,
  GetMyQuestionDocument,
  GetAllExamClassOfClassDocument,
} from 'gql/graphql';
import { useMemo, useState, useEffect } from 'react';
import GiveAssingment from 'components/GiveAssignment';
import moment from 'moment';
import './ScoreExam.scss';

interface ITags {
  name: string;
  color: string;
}

interface IExamClassOfClass {
  nameExam: string;
  numQuestion: string;
  status: string;
  minutes: number;
  submitted: string;
  deadline: string;
}

const ScoreExam = () => {
  const [currentModal, setCurrentModal] = useState(false);
  const { t } = useTranslation();
  const { classId } = useParams();
  const navigate = useNavigate();

  const { data: dataExamOfClass } = useQuery(GetAllExamClassOfClassDocument, {
    variables: {
      classId: classId as string,
    },
  });

  const assignmentDone: any = dataExamOfClass?.getAllExamClassOfClass.map(
    (item) => ({
      assignmentDone: item.assignmentDone,
    })
  );

  const examId = dataExamOfClass?.getAllExamClassOfClass[0].exam.id;

  const dataListAssignmentDone = assignmentDone.map(
    (student: any) => student.assignmentDone
  );

  var postsItems = [];
  for (let i = 0; i < dataListAssignmentDone.length; i++) {
    for (let j = 0; j < dataListAssignmentDone[i].length; j++) {
      postsItems.push(dataListAssignmentDone[i][j]);
    }
  }

  const dataTable = postsItems.map((item: any) => ({
    nameExam: item.student.firstName + ' ' + item.student.lastName,
    startTime: item.startTime,
    minuteDoing: item.minuteDoing,
    score: item.score,
    id: item.id,
  }));

  const columns: ColumnsType<any> = [
    {
      title: t('exam.student_name'),
      dataIndex: 'nameExam',
      key: 'nameExam',
      render: (text) => <a>{text}</a>,
    },
    {
      title: t('exam.date_doing'),
      dataIndex: 'startTime',
      key: 'startTime',
      render: (startTime) => (
        <>{moment(startTime).format('HH:MM - DD/MM/YYYY')}</>
      ),
    },
    {
      title: t('exam.work_time'),
      dataIndex: 'minuteDoing',
      key: 'minuteDoing',
      render: (second) => (
        <>
          {second} {t('exam.second')}
        </>
      ),
    },

    {
      title: t('exam.point'),
      dataIndex: 'score',
      key: 'score',
      render: (score) => <>{score.toFixed(2)}</>,
    },

    {
      title: t('action.action'),
      key: 'id',
      render: (_, id) => (
        <Space size="middle" className="view">
          <Tag
            icon={<EyeOutlined />}
            color="warning"
            onClick={() => {
              navigate('/review/' + examId + '/' + id.id);
            }}
          >
            {/* {t('action.detail')} */}
            Xem bài làm
          </Tag>
        </Space>
      ),
    },
  ];

  return (
    <div className="site_wrapper">
      <div className="site_container">
        <BreadCrumb
          routes={[
            {
              name: 'Quản lý bài kiểm tra',
              path: '/exam_management',
            },
          ]}
        />
        <Table
          className="tableScoreExam"
          columns={columns}
          dataSource={dataTable}
        />
        <Modal
          title={t('my_class.give_assignment')}
          open={currentModal}
          onCancel={() => setCurrentModal(false)}
          width={800}
          destroyOnClose={true}
          footer={null}
        >
          <GiveAssingment />
        </Modal>
      </div>
    </div>
  );
};

export default ScoreExam;
