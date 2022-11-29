import './Question.scss';
import BreadCrumb from 'components/BreadCrumb';
import { Button, message, Popconfirm, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import {
  CloseCircleOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { DeleteQuestionDocument, GetAllQuestionDocument } from 'gql/graphql';
import moment from 'moment';

interface IQuessionTags {
  name: string;
  color: string;
}

interface IQuession {
  id: string;
  question: string;
  createdAt?: any;
}
var decode = require('decode-html');

const Question = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, refetch } = useQuery(GetAllQuestionDocument);
  const dataTableQuession = data?.getAllQuestion;
  const [fireDeleteQuestion] = useMutation(DeleteQuestionDocument);
  refetch();

  console.log(dataTableQuession);

  const renderHTML = (rawHTML: string) =>
    React.createElement('div', {
      dangerouslySetInnerHTML: { __html: rawHTML },
    });

  const confirm = async (questionId: string) => {
    try {
      await fireDeleteQuestion({
        variables: {
          id: questionId,
        },
      });
      message.loading({
        type: 'loading',
        content: 'Loading...',
      });
      // setTimeout(() => {
      message.success({
        type: 'success',
        content: 'Xóa thành công',
      });
      // refetch();
      // }, 3500);
    } catch {
      message.error({
        type: 'error',
        content: 'Loading...',
      });
    }
  };

  const columns: ColumnsType<IQuession> = [
    // {
    //   title: t('my_quession.tags'),
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag, index) => {
    //         return (
    //           <Tag color={tag.color} key={index}>
    //             {tag.name}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: t('my_quession.quession'),
      dataIndex: 'question',
      key: 'question',
      render: (text, id) => <a>{renderHTML(text)}</a>,
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
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY"),
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
          <div>
            <button
              onClick={() => {
                i18next.changeLanguage(i18next.language === 'vi' ? 'en' : 'vi');
              }}
            >
              {t('count.change_language')}
            </button>
          </div>
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
                <Button
                  type="primary"
                  className="primary"
                  icon={<PlusCircleOutlined />}
                  size={'large'}
                >
                  {t('my_quession.add_quession')}
                </Button>
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
export default Question;
