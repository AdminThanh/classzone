import { notification, Tabs } from 'antd';
import TaskbarFooter from 'components/TaskbarFooter';
import StudentList from 'pages/ClassDetail/components/StudentList';
import { useParams } from 'react-router-dom';
import GroupList from '../GroupList';
import './ClassDetail.scss';
import { useEffect, useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import PopupBadge from './components/PopupBadge';
import socket from 'utils/socket';
import { useQuery } from '@apollo/client';
import { GetBadgeByClassDocument, ScoreType } from 'gql/graphql';

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

const dataGroup: IGroupInfo[] = [
  {
    _id: '100001',
    name: 'Nhóm 1',
    members: [
      {
        _id: '100001',
        name: 'Avart',
        avatar:
          'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg',
      },
      {
        _id: '100002',
        name: 'Sơn Tùng M-TP',
        avatar: '',
      },
      {
        _id: '100003',
        name: 'Nguyễn Đăng Thành',
        avatar: '',
      },
    ],
  },
  {
    _id: '100002',
    name: 'Nhóm 2',
    members: [
      {
        _id: '100001',
        name: 'Avart',
        avatar: '',
      },
      {
        _id: '100002',
        name: 'Sơn Tùng M-TP',
        avatar:
          'https://upload.wikimedia.org/wikipedia/commons/f/fe/Son_Tung_M-TP_1_%282017%29.png',
      },
    ],
  },
  {
    _id: '100003',
    name: 'Nhóm 3',
    members: [
      {
        _id: '100004',
        name: 'Karik',
        avatar:
          'https://yt3.ggpht.com/qGGv8KxYLZiNHINl9jp2KZhQNAKOOE0zEG2JrK9pZSCPvibB3y4NoXrNULmQy-tOE5DFBFegzcI=s900-c-k-c0x00ffffff-no-rj',
      },
      {
        _id: '100005',
        name: 'Trịnh Trần Phương Tuấn',
        avatar:
          'https://image.thanhnien.vn/w1024/Uploaded/2022/mftum/2021_10_21/jack-va-thien-an-5805.jpeg',
      },
      {
        _id: '100003',
        name: 'Nguyễn Đăng Thành',
        avatar: '',
      },
    ],
  },
  {
    _id: '100004',
    name: 'Nhóm 4',
    members: [
      {
        _id: '100004',
        name: 'Karik',
        avatar:
          'https://yt3.ggpht.com/qGGv8KxYLZiNHINl9jp2KZhQNAKOOE0zEG2JrK9pZSCPvibB3y4NoXrNULmQy-tOE5DFBFegzcI=s900-c-k-c0x00ffffff-no-rj',
      },
      {
        _id: '100005',
        name: 'Trịnh Trần Phương Tuấn',
        avatar:
          'https://image.thanhnien.vn/w1024/Uploaded/2022/mftum/2021_10_21/jack-va-thien-an-5805.jpeg',
      },
      {
        _id: '100003',
        name: 'Nguyễn Đăng Thành',
        avatar: '',
      },
    ],
  },
  {
    _id: '100005',
    name: 'Nhóm 5',
    members: [
      {
        _id: '100001',
        name: 'Avart',
        avatar: '',
      },
      {
        _id: '100002',
        name: 'Sơn Tùng M-TP',
        avatar:
          'https://upload.wikimedia.org/wikipedia/commons/f/fe/Son_Tung_M-TP_1_%282017%29.png',
      },
    ],
  },
  {
    _id: '100006',
    name: 'Nhóm 6',
    members: [
      {
        _id: '100001',
        name: 'Avart',
        avatar: '',
      },
      {
        _id: '100002',
        name: 'Sơn Tùng M-TP',
        avatar:
          'https://upload.wikimedia.org/wikipedia/commons/f/fe/Son_Tung_M-TP_1_%282017%29.png',
      },
    ],
  },
  {
    _id: '100007',
    name: 'Nhóm 7',
    members: [
      {
        _id: '100001',
        name: 'Avart',
        avatar: '',
      },
      {
        _id: '100002',
        name: 'Sơn Tùng M-TP',
        avatar:
          'https://upload.wikimedia.org/wikipedia/commons/f/fe/Son_Tung_M-TP_1_%282017%29.png',
      },
    ],
  },
];

const dataStudent: IStudentInfo[] = [
  {
    _id: '100001',
    name: 'Avart',
    avatar:
      'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg',
  },
  {
    _id: '100002',
    name: 'Sơn Tùng M-TP',
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/f/fe/Son_Tung_M-TP_1_%282017%29.png',
  },
  {
    _id: '100003',
    name: 'Nguyễn Đăng Thành',
    avatar: '',
  },
  {
    _id: '100004',
    name: 'Karik',
    avatar:
      'https://yt3.ggpht.com/qGGv8KxYLZiNHINl9jp2KZhQNAKOOE0zEG2JrK9pZSCPvibB3y4NoXrNULmQy-tOE5DFBFegzcI=s900-c-k-c0x00ffffff-no-rj',
  },
  {
    _id: '100005',
    name: 'Trịnh Trần Phương Tuấn',
    avatar:
      'https://image.thanhnien.vn/w1024/Uploaded/2022/mftum/2021_10_21/jack-va-thien-an-5805.jpeg',
  },
  {
    _id: '100001',
    name: 'Avart',
    avatar:
      'https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.1x.rsquare.w1400.jpg',
  },
  {
    _id: '100002',
    name: 'Sơn Tùng M-TP',
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/f/fe/Son_Tung_M-TP_1_%282017%29.png',
  },
  {
    _id: '100003',
    name: 'Nguyễn Đăng Thành',
    avatar: '',
  },
  {
    _id: '100004',
    name: 'Karik',
    avatar:
      'https://yt3.ggpht.com/qGGv8KxYLZiNHINl9jp2KZhQNAKOOE0zEG2JrK9pZSCPvibB3y4NoXrNULmQy-tOE5DFBFegzcI=s900-c-k-c0x00ffffff-no-rj',
  },
  {
    _id: '100005',
    name: 'Trịnh Trần Phương Tuấn',
    avatar:
      'https://image.thanhnien.vn/w1024/Uploaded/2022/mftum/2021_10_21/jack-va-thien-an-5805.jpeg',
  },
];

const ClassDetail = () => {
  let { classId } = useParams();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [badgeModal, setBadgeModal] = useState<any>({
    data: null,
    isOpen: false,
  });
  const { data: resBadges } = useQuery(GetBadgeByClassDocument, {
    variables: {
      class_id: classId || '',
    },
  });

  console.log('badges', resBadges?.getBadgeByClass);

  useEffect(() => {
    socket.emit('join_class', classId);
  }, [classId]);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('join_class', () => {
      // setLastPong(new Date().toISOString());
      console.log('Message');
    });

    socket.on('receive_message', (data) => {
      console.log('Nhận tin nhắn', data);
    });

    socket.on('receive_badge', (data) => {
      console.log('data', data);
      if (data.type === ScoreType.Minus) {
        notification.error({
          message: data.message,
        });
      }

      if (data.type === ScoreType.Plus) {
        notification.success({
          message: data.message,
        });
      }
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
      socket.off('receive_badge');
      socket.off('receive_message');
    };
  }, []);

  const handleSubmitNewMessage = () => {
    socket.emit('send_message', {
      room: classId,
      message: 'CCCC',
    });
  };

  const handleOpenBadgeStudent = (id: string, username: string) => {
    setBadgeModal({
      data: {
        id,
        username,
      },
      isOpen: true,
    });
  };

  return (
    <div className="site_wrapper">
      <div className="site_container">
        <div className="classdetail">
          <button onClick={handleSubmitNewMessage}>ASDSA</button>
          <div className="classdetail__tab">
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Học sinh" key="1">
                <StudentList
                  handleOpenBadgeStudent={handleOpenBadgeStudent}
                  classId={classId}
                  dataStudent={dataStudent}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Nhóm" key="2">
                <GroupList dataGroup={dataGroup} />
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </div>
      <TaskbarFooter />

      <Modal
        onCancel={() =>
          setBadgeModal({
            ...badgeModal,
            isOpen: false,
          })
        }
        footer={false}
        className="popup-badge__modal"
        open={badgeModal.isOpen}
      >
        <PopupBadge
          badges={resBadges?.getBadgeByClass}
          data={badgeModal.data}
        />
      </Modal>
    </div>
  );
};
export default ClassDetail;
