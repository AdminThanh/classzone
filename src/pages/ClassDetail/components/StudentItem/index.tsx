import './StudentItem.scss';
import { Avatar, Badge } from 'antd';

const StudentItem = (props: any) => {
  const { avatar, name, id, handleOpenBadgeStudent, isOnline } = props;
  return (
    <div
      className="student-item"
      onClick={() => handleOpenBadgeStudent(id, name)}
    >
      <Badge color={isOnline ? 'green' : 'red'} />
      <Avatar src={avatar && avatar}>{name.charAt(0).toUpperCase()}</Avatar>
      <div className="name">
        <a>{name}</a>
      </div>
    </div>
  );
};
export default StudentItem;
