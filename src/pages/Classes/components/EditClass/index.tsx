import './EditClass.scss';
import React, { useState } from 'react';
import { DatePicker, Form, Input, InputNumber, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { CameraOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { current } from '@reduxjs/toolkit';
import { FetchResult, useLazyQuery, useMutation } from '@apollo/client';
import { CreateMyClassDocument, CreateMyClassMutation } from 'gql/graphql';
import { IClassInfo } from 'pages/Classes';
import { useForm } from 'antd/lib/form/Form';
import moment from 'moment';
import { read } from 'fs';

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
    image,
    end_date,
    from_date,
    type,
    scoreFactor,
    _id,
  } = props;
  console.log(props);

  const [form] = useForm();

  const [open, setOpen] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { t } = useTranslation();

  const [inputImage, setInputImage] = useState(image);

  const [fireCreateMyClass] = useMutation(CreateMyClassDocument);

  //  UPload image
  const [fileImage, setFileImage] = useState();

  const uploadVideo = (selectorFiles: any) => {
    console.log(selectorFiles[0].name);
    if (selectorFiles) {
      setFileImage(selectorFiles[0]);
    }
   
  };

  const handleOk = async (value: any) => {
    setConfirmLoading(true);
    

    if (type === 'add') {
      await fireCreateMyClass({
        variables: {
          createMyClass: {
            name: value.inputName,
            scoreFactor: value.inputScoreFactor,
            from_date: value.from_date._d,
            end_date: value.end_date._d,
            avatar:
              'https://cdn.dribbble.com/userupload/3281431/file/original-48283bb3f53b1e0597cd612334785e66.png',
          },
        },
      });
    } else if (type === 'edit') {
      console.log(value);

      // await fireCreateMyClass({
      //   variables: {
      //     createMyClass: {
      //       name: value.inputName,
      //       scoreFactor: value.inputScoreFactor,
      //       from_date: new Date(),
      //       end_date: new Date(),
      //       banner: 'banner 123',
      //     },
      //   },
      // });
    }

    setTimeout(() => {
      
      console.log(value);
      console.log('inputImage', inputImage);

      setOpen(false);
      setOpenModal(false);
      setConfirmLoading(false);
    }, 2000);
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
        <button onClick={() => console.log(form.getFieldsValue())}>Log</button>
        <div className="image_class">
          {fileImage ? (
            <img src={URL.createObjectURL(fileImage)} alt={name} />
          ) : (
            <img src={inputImage} alt={name} />
          )}
          <div className="background">
            <div className="icon_upload">
              <input
                type="file"
                className="input_file"
                onChange={(e) => uploadVideo(e.target.files)}
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
            id: _id,
            name: name,
            from_date: from_date ? moment(new Date(from_date)) : from_date,
            end_date: end_date ? moment(new Date(end_date)) : end_date,
            scoreFactor: scoreFactor,
          }}
        >
          <Form.Item name={['id']}>
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
