import { Avatar, Checkbox, Col, Form, Modal, Row } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import StudentItem from 'pages/ClassDetail/components/StudentItem';
import { useEffect, useState, useMemo } from 'react';
import StudentGroup from './StudentGroup';

const GroupDetail = (props: any) => {
  const { setGroupDetailPage, groupDetailPage, dataListStudent } = props;
  const [form] = useForm();

  const [studentsGroup, setStudentsGroup] = useState({});

  const onChange = (checkedValues: CheckboxValueType[]) => {
    setStudentsGroup(checkedValues);
  };

  const handleLog = () => {
    console.log('studentsGroup', studentsGroup);
  };
  console.log('dataListStudent', dataListStudent);

  return (
    <Modal
      title="Modal 1000px width"
      open={groupDetailPage}
      onOk={() => handleLog()}
      onCancel={() => setGroupDetailPage(false)}
      width={1000}
    >
        <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
      <Row className="groups_list" gutter={[20, 20]}>
          {dataListStudent.map((item: any) => (
            <Col className='StudentGroup' xs={6} sm={6} md={4} lg={4} xl={3} xxl={3}>
              <Checkbox value={item.id}>
                <div>
                  <div className="student-item">
                    <Avatar src={item.avatar}>
                      {item.firstName?.charAt(0).toUpperCase()}
                    </Avatar>
                    <div className="name">
                      <a>{item.firstName + ' ' + item.lastName}</a>
                    </div>
                  </div>
                </div>
              </Checkbox>
              {/* <StudentGroup
                  name={item.firstName + ' ' + item.lastName}
                  avatar={item.avatar}
                  id={item.id}
                /> */}
            </Col>
          ))}
      </Row>
        </Checkbox.Group>
    </Modal>
  );
};
export default GroupDetail;
