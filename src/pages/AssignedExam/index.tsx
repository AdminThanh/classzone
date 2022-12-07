import {
  CloseCircleOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { Button, message, Popconfirm, Skeleton, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import BreadCrumb from 'components/BreadCrumb';
import {
  DeleteQuestionDocument,
  GetAllExamOfClassDocument,
  GetAllQuestionDocument,
  GetMyQuestionDocument,
} from 'gql/graphql';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './AssignedExam.scss';

interface IQuessionTags {
  name: string;
  color: string;
}

interface IQuession {
  id: string;
  question: string;
  createdAt?: any;
}

export const renderHTML = (rawHTML: string) =>
  React.createElement('div', {
    dangerouslySetInnerHTML: { __html: rawHTML },
  });

const AssignedExam = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, refetch, loading } = useQuery(GetMyQuestionDocument);
  const { classId } = useParams();
  const dataTableQuession = data?.getMyQuestion;
  const [fireDeleteQuestion] = useMutation(DeleteQuestionDocument);
  

  const { data: getAllExamOfClass } = useQuery(GetAllExamOfClassDocument, {
    variables: {
      classId: classId as string,
    },
  });

  const dataExamOfClass = getAllExamOfClass?.getAllExamOfClass;

  const confirm = async (questionId: string) => {
    try {
      await fireDeleteQuestion({
        variables: {
          id: questionId,
        },
      });
      message.success({
        type: 'success',
        content: t('action.delete_success'),
      });
      refetch();
    } catch {
      message.error({
        type: 'error',
        content: t('action.delete_error'),
      });
    }
  };

  const columns: ColumnsType<IQuession> = [
    {
      title: t('my_quession.tags'),
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
      title: t('my_quession.quession'),
      dataIndex: 'question',
      key: 'question',
      render: (text, id) => (
        <a
          className="name_question"
          onClick={() => {
            navigate('/question/' + id.id);
          }}
        >
          {renderHTML(text)}
        </a>
      ),
    },
    {
      title: t('my_quession.type_quession'),
      dataIndex: 'type_quession',
      key: 'type_quession',
      render: (_) => t('my_quession.choice'),
    },
    {
      title: t('my_quession.day_create'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => moment(createdAt).format('DD/MM/YYYY'),
    },
    {
      title: t('action.action'),
      key: 'id',
      render: (_, id) => (
        <Space size="middle">
          <Popconfirm
            placement="topRight"
            title={t('action.check_delete')}
            onConfirm={() => {
              confirm(id.id);
            }}
            okText={t('action.delete')}
            cancelText={t('action.close')}
          >
            <Tag icon={<CloseCircleOutlined />} color="error">
              {t('action.delete')}
            </Tag>
          </Popconfirm>
          <Tag
            icon={<EditOutlined />}
            color="warning"
            onClick={() => {
              navigate('/question/' + id.id);
            }}
          >
            {t('action.edit')}
          </Tag>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="site_wrapper">
        <div className="site_container">
          <BreadCrumb
            routes={[
              {
                name: t('navbar.home'),
                path: '/',
              },
              {
                name: t('navbar.question_management'),
                path: '/question',
              },
            ]}
          />
          <div className="question">
            <div className="action">
              <Link to={'/create_question'}>
                {!loading ? (
                  <Button
                    type="primary"
                    className="primary"
                    icon={<PlusCircleOutlined />}
                    size={'large'}
                  >
                    {t('my_quession.add_quession')}
                  </Button>
                ) : (
                  <Skeleton.Button size="large" />
                )}
              </Link>
            </div>
            <Table
              className="table_question"
              columns={columns}
              dataSource={dataTableQuession}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AssignedExam;
