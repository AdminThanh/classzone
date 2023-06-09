import './InviteStudents.scss';
import copy from 'copy-to-clipboard';
import { Button, Input, message, Modal, Select, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
const { Option } = Select;

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const validateMessages = {
  required: 'Vui lòng nhập ${label}',
};

const InviteStudents = (props: any) => {
  const { setShowInviteStudents } = props;
  const [loadingOK, setLoadingOK] = useState(false);

  let { classId } = useParams();
  const { t } = useTranslation();
  const link = window.location.origin + '/join_class/' + classId;

  const copyToClipboard = () => {
    if (copy(link)) {
      message.success(t('action.coppy_success') as string);
    } else {
      message.error(t('action.coppy_error') as string);
    }
  };

  const handleCancel = () => {
    setShowInviteStudents(false);
  };

  const handleOk = (values: any) => {
    setLoadingOK(true);
    setTimeout(() => {
      setLoadingOK(false);
      setShowInviteStudents(false);
      console.log(values);
      message.success(t('action.invite_success') as string);
    }, 2000);
  };

  return (
    <Modal
      open={true}
      onOk={handleOk}
      onCancel={handleCancel}
      title={t('my_class.add_member')}
      confirmLoading={loadingOK}
      footer={null}
    >
      <div className="student">
        <div className="student-box">
          <label htmlFor="" className="student-link">
            {t('my_class.class_link')}
          </label>
          <div className="student-form">
            <Input defaultValue={link} />
            <div className="coppy ouline" onClick={copyToClipboard}>
              {t('action.coppy')}
            </div>
          </div>
        </div>
        <div className="student-box border-top">
          <Form
            {...layout}
            name="nest-messages"
            onFinish={handleOk}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={['class_invite', 'emailInvite']}
              label={t('field.email_address')}
              rules={[{ required: true }]}
            >
              <div className="student-form">
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  tokenSeparators={[',']}
                  placeholder={t('field.email_address')}
                ></Select>
              </div>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
              <Button loading={loadingOK} type="primary" htmlType="submit">
                {t('my_class.add_member')}
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
      </div>
    </Modal>
  );
};
export default InviteStudents;
