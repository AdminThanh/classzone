import './EditClass.scss';
import React, { useState } from 'react';
import { DatePicker, Form, Input, InputNumber, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { CameraOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { current } from '@reduxjs/toolkit';

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
    learn_date,
    learn_date_end,
    qr_code,
    teacher,
    scoreFactor,
  } = props;
  console.log(props);

  const [open, setOpen] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { t } = useTranslation();

  const [inputImage, setInputImage] = useState(image);
  const [inputName, setInputName] = useState(name);
  const [inputLearn_date, setInputLearn_date] = useState(learn_date);
  const [inputLearn_date_end, setInputLearn_date_end] = useState(props.label);
  const [inputScoreFactor, setInputScoreFactor] = useState(scoreFactor);

  //  UPload image
  const [fileImage, setFileImage] = useState();

  const uploadVideo = (selectorFiles: any) => {
    console.log(selectorFiles[0].name);
    if (selectorFiles) {
      setFileImage(selectorFiles[0]);
    }
  };

  const handleOk = (values: any) => {
    setConfirmLoading(true);
    setTimeout(() => {
      console.log(values);
      console.log(inputImage);

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
        <div className="image_class">
          {fileImage ? (
            <img src={URL.createObjectURL(fileImage)} alt={inputName} />
          ) : (
            <img src={inputImage} alt={inputName} />
          )}
          <div className="background">
            <div className="icon_upload">
              {/* <CameraOutlined /> */}
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
        >
          <Form.Item
            name={['class_invite', 'inputName']}
            label={t('my_class.name_class')}
            rules={[{ required: true }]}
          >
            <Input
              placeholder={t('my_class.name_class')}
              defaultValue={name}
              onChange={(e) => {
                setInputName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name={['class_invite', 'inputLearn_date']}
            label={t('my_class.start_date')}
            rules={[{ required: true }]}
          >
            <Input
              placeholder={t('my_class.start_date')}
              defaultValue={learn_date}
              onChange={(e) => {
                setInputLearn_date(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name={['class_invite', 'inputLearn_date_end']}
            rules={[{ required: true }]}
            label={t('my_class.end_date')}
          >
            {/* <DatePicker placeholder={t('my_class.end_date')} defaultValue={learn_date_end} /> */}
            <Input
              placeholder={t('my_class.end_date')}
              defaultValue={props.label}
              onChange={(e) => {
                setInputLearn_date_end(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name={['class_invite', 'inputScoreFactor']}
            rules={[{ required: true }]}
            label={t('my_class.score_factor')}
          >
            <InputNumber
              placeholder={t('my_class.score_factor')}
              defaultValue={scoreFactor}
              onChange={(e) => {
                setInputScoreFactor(e.target.value);
              }}
            />
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
