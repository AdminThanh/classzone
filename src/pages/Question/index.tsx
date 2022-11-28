import './Question.scss';
import BreadCrumb from 'components/BreadCrumb';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import { PlusCircleOutlined } from '@ant-design/icons';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface IQuessionTags {
  name: string;
  color: string;
}

interface IQuession {
  key: string;
  name: string;
  day_create: string;
  type_quession: string;
  tags: IQuessionTags[];
}

const fakeAPITable: Promise<IQuession[]> = new Promise((resolve, reject) => {
  setTimeout(() => {
    const fetchDataColumn: IQuession[] = [
      {
        key: '1',
        name: 'Những đặc điểm của React?',
        day_create: '25/10/2021',
        type_quession: 'Trắc nghiệm',
        tags: [
          {
            color: '#2db7f5',
            name: 'ReactJS cơ bản',
          },
          {
            color: '#87d068',
            name: 'ReactJS cơ bản',
          },
        ],
      },
      {
        key: '2',
        name: 'Các trình duyệt web có đọc JSX một cách trực tiếp được không?',
        day_create: '25/10/2021',
        type_quession: 'Trắc nghiệm',
        tags: [
          {
            color: 'blue',
            name: 'ReactJS cơ bản',
          },
          {
            color: 'rgb(21 94 127)',
            name: 'ReactJS cơ bản',
          },
        ],
      },
      {
        key: '3',
        name: 'Tại sao nên sử dụng React thay vì các framework khác, ví dụ như Angular?',
        day_create: '25/10/2021',
        type_quession: 'Trắc nghiệm',
        tags: [
          {
            color: '#f50',
            name: 'ReactJS cơ bản',
          },
          {
            color: 'yellow',
            name: 'ReactJS cơ bản',
          },
        ],
      },
    ];
    resolve(fetchDataColumn);
  }, 1000);
});

const Question = () => {
  const { t } = useTranslation();
  const [dataTableQuession, setDataTableQuession] = useState<
    IQuession[] | undefined
  >();

  useEffect(() => {
    fakeAPITable.then((res) => {
      setDataTableQuession(res);
    });
  }, []);

  const columns: ColumnsType<IQuession> = [
    {
      title: t('my_quession.tags'),
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag, index) => {
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
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: t('my_quession.type_quession'),
      dataIndex: 'type_quession',
      key: 'type_quession',
    },
    {
      title: t('my_quession.day_create'),
      dataIndex: 'day_create',
      key: 'day_create',
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
            <Table className='table_question' columns={columns} dataSource={dataTableQuession} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Question;
