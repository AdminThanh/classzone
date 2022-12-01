import {
  FormOutlined,
  PieChartOutlined,
  PullRequestOutlined,
  ScheduleOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { Modal } from 'antd';
import WheelOfNames from 'components/WheelOfNames';
import { useAuth } from 'contexts/AuthContext';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './TaskbarFooter.scss';

interface ICurrentModal {
  modal: null | 'wheel' | 'a';
  data?: any;
}

const TaskbarFooter = () => {
  const [currentModal, setCurrentModal] = useState<ICurrentModal>({
    modal: null,
    data: null,
  });
  const { t } = useTranslation();
  const { auth } = useAuth();

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

  const items = useMemo(() => {
    if (auth?.role === 'TEACHER') {
      return [
        {
          Icon: <PullRequestOutlined />,
          label: t('my_class.give_assignment'),
          path: '',
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
      ]
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
    </>
  );
};
export default TaskbarFooter;
