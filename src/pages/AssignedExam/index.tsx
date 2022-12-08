import React from 'react';
import { Button, Modal, Popconfirm, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import BreadCrumb from 'components/BreadCrumb';
import {
  CloseCircleOutlined,
  EditOutlined,
  PullRequestOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import {
  DeleteQuestionDocument,
  GetAllQuestionDocument,
  GetMyQuestionDocument,
  GetAllExamClassOfClassDocument,
} from 'gql/graphql';
import { useMemo, useState, useEffect } from 'react';
import GiveAssingment from 'components/GiveAssignment';
import moment from 'moment';

interface ITags {
  name: string;
  color: string;
}

interface IExamClassOfClass {
  tags: string[];
  nameExam: string;
  numQuestion: string;
  status: string;
  minutes: number;
  submitted: string;
  deadline: string;
}

const AssignedExam = () => {
  const [currentModal, setCurrentModal] = useState(false);

  const { t } = useTranslation();
  const { classId } = useParams();

  const { data: dataExamOfClass } = useQuery(GetAllExamClassOfClassDocument, {
    variables: {
      classId: classId as string,
    },
  });
  console.log(dataExamOfClass);
  

  const dataListExamOfClass: any = dataExamOfClass?.getAllExamClassOfClass.map(
    (item) => ({
      nameExam: item.exam.name,
      numQuestion: item.exam.questions.length,
      minutes: item.minutes as number,
      // status: 'Chưa',
      tags: item.exam.tags,
      deadline: moment(item.dateFrom).format("DD/MM/YYYY") + ' - ' + moment(item.dateEnd).format("DD/MM/YYYY"),
      submitted: item.assignmentDone?.length
        ? item.assignmentDone?.length
        : '0' + '/' + item.classRoom.students?.length,
    })
  );
  console.log('dataListExamOfClass', dataListExamOfClass);

  const datas = dataExamOfClass?.getAllExamClassOfClass;

  const columns: ColumnsType<IExamClassOfClass> = [
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => (
        <>
          {tags?.map((tag: any, index: any) => {
            return (
              <Tag color={tag.color} key={index}>
                {tag.name}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: t('management.name_exam'),
      dataIndex: 'nameExam',
      key: 'nameExam',
      render: (text) => <a>{text}</a>,
    },
    {
      title: t('exam.num_question'),
      dataIndex: 'numQuestion',
      key: 'numQuestion',
    },
    // {
    //   title: t('management.status'),
    //   dataIndex: 'status',
    //   key: 'status',
    // },
    {
      title: t('exam.work_time'),
      dataIndex: 'minutes',
      key: 'minutes',
    },
    {
      title: t('exam.deadline'),
      dataIndex: 'deadline',
      key: 'deadline',
    },
    {
      title: t('management.had_done'),
      dataIndex: 'submitted',
      key: 'submitted',
    },

    // {
    //   title: t('action.action'),
    //   key: 'id',
    //   render: (_, id) => (
    //     <Space size="middle">
    //       <Popconfirm
    //         placement="topRight"
    //         title={t('action.check_delete')}
    //         onConfirm={() => {
    //           //   confirm(id.id);
    //           console.log('onConfirm');
    //         }}
    //         okText={t('action.delete')}
    //         cancelText={t('action.close')}
    //       >
    //         <Tag icon={<CloseCircleOutlined />} color="error">
    //           {t('action.delete')}
    //         </Tag>
    //       </Popconfirm>
    //       <Tag
    //         icon={<EditOutlined />}
    //         color="warning"
    //         onClick={() => {
    //           // navigate('/question/' + id.id);
    //           console.log('click');
    //         }}
    //       >
    //         {t('action.edit')}
    //       </Tag>
    //     </Space>
    //   ),
    // },
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
        <Button
          type="primary"
          className="primary"
          icon={<PullRequestOutlined />}
          size={'large'}
          onClick={() => {
            setCurrentModal(true);
          }}
        >
          {t('management.give_assignment')}
        </Button>
        <Table columns={columns} dataSource={dataListExamOfClass} />;
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

export default AssignedExam;
