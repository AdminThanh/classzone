import './ClassItem.scss';
import React, { useState, useTransition } from 'react';
import {
  QrcodeOutlined,
  ClockCircleOutlined,
  UserOutlined,
  EllipsisOutlined,
  DownOutlined,
  SettingOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import { Button, Col, Dropdown, Menu, Modal, notification, Space } from 'antd';
import EditClass from '../EditClass';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { useMutation } from '@apollo/client';
import { DeleteMyClassDocument } from 'gql/graphql';

export interface IClassInfo {
  id: string;
  name: string;
  avatar: string;
  end_date: string;
  from_date: string;
  code: string;
  scoreFactor: number;
  handleRefetch: any;
}

const ClassItem = (props: IClassInfo) => {
  const {
    name,
    avatar,
    end_date,
    from_date,
    code,
    scoreFactor,
    id,
    handleRefetch,
  } = props;
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  let { classId } = useParams();
  console.log(classId);
  

  const [fireDeleteMyClass] = useMutation(DeleteMyClassDocument);

  const DeleteMyClass = async (id: string) => {
    try {
      await fireDeleteMyClass({
        variables: {
          id: id,
        },
      });
      notification.success({
        key: 'success',
        message: 'Xóa thành công!',
      });
      handleRefetch();
    } catch (error) {
      notification.error({
        key: 'error',
        message: 'Xóa thất bại!',
      });
    }
  };

  const showConfirm = () => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa lớp học này!',
      icon: <ExclamationCircleFilled />,
      content: 'Lưu ý: Khi xóa sẽ không thê khôi phục lại!',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk() {
        DeleteMyClass(id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const menu = (
    <Menu
      items={[
        {
          label: 'Sửa',
          key: '0',
          onClick: () => {
            setOpenModal(true);
          },
        },
        {
          label: 'Xóa',
          key: '1',
          onClick: () => {
            showConfirm();
          },
        },
        {
          type: 'divider',
        },
        {
          label: 'Cài đặt',
          key: '2',
        },
      ]}
    />
  );

  return (
    <div className="class-item">
      <div className="action">
        <img
          src={
            avatar
              ? avatar
              : 'https://png.pngtree.com/background/20210710/original/pngtree-math-improve-class-enrollment-cartoon-blue-background-picture-image_1003463.jpg'
          }
          alt={name}
          className="image"
        />
        {avatar ? '' : <span className="img_title">{name}</span>}
        <Dropdown className="dropdown" overlay={menu}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <SettingOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      <div className="content">
        <Link to={'/class_detail/' + id}>
          <h2 className="title">{name}</h2>
        </Link>
        <ul className="list-desc">
          <li className="item">
            <QrcodeOutlined />
            {t('my_class.qr_code')}: <span>{code}</span>
          </li>
          <li className="item">
            <ClockCircleOutlined />
            {t('my_class.start_date')}:{' '}
            <span>{moment(from_date).format('DD/MM/YYYY')}</span>
          </li>
          <li className="item">
            <ClockCircleOutlined />
            {t('my_class.end_date')}:{' '}
            <span>{moment(end_date).format('DD/MM/YYYY')}</span>
          </li>
        </ul>

        <Button
          type="primary"
          className="primary"
          size={'large'}
          onClick={() => {
            navigate('class_detail/' + id);
          }}
        >
          {t('action.detail')}
        </Button>

        {openModal && (
          <EditClass
            title={t('my_class.edit_class')}
            type={'edit'}
            name={name}
            avatar={avatar}
            from_date={from_date}
            end_date={end_date}
            qr_code={code}
            scoreFactor={scoreFactor}
            id={id}
            setOpenModal={setOpenModal}
            handleRefetch={handleRefetch}
          />
        )}
      </div>
    </div>
  );
};

export default ClassItem;
