import './StudentItem.scss';
import { Avatar } from 'antd';

const StudentItem = (props: any) => {
  const { avatar, name, _id } = props;

  return (
    <div className="student-item">
      <Avatar src={avatar && avatar}>{name.charAt(0).toUpperCase()}</Avatar>
      <div className="name">
        <a>{name}</a>
      </div>
    </div>
  );
};
export default StudentItem;
