import './JoinClass.scss';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Avatar, Button, notification, Result, Tooltip } from 'antd';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import {
  AssignStudentToClassDocument,
  GetClassByIdDocument,
  GetInfoMeDocument,
} from 'gql/graphql';

const InviteStudentsLink = () => {
  let { classId } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery(GetInfoMeDocument);
  console.log('GetInfoMeDocument', data);

  const [fireAssignStudentToClass] = useMutation(AssignStudentToClassDocument);

  {
    const { data, refetch } = useQuery(GetClassByIdDocument, {
      variables: {
        id: classId as string,
      },
    });
    var className = data?.getClassById?.name;
    var students = data?.getClassById?.students;
    console.log('GetClassByIdDocument', data);
  }

  const handleJoinClass = async () => {
    const userId = data?.me?.id as string;
    try {
      await fireAssignStudentToClass({
        variables: {
          assignStudentToClass: {
            classId: classId as string,
            usersIds: [userId],
          },
        },
      });
      notification.destroy();
      notification.success({
        key: 'success',
        message: 'Tham gia thành công!',
      });
      setTimeout(() => {
        navigate('../class_detail/' + classId);
      }, 500);
    } catch (error) {
      notification.error({
        key: 'error',
        message: 'Tham gia thất bại!',
      });
    }
  };

  return (
    <div className="site_wrapper">
      <div className="site_container">
        <div className="join_class">
          <div className="ant-result ant-result-info">
            <div className="ant-result-icon">
              <span
                role="img"
                aria-label="exclamation-circle"
                className="anticon anticon-exclamation-circle"
              >
                <Avatar>k</Avatar>
              </span>
            </div>
            <div className="ant-result-title">{className}</div>
            <div className="ant-result-subtitle">
              Sorry, the page you visited does not exist.
            </div>
            <Avatar.Group
              maxCount={2}
              maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
            >
              {students?.length !== 0 &&
                students?.map(
                  (item, index) =>
                    index < 2 && (
                      <Avatar key={item.id} src={item?.avatar}>
                        {item?.firstName?.charAt(0).toUpperCase()}
                      </Avatar>
                    )
                )}
              <Tooltip title="Ant User" placement="top">
                {students?.length !== 0 &&
                  students?.map(
                    (item, index) =>
                      index > 1 && (
                        <Avatar key={item.id} src={item?.avatar}>
                          {item?.firstName?.charAt(0).toUpperCase()}
                        </Avatar>
                      )
                  )}
              </Tooltip>
            </Avatar.Group>
            <div className="ant-result-extra">
              <button type="button" className="ant-btn ant-btn-primary">
                <span>Tham gia</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InviteStudentsLink;
