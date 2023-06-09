import { useMutation, useQuery } from '@apollo/client';
import { Avatar, notification, Tooltip } from 'antd';
import {
  AssignStudentToClassDocument,
  GetClassByIdDocument,
  GetInfoMeDocument,
} from 'gql/graphql';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import './JoinClass.scss';

const InviteStudentsLink = () => {
  let { classId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data } = useQuery(GetInfoMeDocument);
  const nameMe = (data?.me?.lastName + ' ' + data?.me?.firstName) as string;

  const [fireAssignStudentToClass] = useMutation(AssignStudentToClassDocument);

  {
    const { data, refetch } = useQuery(GetClassByIdDocument, {
      variables: {
        id: classId as string,
      },
    });
    var className = data?.getClassById?.name;
    var classBanner = data?.getClassById?.avatar as string;
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
                <img
                  src={
                    classBanner
                      ? classBanner
                      : 'https://static.taogiaoduc.vn/2018/01/thao-luan-nhom.png'
                  }
                  className="class_banner"
                />
                {/* <Avatar className='className'>{className?.charAt(0).toUpperCase()}</Avatar> */}
              </span>
            </div>
            <div className="ant-result-title">{className}</div>
            <div className="ant-result-subtitle">
              {t('my_class.hello')}
              {nameMe}. {t('my_class.join_class_act')}
            </div>
            <Avatar.Group
              maxCount={2}
              maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
            >
              {students?.length !== 0 &&
                students?.map(
                  (item, index) =>
                    index < 2 && (
                      <Avatar key={item.id}>
                        {item?.firstName?.charAt(0).toUpperCase()}
                      </Avatar>
                    )
                )}
              <Tooltip title="Ant User" placement="top">
                {students?.length !== 0 &&
                  students?.map(
                    (item, index) =>
                      index > 1 && (
                        <Avatar key={item.id}>
                          {item?.firstName?.charAt(0).toUpperCase()}
                        </Avatar>
                      )
                  )}
              </Tooltip>
            </Avatar.Group>
            <div className="ant-result-extra">
              <button
                onClick={handleJoinClass}
                type="button"
                className="ant-btn ant-btn-primary primary join_class_btn"
              >
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
