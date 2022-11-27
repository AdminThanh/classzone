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
import moment from 'moment';

export interface IClassInfo {
  _id: string;
  name: string;
  avatar: string;
  end_date: string;
  from_date: string;
  code: string;
  scoreFactor: number;
}

const ClassItem = (props: IClassInfo) => {
  const { name, avatar, end_date, from_date, code, scoreFactor, _id } = props;
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
        <img
          src={
            avatar
              ? avatar
              : 'https://cdn.dnaindia.com/sites/default/files/styles/full/public/2021/02/20/959189-bihar-board.jpg'
          }
          alt={name}
          className="image"
        />
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
            {t('my_class.qr_code')}: <span>{code}</span>
          </li>
          <li className="item">
            <ClockCircleOutlined />
            {t('my_class.start_date')}: <span>{moment(from_date).format('DD/MM/YYYY')}</span>
          </li>
          <li className="item">
            <ClockCircleOutlined />
            {t('my_class.end_date')}: <span>{moment(end_date).format('DD/MM/YYYY')}</span>
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
            type={'edit'}
            name={name}
            image={avatar}
            from_date={from_date}
            end_date={end_date}
            qr_code={code}
            scoreFactor={scoreFactor}
            _id={_id}
            setOpenModal={setOpenModal}
          />
        )}
      </div>
    </div>
  );
};

export default ClassItem;
