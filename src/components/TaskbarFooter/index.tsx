import {
  FormOutlined,
  ScheduleOutlined,
  PieChartOutlined,
  PullRequestOutlined,
  TableOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { Modal } from 'antd';
import GiveAssingment from 'components/GiveAssignment';
import WheelOfNames from 'components/WheelOfNames';
import { useAuth } from 'contexts/AuthContext';
import Assignment from 'pages/Assignment';
import QuestionTable from 'pages/CreateAssignment/components/QuestionTable';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import socket from 'utils/socket';
import './TaskbarFooter.scss';

interface ICurrentModal {
  modal: null | 'wheel' | 'a' | 'assignment';
  data?: any;
}

const TaskbarFooter = () => {
  const [currentModal, setCurrentModal] = useState<ICurrentModal>({
    modal: null,
    data: null,
  });
  const [dataQuestionList, setDataQuestionList] = useState<any[]>([]);
  const [isOpenTableAddQuestion, setIsOpenTableAddQuestion] = useState(false);
  const [questionIds, setQuestionIds] = useState([]);
  const { t } = useTranslation();
  const { auth } = useAuth();

  let { classId } = useParams();

  const handleCloseModal = () => {
    setCurrentModal({
      modal: null,
      data: null,
    });
  };

  const handleOpenWheel = () => {
    setCurrentModal({
      modal: 'wheel',
      data: null,
    });
  };

  const handleOpenAssignment = () => {
    setCurrentModal({
      modal: 'assignment',
      data: null,
    });
  };
  const items = useMemo(() => {
    if (auth?.role === 'TEACHER') {
      return [
        {
          Icon: <PullRequestOutlined />,
          label: t('my_class.give_assignment'),
          onClick: handleOpenAssignment,
        },
        {
          Icon: <TableOutlined />,
          label: t('my_class.table_score'),
          path: 'table_score',
        },
        {
          Icon: <FormOutlined />,
          label: t('my_class.attendance'),
          path: 'attendance',
        },
        {
          Icon: <ScheduleOutlined />,
          label: t('my_class.schedule'),
          path: 'schedule',
        },
        {
          Icon: <BookOutlined />,
          label: t('my_class.quick_test'),
          onClick: () => {
            setIsOpenTableAddQuestion(true);
            console.log('Quick test');
          },
        },
        {
          Icon: <PieChartOutlined />,
          label: t('my_class.rotating'),
          onClick: handleOpenWheel,
        },
      ];
    }

    if (auth?.role === 'STUDENT') {
      return [
        {
          Icon: <FormOutlined />,
          label: t('my_class.my_history_attendance'),
          path: 'check_attendance',
        },
      ];
    }
  }, [auth]);

  return (
    <>
      <div className="taskbar_footer">
        <div className="tabs">
          {items?.map((item) => {
            return (
              <div className="tab-item">
                <Link to={item.path || ''} onClick={item.onClick}>
                  <div className="tab-item">
                    {item.Icon}
                    {item.label}
                  </div>
                </Link>
              </div>
            );
          })}

          <div onClick={handleOpenWheel} className="tab-item"></div>
        </div>
      </div>

      <Modal
        title={t('my_class.rotating')}
        open={currentModal.modal === 'wheel'}
        // onOk={handleOk}
        width={800}
        destroyOnClose={true}
        onCancel={handleCloseModal}
        footer={null}
      >
        <WheelOfNames />
      </Modal>
      <Modal
        title={t('my_class.give_assignment')}
        open={currentModal.modal === 'assignment'}
        onCancel={handleCloseModal}
        width={800}
        destroyOnClose={true}
        footer={null}
      >
        <GiveAssingment />
      </Modal>

      <Modal
        title={t('create_assignment.add_assignment')}
        centered
        open={isOpenTableAddQuestion}
        onCancel={() => {
          setIsOpenTableAddQuestion(false);
        }}
        onOk={() => {
          socket.emit('add_question', {
            classRoom: classId,
            questionIds,
          });
          // setIsOpenTableAddQuestion(false);
        }}
        width="90%"
      >
        <QuestionTable
          dataQuestionList={dataQuestionList}
          setDataQuestionList={(dataQuestionList: any) => {
            const question_ids = dataQuestionList.map((q: any) => q.key);
            setQuestionIds(question_ids);
            setDataQuestionList(dataQuestionList);
          }}
        />
      </Modal>
    </>
  );
};
export default TaskbarFooter;
