import './StudentList.scss';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Avatar, Col, Modal, notification, Row } from 'antd';
import StudentItem from '../StudentItem';
import { useState } from 'react';
import InviteStudents from '../InviteStudents';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@apollo/client';
import { GetClassByIdDocument } from 'gql/graphql';

const StudentList = (props: any) => {
  const { dataStudent, classId, handleOpenBadgeStudent, onlines } = props;

  const [showInviteStudents, setShowInviteStudents] = useState(false);

  const { data, refetch } = useQuery(GetClassByIdDocument, {
    variables: {
      id: classId,
    },
  });

  const dataListStudent = data?.getClassById?.students;

  const { t } = useTranslation();
  return (
    <Row className="classdetail__list" gutter={[20, 20]}>
      {dataListStudent?.length !== 0 &&
        dataListStudent?.map((item: any, index: any) => (
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
            <StudentItem
              isOnline={onlines.includes(item.id)}
              handleOpenBadgeStudent={handleOpenBadgeStudent}
              id={item.id}
              name={item.firstName + ' ' + item.lastName}
            />
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
        <div className="student-item">
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
