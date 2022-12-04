import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import clsx from 'clsx';
import { ScoreType } from 'gql/graphql';
import { useParams } from 'react-router-dom';
import socket from 'utils/socket';
import './Popupbadge.scss';

const PopupBadge = (props: any) => {
  const { classId } = useParams();
  const { data, badges } = props;

  const handleAddaBadge = (id: number) => {
    socket.emit('add_badge', {
      room: classId,
      data: {
        id: data.id,
        badge: id,
        username: data.username,
      },
    });
  };
  return (
    <div className="popup-badge">
      <div className="popup-badge__skin">
        <div className="popup-badge__skeleton">
          {!badges?.length && (
            <Alert
              type="warning"
              message={
                'Bạn chưa có cột điểm cộng hoặc trừ nào vui lòng truy cập bảng điểm để tạo'
              }
            />
          )}
          {badges?.map((badge: any) => (
            <div
              onClick={() => handleAddaBadge(badge.id)}
              className="popup-badge__badge-item-skin"
            >
              <div
                className={clsx(
                  'popup-badge__badge-item-skeleton',
                  badge.type === ScoreType.Minus &&
                    'popup-badge__badge-item-skeleton--incorrectly',
                  badge.type === ScoreType.Plus &&
                    'popup-badge__badge-item-skeleton--correctly'
                )}
              >
                <div className="popup-badge__badge-item-icon">
                  {badge.type && badge.type === ScoreType.Minus ? (
                    <DislikeOutlined />
                  ) : (
                    <LikeOutlined />
                  )}
                </div>
                <div className="popup-badge__badge-item-label">
                  {badge.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopupBadge;
