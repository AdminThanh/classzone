import './ClassItem.scss';
import React, { useState, useTransition } from 'react';
import {
  QrcodeOutlined,
  ClockCircleOutlined,
  UserOutlined,
  EllipsisOutlined,
  DownOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Button, Col, Dropdown, Menu, Space } from 'antd';
import EditClass from '../EditClass';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

interface IClassInfo {
  name: string;
  image: string;
  learn_date: string;
  learn_date_end: string;
  qr_code: string;
  teacher: string;
  scoreFactor: number;
}

const ClassItem = (props: IClassInfo) => {
  const {
    name,
    image,
    learn_date,
    learn_date_end,
    qr_code,
    teacher,
    scoreFactor,
  } = props;
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
        },
        {
          type: 'divider',
        },
        {
          label: 'Cài đặt',
          key: '1',
        },
      ]}
    />
  );

  return (
    <div className="class-item">
      <div className="action">
        <img src={image} alt={name} className="image" />
        <Dropdown className="dropdown" overlay={menu}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <SettingOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      <div className="content">
        <Link to={'/class_detail'}>
          <h2 className="title">{name}</h2>
        </Link>
        <ul className="list-desc">
          <li className="item">
            <QrcodeOutlined />
            {t('my_class.qr_code')}: <span>{qr_code}</span>
          </li>
          <li className="item">
            <ClockCircleOutlined />
            {t('my_class.start_date')}: <span>{learn_date}</span>
          </li>
          <li className="item">
            <ClockCircleOutlined />
            {t('my_class.end_date')}: <span>{learn_date_end}</span>
          </li>
          <li className="item">
            <UserOutlined />
            {t('my_class.teacher')}: <span>{teacher}</span>
          </li>
        </ul>

        <Button
          type="primary"
          className="primary"
          size={'large'}
          onClick={() => {
            navigate('class_detail');
          }}
        >
          {t('action.detail')}
        </Button>

        {openModal && (
          <EditClass
            title={t('my_class.edit_class')}
            name={name}
            image={image}
            learn_date={learn_date}
            label={learn_date_end}
            qr_code={qr_code}
            teacher={teacher}
            scoreFactor={scoreFactor}
            setOpenModal={setOpenModal}
          />
        )}
      </div>
    </div>
  );
};

export default ClassItem;
