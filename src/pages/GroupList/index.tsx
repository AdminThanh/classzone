import './GroupList.scss';
import {
  UserOutlined,
  AntDesignOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { Avatar, Button, Col, Row, Skeleton, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import CreateGroup from './components/CreateGroup';

interface IStudentInfo {
  _id: string;
  name: string;
  avatar: string;
}
interface IGroupInfo {
  _id: string;
  name: string;
  members: IStudentInfo[];
}

const GroupList = (props: any) => {
  const { dataGroup, loading } = props;
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const { t } = useTranslation();
  return (
    <Row className="groups_list" gutter={[20, 20]}>
      {!loading ? (dataGroup?.length !== 0 &&
        dataGroup?.map((item: IGroupInfo) => (
          <Col key={item._id} xs={24} sm={12} md={8} lg={6} xl={4} xxl={4}>
            <div className="groups_list-item">
              <h1 className="name">{item.name}</h1>
              <Avatar.Group
                maxCount={2}
                maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
              >
                {item.members?.length !== 0 &&
                  item.members?.map((student: IStudentInfo) =>
                    student.avatar ? (
                      <Avatar key={student._id} src={student.avatar} />
                    ) : (
                      <Avatar style={{ backgroundColor: '#f56a00' }}>
                        {student.name.charAt(0).toUpperCase()}
                      </Avatar>
                    )
                  )}
                {item.members?.length > 2 && (
                  <Tooltip placement="top">
                    {item.members?.map((student: IStudentInfo) =>
                      student.avatar ? (
                        <Avatar key={student._id} src={student.avatar} />
                      ) : (
                        <Avatar style={{ backgroundColor: '#f56a00' }}>
                          {student.name.charAt(0).toUpperCase()}
                        </Avatar>
                      )
                    )}
                  </Tooltip>
                )}
              </Avatar.Group>
              <Button type="primary" className="ouline" size={'large'}>
                {t('action.view_detail')}
              </Button>
            </div>
          </Col>
        ))) : (< Row className='loading-list'>
          {[1, 2, 3, 4, 5, 6].map(() => (
            <div className='loading-item'>
              <Skeleton.Node active />
            </div>
          ))
          }
        </Row>
      )}

      <Col
        onClick={() => {
          setShowCreateGroup(true);
        }}
        xs={24}
        sm={12}
        md={8}
        lg={6}
        xl={4}
        xxl={4}
      >
        <div className="groups_list-item add">
          <PlusCircleOutlined />
        </div>
      </Col>
      {showCreateGroup ? (
        <CreateGroup setShowCreateGroup={setShowCreateGroup} />
      ) : (
        ''
      )}
    </Row>
  );
};
export default GroupList;
