import './EditClass.scss';
import React, { useState } from 'react';
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { CameraOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { current } from '@reduxjs/toolkit';
import {
  FetchResult,
  useLazyQuery,
  useMutation,
  useQuery,
} from '@apollo/client';
import {
  CreateMyClassDocument,
  CreateMyClassMutation,
  GetMyClassDocument,
  UpdateMyClassDocument,
} from 'gql/graphql';
import { IClassInfo } from 'pages/Classes';
import { useForm } from 'antd/lib/form/Form';
import moment from 'moment';
import api from 'utils/api';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const validateMessages = {
  required: 'Vui lòng nhập ${label}',
};

const EditClass = (props: any) => {
  const {
    setOpenModal,
    title,
    name,
    avatar,
    end_date,
    from_date,
    type,
    scoreFactor,
    id,
    handleRefetch,
  } = props;
  const [avatarBase64, setAvatarBase64] = useState<any>(null);
  const [open, setOpen] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [fileImage, setFileImage] = useState();

  const [form] = useForm();
  const { t } = useTranslation();

  const [fireCreateMyClass] = useMutation(CreateMyClassDocument);
  const [fireUpdateMyClass] = useMutation(UpdateMyClassDocument);

  const getBase64 = (file: File) => {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        res(reader.result);
      };
      reader.onerror = (error) => {
        rej(error);
      };
    });
  };

  const handleChangeFile = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      const base64 = await getBase64(file);
      setFileImage(file);
      setAvatarBase64(base64);
    }
  };
  const handleOk = async (value: any) => {
    setConfirmLoading(true);
    if (type === 'add') {
      try {
        await fireCreateMyClass({
          variables: {
            createMyClass: {
              name: value.name,
              scoreFactor: value.scoreFactor,
              from_date: value.from_date._d,
              end_date: value.end_date._d,
              avatar: avatarBase64 || '',
            },
          },
        });
        notification.destroy();
        notification.success({
          key: 'success',
          message: t('action.add_success'),
        });

        handleRefetch();
      } catch (error) {
        notification.error({
          key: 'error',
          message: t('action.add_error'),
        });
      } finally {
        setConfirmLoading(false);
      }
    } else if (type === 'edit') {
      try {
        await fireUpdateMyClass({
          variables: {
            UpdateMyClassInput: {
              name: value.name,
              scoreFactor: value.scoreFactor,
              from_date: value.from_date._d,
              end_date: value.end_date._d,
            },
            id: value.id,
          },
        });
        notification.success({
          key: 'success',
          message: t('action.edit_success'),
        });
        handleRefetch();
      } catch (error) {
        notification.error({
          key: 'error',
          message: t('action.edit_error'),
        });
      } finally {
        setConfirmLoading(false);
      }
    }
    setTimeout(() => {
      setOpen(false);
      setOpenModal(false);
      setConfirmLoading(false);
      handleRefetch();
    }, 1000);
  };

  const handleCancel = () => {
    setOpen(false);
    setOpenModal(false);
  };

  return (
    <Modal
      title={title}
      open={open}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="content" id="content">
        <div className="image_class">
          {fileImage ? (
            <img src={URL.createObjectURL(fileImage)} alt={name} />
          ) : (
            <img src={avatar} alt={name} />
          )}
          <div className="background">
            <div className="icon_upload">
              <input
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                id="upload"
                onChange={handleChangeFile}
                className="input_file"
              />
            </div>
          </div>
        </div>
        <Form
          name="nest-messages"
          onFinish={handleOk}
          validateMessages={validateMessages}
          className="action"
          form={form}
          initialValues={{
            id: id,
            name: name,
            from_date: from_date ? moment(new Date(from_date)) : from_date,
            end_date: end_date ? moment(new Date(end_date)) : end_date,
            scoreFactor: scoreFactor,
          }}
        >
          <Form.Item name={['id']} style={{ display: 'none' }}>
            <Input placeholder={t('my_class.name_class')} />
          </Form.Item>
          <Form.Item
            name={['name']}
            label={t('my_class.name_class')}
            rules={[{ required: true }]}
          >
            <Input placeholder={t('my_class.name_class')} />
          </Form.Item>
          <Form.Item
            name={['from_date']}
            label={t('my_class.start_date')}
            rules={[{ required: true }]}
          >
            <DatePicker
              placeholder={t('my_class.start_date')}
              format={'DD/MM/YYYY'}
            />
          </Form.Item>
          <Form.Item
            name={['end_date']}
            rules={[{ required: true }]}
            label={t('my_class.end_date')}
          >
            <DatePicker
              placeholder={t('my_class.end_date')}
              format={'DD/MM/YYYY'}
            />
          </Form.Item>
          <Form.Item
            name={['scoreFactor']}
            rules={[{ required: true }]}
            label={t('my_class.score_factor')}
          >
            <InputNumber placeholder={t('my_class.score_factor')} />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
            <Button loading={confirmLoading} type="primary" htmlType="submit">
              {title}
            </Button>
            <Button
              style={{ marginLeft: '10px' }}
              onClick={handleCancel}
              key="back"
            >
              {t('action.close')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
export default EditClass;
