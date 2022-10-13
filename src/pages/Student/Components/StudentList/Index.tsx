import './StudentList.scss';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Avatar, Col, Modal, Row } from 'antd';
import StudentItem from '../StudentItem/Index';
import { useState } from 'react';
import AddStudent from '../AddStudent/Index';

const StudentList = (props: any) => {
  const [showAddStudent, setShowAddStudent] = useState(false);

  const { dataStudent } = props;

  return (
    <Row className="classdetail__list">
      {dataStudent?.length !== 0 &&
        dataStudent?.map((item: any) => (
          <Col key={item._id} span={3} className="classdetail__item">
            <StudentItem _id={item._id} name={item.name} avatar={item.avatar} />
          </Col>
        ))}
      <Col
        onClick={() => {
          setShowAddStudent(true);
        }}
        span={3}
        className="classdetail__item"
      >
        <PlusCircleOutlined />
      </Col>
      {showAddStudent ? (
        <Modal open={true} title="xin chào">
          <AddStudent />
        </Modal>
      ) : (
        ''
      )}
    </Row>
  );
};
export default StudentList;
