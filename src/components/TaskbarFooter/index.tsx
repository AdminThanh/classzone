import './TaskbarFooter.scss';
import {
  UsergroupAddOutlined,
  FormOutlined,
  PieChartOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { Modal } from 'antd';
import { useState } from 'react';
import WheelOfNames from 'components/WheelOfNames';

interface ICurrentModal {
  modal: null | 'wheel' | 'a';
  data?: any;
}

const TaskbarFooter = () => {
  const [currentModal, setCurrentModal] = useState<ICurrentModal>({
    modal: null,
    data: null,
  });

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
            <UsergroupAddOutlined />
            Lớp học
          </div>
          <div className="tab-item">
            <BookOutlined />
            Học sinh
          </div>
          <div className="tab-item">
            <FormOutlined />
            Điểm danh
          </div>
          <div onClick={handleOpenWheel} className="tab-item">
            <PieChartOutlined /> Ô quay
          </div>
        </div>
      </div>

      <Modal
        title="Vòng quay may mắn"
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
