import './GroupList.scss';
import {
  UserOutlined,
  AntDesignOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { Avatar, Button, Col, Row, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import CreateGroup from './CreateGroup/Index';

export interface IGroupInfo {
  _id: string;
  name: string;
  members: [];
}

const GroupList = () => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const { t } = useTranslation();

  return (
    <Row className="groups_list">
      <Col span={5} className="groups_list-item">
        <h1 className="name">Siêu nhân gao</h1>
        <Avatar.Group
          maxCount={2}
          maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
        >
          <Avatar src="https://joeschmoe.io/api/v1/random" />
          <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
          <Tooltip title="Ant User" placement="top">
            <Avatar
              style={{ backgroundColor: '#87d068' }}
              icon={<UserOutlined />}
            />
          </Tooltip>
          <Avatar
            style={{ backgroundColor: '#1890ff' }}
            icon={<AntDesignOutlined />}
          />
        </Avatar.Group>
        <Button type="primary" className="ouline" size={'large'}>
          {t('action.view_detail')}
        </Button>
      </Col>
      <Col
        onClick={() => {
          setShowCreateGroup(true);
        }}
        className="groups_list-item add"
        span={5}
      >
        <PlusCircleOutlined/>
      </Col>
      {showCreateGroup ? <CreateGroup setShowCreateGroup={setShowCreateGroup}  /> : ''}
    </Row>
  );
};
export default GroupList;
