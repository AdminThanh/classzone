import './EditClass.scss';
import React, { useState } from 'react';
import { DatePicker, Form, Input, InputNumber, Modal } from 'antd';
import { CameraOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { current } from '@reduxjs/toolkit';

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

  const [open, setOpen] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [inputName, setInputName] = useState(name);
  const [inputImage, setInputImage] = useState(image);
  const [inputLearn_date, setInputLearn_date] = useState(learn_date);
  const [inputLearn_date_end, setInputLearn_date_end] = useState(props.label);
  const [inputScoreFactor, setInputScoreFactor] = useState(scoreFactor);

  //  UPload image
  const [fileImage, setFileImage] = useState();

  const uploadVideo = (selectorFiles: any) => {
    if (selectorFiles) {
      setFileImage(selectorFiles[0]);
    }
  };

  const handleOk = () => {
    // Lấy data khi submit form
    const dataForm = {
      name: inputName,
      image: inputImage,
      learn_date: inputLearn_date,
      learn_date_end: inputLearn_date_end,
      scoreFactor: inputScoreFactor,
    };
    console.log(dataForm);

    setConfirmLoading(true);
    setTimeout(() => {
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
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
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
        <form action="" className="action">
          <Form.Item label="Tên lớp">
            <Input
              placeholder="Nhập tên lớp"
              value={inputName}
              onChange={(e) => {
                setInputName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Ngày bắt đầu">
            {/* <DatePicker placeholder="Ngày bắt đầu học" value={learn_date} /> */}
            <Input
              placeholder="Ngày bắt đầu học"
              value={inputLearn_date}
              onChange={(e) => {
                setInputLearn_date(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Ngày kết thúc">
            {/* <DatePicker placeholder="Ngày kết thúc" value={learn_date_end} /> */}
            <Input
              placeholder="Ngày kết thúc"
              value={inputLearn_date_end}
              onChange={(e) => {
                setInputLearn_date_end(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Hệ số điểm">
            <InputNumber
              placeholder="Nhập hệ số điểm lớp học"
              value={inputScoreFactor}
              onChange={(e) => {
                setInputScoreFactor(e.target.value);
              }}
            />
          </Form.Item>
        </form>
      </div>
    </Modal>
  );
};
export default EditClass;
