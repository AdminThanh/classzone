import { useQuery } from '@apollo/client';
import { Button, notification, Progress, Steps, Tabs } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import TaskbarFooter from 'components/TaskbarFooter';
import { useAuth } from 'contexts/AuthContext';
import { GetBadgeByClassDocument, ScoreType } from 'gql/graphql';
import Assignment from 'pages/Assignment';
import AssignmentItem from 'pages/Assignment/components/AssignmentItem';
import StudentList from 'pages/ClassDetail/components/StudentList';
import { useEffect, useState, useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import socket from 'utils/socket';
import GroupList from '../GroupList';
import './ClassDetail.scss';
import PopupBadge from './components/PopupBadge';

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
  const { auth } = useAuth();
  const [current, setCurrent] = useState(1);
  const { t } = useTranslation();
  const [quickTest, setQuickTest] = useState<any>({
    data: null,
    isOpen: false,
  });
  const [badgeModal, setBadgeModal] = useState<any>({
    data: null,
    isOpen: false,
  });
  const { data: resBadges } = useQuery(GetBadgeByClassDocument, {
    variables: {
      class_id: classId || '',
    },
  });
  const [onlines, setOnlines] = useState([]);

  const onChange = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  const handleNextQuestion = () => {
    console.log(
      'current < quickTest.data.length',
      current,
      quickTest.data.length
    );
    if (current < quickTest.data.length) {
      setCurrent(current + 1);
    }
  };

  useEffect(() => {
    socket.emit('join_class', {
      classId,
      userId: auth.id,
    });

    console.log({
      classId,
      userId: auth.id,
    });
  }, [classId, auth.id]);

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

    socket.on('receive_quick-test', (data) => {
      console.log('nhận quick test', data);
      setQuickTest({
        data: data,
        isOpen: true,
      });
    });

    socket.on('receive_students-online-in-class', (data) => {
      console.log('receive_students-online-in-class', data);
      setOnlines(data);
    });

    socket.on('receive_badge', (data) => {
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
      socket.emit('leave_class', classId);

      socket.off('receive_students-online-in-class');
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
      socket.off('receive_badge');
      socket.off('receive_message');
    };
  }, []);

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
          <div className="classdetail__tab">
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Học sinh" key="1">
                <StudentList
                  handleOpenBadgeStudent={handleOpenBadgeStudent}
                  classId={classId}
                  dataStudent={dataStudent}
                  onlines={onlines}
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
        title="Thêm thành tích cho học sinh"
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

      <Modal
        title={t('create_assignment.add_assignment')}
        centered
        closable={false}
        open={quickTest.isOpen}
        footer={false}
        onCancel={() => {
          // setQuickTest({
          //   data: null,
          //   isOpen: false,
          // });
        }}
        onOk={() => {
          console.log('badgeModal', badgeModal);
          // socket.emit('add_question', {
          //   classRoom: classId,
          //   questionIds,
          // });
          // setIsOpenTableAddQuestion(false);
        }}
        width="90%"
      >
        <Progress
          percent={80}
          steps={5}
          className="classDetail-quick-test-progress"
          strokeColor={['green', 'green', 'red', 'red']}
        />
        {quickTest.data && (
          <AssignmentItem
            dataAnswer={quickTest.data?.[current - 1]?.answer}
            handleAnswered={(id, value) => {
              // console.log('Change', {
              //   id,
              //   value,
              // });
            }}
            question_id={quickTest.data?.[current - 1].id}
            name={quickTest.data?.[current - 1]?.name}
            content={quickTest.data?.[current - 1]?.question}
            answer={quickTest.data?.[current - 1]?.answers}
          />
        )}
        <Button type="primary" onClick={handleNextQuestion}>
          Câu tiếp theo
        </Button>
      </Modal>
    </div>
  );
};
export default ClassDetail;
