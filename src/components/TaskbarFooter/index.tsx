import './TaskbarFooter.scss';
import {
  UsergroupAddOutlined,
  FormOutlined,
  PieChartOutlined,
  BookOutlined,
  CheckSquareOutlined,
  TableOutlined,
  PullRequestOutlined,
} from '@ant-design/icons';
import { Modal } from 'antd';
import { useState } from 'react';
import WheelOfNames from 'components/WheelOfNames';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

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

  return (
    <>
      <div className="taskbar_footer">
        <div className="tabs">
          <div className="tab-item">
            <PullRequestOutlined />
            {t('my_class.give_assignment')}
          </div>
          <Link to={'/table_score'}>
            <div className="tab-item">
              <TableOutlined />
              {t('my_class.table_score')}
            </div>
          </Link>
          <Link to={'/attendance'}>
            <div className="tab-item">
              <FormOutlined />
              {t('my_class.attendance')}
            </div>
          </Link>
          <div onClick={handleOpenWheel} className="tab-item">
            <PieChartOutlined /> {t('my_class.rotating')}
          </div>
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
