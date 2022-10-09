import './ClassItem.scss';
import React, { useState } from 'react';
import {
  QrcodeOutlined,
  ClockCircleOutlined,
  UserOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { Button, Col } from 'antd';
import EditClass from '../EditClass/Index';

interface ClassInfo {
  name: string;
  image: string;
  learn_date: string;
  learn_date_end: string;
  qr_code: string;
  teacher: string;
  scoreFactor: number;
}

const ClassItem = (props: ClassInfo) => {
  const { name, image, learn_date, learn_date_end, qr_code, teacher, scoreFactor } = props;
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="class-item">
      <div className="action">
        <img src={image} alt={name} className="image" />
        <div className="dropdown">
          <EllipsisOutlined />
        </div>
      </div>
      <div className="content">
        <a href="">
          <h2 className="title">{name}</h2>
        </a>
        <ul className="list-desc">
          <li className="item">
            <QrcodeOutlined />
            Mã Code: <span>{qr_code}</span>
          </li>
          <li className="item">
            <ClockCircleOutlined />
            Ngày bắt đầu: <span>{learn_date}</span>
          </li>
          <li className="item">
            <ClockCircleOutlined />
            Ngày kết thúc: <span>{learn_date_end}</span>
          </li>
          <li className="item">
            <UserOutlined />
            Giáo viên: <span>{teacher}</span>
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
          Chi tiết
        </Button>

        {openModal ? (
          <EditClass
            title="Chỉnh sửa lớp học"
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