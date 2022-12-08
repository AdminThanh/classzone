import { useQuery } from '@apollo/client';
import { Button, notification, Progress, Tabs } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import Leaderboard from 'components/Leaderboard';
import TaskbarFooter from 'components/TaskbarFooter';
import { useAuth } from 'contexts/AuthContext';
import {
  GetBadgeByClassDocument,
  GetClassByIdDocument,
  ScoreType,
} from 'gql/graphql';
import Assignment from 'pages/Assignment';
import AssignmentItem from 'pages/Assignment/components/AssignmentItem';
import StudentList from 'pages/ClassDetail/components/StudentList';
import { useEffect, useRef, useState } from 'react';
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

const ClassDetail = () => {
  let { classId } = useParams();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const emitter: any = useRef();
  const leftSecondTimer: any = useRef();
  const __handleNextQuestion: any = useRef();
  const { auth } = useAuth();
  const [current, setCurrent] = useState(1);
  const { t } = useTranslation();
  const [quickTest, setQuickTest] = useState<any>({
    data: null,
    isOpen: false,
    answer: null,
    answer_submit: [],
  });
  const [leaderboard, setLeaderboard] = useState<any>({
    isOpen: false,
    data: null,
  });

  const [leftSecond, setLeftSecond] = useState(0);

  const [badgeModal, setBadgeModal] = useState<any>({
    data: null,
    isOpen: false,
  });

  const {
    data: dataClass,
    refetch: refetchClass,
    loading: loadingClass,
  } = useQuery(GetClassByIdDocument, {
    variables: {
      id: classId || '',
    },
  });
  const { data: resBadges } = useQuery(GetBadgeByClassDocument, {
    variables: {
      class_id: classId || '',
    },
  });
  const [onlines, setOnlines] = useState([]);

  const { data, refetch } = useQuery(GetClassByIdDocument, {
    variables: {
      id: classId as string,
    },
  });

  const dataListStudent = data?.getClassById?.students;

  const onChange = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  const handleOpenLeaderboard = () => {
    setLeaderboard({
      data: {},
      isOpen: true,
    });
  };

  const handleNextQuestion = () => {
    const listCorrectAnswer: string[] = [];

    quickTest.data?.[current - 1]?.correctAnswer?.forEach((aswr: any) => {
      if (aswr.result) {
        listCorrectAnswer.push(aswr.text);
      }
    });

    let isCorrect = true;

    quickTest?.answer?.value?.forEach((aswr: string) => {
      if (!listCorrectAnswer.includes(aswr)) {
        isCorrect = false;
      }
    });

    let score = isCorrect === true ? leftSecond : 0;

    // Handle emit answer of student
    socket.emit('submit_answer', {
      user_id: auth.id,
      score,
      classRoom: classId,
    });

    const newAnswersubmit = quickTest.answer_submit;
    newAnswersubmit.push(isCorrect);
    // Handle next question
    if (current < quickTest?.data?.length) {
      setCurrent(current + 1);
      setQuickTest({
        ...quickTest,
        answer: null,
        answer_submit: newAnswersubmit,
      });
      setLeftSecond(20);
    } else {
      // Disable quickTest
      setQuickTest({
        isOpen: false,
        answer: null,
        answer_submit: [],
        data: null,
      });

      // Handle show leaderboard
      setLeaderboard({
        ...leaderboard,
        isOpen: true,
      });

      clearInterval(leftSecondTimer.current);
      __handleNextQuestion.current = null;
    }
  };

  __handleNextQuestion.current = handleNextQuestion;

  useEffect(() => {
    // emitter.current = window.setInterval(() => {
    socket.emit('join_class', {
      classId,
      userId: auth.id,
    });
    // }, 1000);

    return () => {
      socket.off('join_class');
      clearInterval(emitter.current);
    };
  }, [classId, auth.id]);

  useEffect(() => {
    refetchClass();
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('receive_message', (data) => {
      console.log('Nhận tin nhắn', data);
    });

    socket.on('receive_quick-test', (data) => {
      setQuickTest({
        data: data,
        isOpen: true,
        answer: null,
        answer_submit: [],
      });
      setLeftSecond(20);

      leftSecondTimer.current = setInterval(() => {
        setLeftSecond((prevSecond) => {
          if (prevSecond <= 0) __handleNextQuestion.current();
          return prevSecond - 1;
        });
      }, 1000);
    });

    socket.on('receive_students-online-in-class', (data) => {
      setOnlines(data);
    });

    socket.on('receive_badge', (data: any) => {
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

    /** Handle quick test */
    socket.on('receive_answer_submit', ({ userId, score }) => {
      setLeaderboard((prev: any) => {
        const oldScore = prev.data?.[userId] || 0;

        const newLeaderboard = {
          ...prev.data,
          [userId]: oldScore + score,
        };

        return {
          ...prev,
          data: newLeaderboard,
        };
      });
    });

    return () => {
      clearInterval(leftSecondTimer.current);

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
                  dataListStudent={dataClass?.getClassById?.students}
                  onlines={onlines}
                  loading={loadingClass}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Nhóm" key="2">
                <GroupList dataListStudent={dataListStudent} />
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </div>
      <TaskbarFooter
        dataListStudent={dataClass?.getClassById.students}
        handleOpenLeaderboard={handleOpenLeaderboard}
      />

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
        width="90%"
      >
        {/* Progress time  */}
        <Progress
          format={() => `${leftSecond} giây`}
          percent={(100 * leftSecond) / 20}
          className="classDetail-quick-test-progress"
        />
        {quickTest.data && (
          <AssignmentItem
            handleAnswered={(id, value) => {
              quickTest.answer = {
                value,
                id,
              };
            }}
            question_id={quickTest.data?.[current - 1].id}
            name={quickTest.data?.[current - 1]?.name}
            content={quickTest.data?.[current - 1]?.question}
            answer={quickTest.data?.[current - 1]?.answers}
            type="quick_test"
          />
        )}
        <Button type="primary" onClick={handleNextQuestion}>
          Gửi đáp án
        </Button>
        {/* Progress answer correct */}
        <Progress
          percent={
            (quickTest.answer_submit?.length * 100) / quickTest?.data?.length
          }
          steps={quickTest?.data?.length}
          className="classDetail-quick-test-progress"
          strokeColor={quickTest.answer_submit.map((isCorrect: boolean) =>
            isCorrect ? 'green' : 'red'
          )}
        />
      </Modal>

      <Modal
        className="leaderboard__modal"
        title={t('create_assignment.add_assignment')}
        centered
        open={leaderboard.isOpen}
        footer={false}
        onCancel={() => {
          setLeaderboard({
            data: null,
            isOpen: false,
          });
        }}
      >
        <Leaderboard
          leaderboard={leaderboard.data}
          students={dataClass?.getClassById?.students}
          onlines={onlines}
        />
      </Modal>
    </div>
  );
};
export default ClassDetail;
