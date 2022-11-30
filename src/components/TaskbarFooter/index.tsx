import {
  FormOutlined,
  PieChartOutlined, PullRequestOutlined, TableOutlined
} from '@ant-design/icons';
import { Modal } from 'antd';
import GiveAssingment from 'components/GiveAssignment';
import WheelOfNames from 'components/WheelOfNames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
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
  const { t } = useTranslation();

  let { classId } = useParams();
  console.log(classId);

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

  return (
    <>
      <div className="taskbar_footer">
        <div className="tabs">
          <div className="tab-item" onClick={handleOpenAssignment}>
            <PullRequestOutlined />
            {t('my_class.give_assignment')}
          </div>
          <Link to={'/table_score'}>
            <div className="tab-item">
              <TableOutlined />
              {t('my_class.table_score')}
            </div>
          </Link>
          <Link to={`attendance`}>
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
      <Modal
        title={t('my_class.give_assignment')}
        open={currentModal.modal === "assignment"}
        onCancel={handleCloseModal}
        width={800}
        destroyOnClose={true}
        footer={null}
      >
        <GiveAssingment />
      </Modal>
    </>
  );
};
export default TaskbarFooter;
