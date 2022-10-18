import './Question.scss';
import BreadCrumb from 'components/BreadCrumb';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

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

const Question = () => {
  const { t } = useTranslation();

  const columns: ColumnsType<IQuession> = [
    {
      title: 'Thẻ',
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
      title: 'Câu hỏi',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'type_quession',
      key: 'type_quession',
    },
    {
      title: 'Loại',
      dataIndex: 'day_create',
      key: 'day_create',
    },
  ];

  const data: IQuession[] = [
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
                name: t('navbar.day_createment'),
                path: '/question',
              },
            ]}
          />
          <div className="question">
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Question;
