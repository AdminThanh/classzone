import './StudentItem.scss';
import { Avatar, Badge } from 'antd';
import clsx from 'clsx';
import { useAuth } from 'contexts/AuthContext';

const StudentItem = (props: any) => {
  const { avatar, name, id, handleOpenBadgeStudent, isOnline } = props;
  const { auth } = useAuth();

  return (
    <div
      className={clsx("student-item", { disable: auth.role === "TEACHER" })}
      onClick={() => handleOpenBadgeStudent(id, name)}
    >
      <Badge color={isOnline ? 'green' : 'red'} />
      <Avatar src={avatar}>{name.charAt(0).toUpperCase()}</Avatar>
      <div className="name">
        <a>{name}</a>
      </div>
    </div>
  );
};
export default StudentItem;
