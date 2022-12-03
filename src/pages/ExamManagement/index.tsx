import { useMutation, useQuery } from '@apollo/client';
import { notification, Popconfirm, Tag } from 'antd';
import BreadCrumb from 'components/BreadCrumb';
import {
  DeleteExamDocument,
  GetAllExamDocument,
  GetMyExamDocument,
} from 'gql/graphql';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { AddIcon, CancelIcon, EditIcon } from 'utils/drawer';
import './ExamManagement.scss';

export interface IListExam {
  id: number;
  name_exam: string;
  class: string;
  status: string;
  had_done: number;
  total_exam: number;
}

let dataStudent: IListExam[] = [
  {
    id: 1,
    name_exam: 'Đào Đức Minh Khôi',
    class: 'B1',
    status: 'Chưa giao',
    had_done: 5,
    total_exam: 10,
  },
  {
    id: 2,
    name_exam: 'Lê Tuyền',
    class: 'B1',
    status: 'Chưa giao',
    had_done: 5,
    total_exam: 10,
  },
  {
    id: 3,
    name_exam: 'Hoàng Yến',
    class: 'B1',
    status: 'Chưa giao',
    had_done: 5,
    total_exam: 10,
  },
];

function ExamManagement() {
  const [listExam, setListExam] = useState<any[]>(dataStudent);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, refetch } = useQuery(GetMyExamDocument);
  console.log(data);
  const [fireDeleteExam] = useMutation(DeleteExamDocument);
  const handleDelete = async (id: string) => {
    console.log(id);
    try {
      await fireDeleteExam({
        variables: {
          id: id,
        },
      });
      notification.success({
        key: 'success',
        message: t('action.delete_success'),
      });
      refetch();
    } catch (error) {
      notification.error({
        key: 'error',
        message: t('action.delete_error'),
      });
    }
  };

  return (
    <div className="management-page">
      <BreadCrumb
        routes={[
          {
            name: 'Quản lý bài kiểm tra',
            path: '/exam_management',
          },
        ]}
      />
      <div className="action-exam">
        <div className="name_class">Bài đã giao</div>
        <div className="action">
          <button
            type="button"
            className="create-exam primary"
            onClick={() => navigate('/create_assignment')}
          >
            <AddIcon />
            {t('management.create_exam')}
          </button>
          <button type="button" className="give-exam primary">
            {t('management.give_assignment')}
          </button>
        </div>
      </div>
      <div className="management-container">
        <table className="management-table">
          <thead>
            <tr>
              <th>Tags</th>
              <th>{t('management.class')}</th>
              <th>{t('management.had_done')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.getMyExam?.map((item, index) => (
              <tr key={index}>
                <td className="td-management">
                  {item.tags?.map((tag, key) => (
                    <Tag key={key} color={tag.color}>
                      {tag.name}
                    </Tag>
                  ))}
                </td>
                <td className="td-management">
                  <p>{item.name}</p>
                </td>
                <td className="td-management">
                  <Link to={item.id}>
                    <EditIcon />
                  </Link>
                  <Popconfirm
                    placement="topRight"
                    title={t('action.check_delete')}
                    onConfirm={() => {
                      handleDelete(item.id);
                    }}
                    okText={t('action.delete')}
                    cancelText={t('action.close')}
                  >
                    <CancelIcon />
                  </Popconfirm>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExamManagement;
