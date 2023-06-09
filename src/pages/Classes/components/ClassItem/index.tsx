import './ClassItem.scss';
import React, { useRef, useState } from 'react';
import {
  QrcodeOutlined,
  ClockCircleOutlined,
  SettingOutlined,
  ExclamationCircleFilled,
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Dropdown,
  Menu,
  message,
  Modal,
  notification,
  Row,
  Skeleton,
  Space,
  Tooltip,
} from 'antd';
import EditClass from '../EditClass';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useMutation } from '@apollo/client';
import { DeleteMyClassDocument } from 'gql/graphql';
import QRCode from 'qrcode.react';
import copy from 'copy-to-clipboard';
import { useAuth } from 'contexts/AuthContext';

export interface IClassInfo {
  id: string;
  name: string;
  avatar: string;
  end_date: string;
  from_date: string;
  owner?: string;
  code: string;
  scoreFactor: number;
  handleRefetch: any;
}

const ClassItem = (props: IClassInfo) => {
  const {
    name,
    avatar,
    end_date,
    from_date,
    code,
    owner,
    scoreFactor,
    id,
    handleRefetch,
  } = props;
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const { auth } = useAuth();

  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState<Boolean>(false);
  const [fireDeleteMyClass] = useMutation(DeleteMyClassDocument);
  const link_qr = window.location.origin + '/join_class/' + id;

  const DeleteMyClass = async (id: string) => {
    setLoading(true);
    try {
      await fireDeleteMyClass({
        variables: {
          id: id,
        },
      });
      notification.success({
        key: 'success',
        message: t('action.delete_success'),
      });
      handleRefetch();
    } catch (error) {
      notification.error({
        key: 'error',
        message: t('action.delete_error'),
      });
    } finally {
      setLoading(false);
    }
  };

  const showConfirm = () => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa lớp học này!',
      icon: <ExclamationCircleFilled />,
      content: 'Lưu ý: Khi xóa sẽ không thê khôi phục lại!',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk() {
        DeleteMyClass(id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleDowloadQRCode = () => {
    const canvas = document.getElementById(
      'qrcode'
    ) as HTMLCanvasElement | null;
    const pngUrl = canvas
      ?.toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let linkDowload = document.createElement('a');
    linkDowload.href = pngUrl as string;
    linkDowload.download = `qr-code.png`;
    document.body.appendChild(linkDowload);
    linkDowload.click();
    document.body.removeChild(linkDowload);
    setTimeout(() => {
      setOpen(false);
    }, 500);
  };

  const copyLinkToClipboard = () => {
    if (copy(link_qr)) {
      message.success(t('action.coppy_success') as string);
    } else {
      message.error(t('action.coppy_error') as string);
    }
  };

  const menu = (
    <Menu
      items={[
        {
          label: 'Sửa',
          key: '0',
          onClick: () => {
            setOpenModal(true);
          },
        },
        {
          label: 'Xóa',
          key: '1',
          onClick: () => {
            showConfirm();
          },
        },
        {
          type: 'divider',
        },
        {
          label: 'Cài đặt',
          key: '2',
        },
      ]}
    />
  );

  return (
    <>
      {!loading ? (
        <div className="class-item">
          <div className="action">
            <img
              src={
                avatar
                  ? avatar
                  : 'https://png.pngtree.com/background/20210710/original/pngtree-math-improve-class-enrollment-cartoon-blue-background-picture-image_1003463.jpg'
              }
              alt={name}
              className="image"
            />
            {avatar ? '' : <span className="img_title">{name}</span>}
            {auth.role === 'TEACHER' && (
              <Dropdown className="dropdown" overlay={menu}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <SettingOutlined />
                  </Space>
                </a>
              </Dropdown>
            )}
          </div>
          <div className="content">
            <Link to={'/class_detail/' + id}>
              <h2 className="title">{name}</h2>
            </Link>
            <ul className="list-desc">
              <li className="item" onClick={() => setOpen(true)}>
                <QrcodeOutlined />
                <span className="view_qr_code">
                  {t('my_class.view_qr_code')}
                </span>
              </li>
              <li className="item">
                <ClockCircleOutlined />
                {t('my_class.start_date')}:{' '}
                <span>{moment(from_date).format('DD/MM/YYYY')}</span>
              </li>
              <li className="item">
                <ClockCircleOutlined />
                {t('my_class.end_date')}:{' '}
                <span>{moment(end_date).format('DD/MM/YYYY')}</span>
              </li>
              {auth.role == 'student' && (
                <li className="item">
                  <UserOutlined />
                  {t('my_class.teacher')}: <span>{owner}</span>
                </li>
              )}
            </ul>
          </div>
          <div className="class-item__action">
            <Button
              type="primary"
              className="primary"
              size={'large'}
              onClick={() => {
                navigate('class_detail/' + id);
              }}
            >
              {t('action.detail')}
            </Button>
          </div>
        </div>
      ) : (
        <div className="skeleton-list">
          <div className="skeleton-item">
            <Skeleton.Node active fullSize={true} />
          </div>
        </div>
      )}
      {openModal && (
        <EditClass
          title={t('my_class.edit_class')}
          type={'edit'}
          name={name}
          avatar={avatar}
          from_date={from_date}
          end_date={end_date}
          qr_code={code}
          scoreFactor={scoreFactor}
          id={id}
          setOpenModal={setOpenModal}
          handleRefetch={handleRefetch}
        />
      )}
      <Modal
        title={name}
        open={open}
        onOk={handleDowloadQRCode}
        onCancel={() => setOpen(false)}
        okText={'Tải xuống'}
        cancelText={'Đóng'}
        className="qr_code"
      >
        <QRCode
          id="qrcode"
          value={link_qr}
          size={180}
          level={'H'}
          includeMargin={true}
        />
        <Tooltip
          placement="bottom"
          title={t('action.coppy')}
          arrowPointAtCenter
        >
          <p onClick={copyLinkToClipboard} className="coppy_link">
            {link_qr}
          </p>
        </Tooltip>
      </Modal>
    </>
  );
};

export default ClassItem;
