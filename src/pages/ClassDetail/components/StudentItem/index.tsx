import './StudentItem.scss';
import { Avatar } from 'antd';

const StudentItem = (props: any) => {
  const { avatar, name, id, handleOpenBadgeStudent } = props;

  return (
    <div
      className="student-item"
      onClick={() => handleOpenBadgeStudent(id, name)}
    >
      <Avatar src={avatar && avatar}>{name.charAt(0).toUpperCase()}</Avatar>
      <div className="name">
        <a>{name}</a>
      </div>
    </div>
  );
};
export default StudentItem;
