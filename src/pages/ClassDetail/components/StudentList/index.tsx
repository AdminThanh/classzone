import './StudentList.scss';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Avatar, Col, Modal, Row } from 'antd';
import StudentItem from '../StudentItem';
import { useState } from 'react';
import InviteStudents from '../InviteStudents';
import { useTranslation } from 'react-i18next';

const StudentList = (props: any) => {
  const [showInviteStudents, setShowInviteStudents] = useState(false);
  const { dataStudent } = props;
  const { t } = useTranslation();
  return (
    <Row className="classdetail__list" gutter={[20, 20]}>
      {dataStudent?.length !== 0 &&
        dataStudent?.map((item: any, index: any) => (
          <Col
            key={index}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={4}
            xxl={3}
            className="classdetail__item"
          >
            <StudentItem _id={item._id} name={item.name} avatar={item.avatar} />
          </Col>
        ))}
      <Col
        onClick={() => {
          setShowInviteStudents(true);
        }}
        xs={24}
        sm={12}
        md={8}
        lg={6}
        xl={4}
        xxl={3}
        className="classdetail__item"
      >
        <div className='student-item'>
        <PlusCircleOutlined />
        </div>
      </Col>
      {showInviteStudents ? (
        <InviteStudents setShowInviteStudents={setShowInviteStudents} />
      ) : (
        ''
      )}
    </Row>
  );
};
export default StudentList;
