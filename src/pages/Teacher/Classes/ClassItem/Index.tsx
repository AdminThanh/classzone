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
import EditClass from '../EditClass/Index';
import { useTranslation } from 'react-i18next';

interface IClassInfo {
  name: string;
  image: string;
  learn_date: string;
  learn_date_end: string;
  qr_code: string;
  teacher: string;
  scoreFactor: number;
}

const menu = (
  <Menu
    items={[
      {
        label: <a rel="noopener noreferrer">Sửa</a>,
        key: '0',
      },
      {
        label: (
          <a rel="noopener noreferrer" href="">
            Xóa
          </a>
        ),
        key: '1',
      },
      {
        type: 'divider',
      },
      {
        label: (
          <a rel="noopener noreferrer" href="">
            Cài đặt
          </a>
        ),
        key: '1',
      },
    ]}
  />
);

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
  const { t } = useTranslation();

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
        <a href="">
          <h2 className="title">{name}</h2>
        </a>
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
            setOpenModal(true);
          }}
        >
          {t('action.detail')}
        </Button>

        {openModal ? (
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
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default ClassItem;
