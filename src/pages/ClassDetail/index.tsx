import { Tabs } from 'antd';
import TaskbarFooter from 'components/TaskbarFooter';
import StudentList from 'pages/ClassDetail/components/StudentList';
import { useParams } from 'react-router-dom';
import GroupList from '../GroupList';
import './ClassDetail.scss';

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
  return (
    <div className="site_wrapper">
      <div className="site_container">
        <div className="classdetail">
          <div className="classdetail__tab">
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Học sinh" key="1">
                <StudentList classId={classId} dataStudent={dataStudent} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Nhóm" key="2">
                <GroupList dataGroup={dataGroup} />
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </div>
      <TaskbarFooter />
    </div>
  );
};
export default ClassDetail;
