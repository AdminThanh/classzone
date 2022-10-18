import './TaskbarFooter.scss';
import {
  UsergroupAddOutlined,
  FormOutlined,
  PieChartOutlined,
  BookOutlined,
} from '@ant-design/icons';

const TaskbarFooter = () => {
  return (
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
        <div className="tab-item">
          <PieChartOutlined /> Ô quay
        </div>
      </div>
    </div>
  );
};
export default TaskbarFooter;
