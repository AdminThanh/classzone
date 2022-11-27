import './InviteStudents.scss';
import copy from 'copy-to-clipboard';
import { Button, Input, message, Modal, Select, Form, SelectProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { GetAllUsersDocument } from 'gql/graphql';
import { useQuery } from '@apollo/client';
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
  const { t } = useTranslation();
  const link = 'https://www.figma.com/file/ZD6Kk4DPwMSHkiuAau0HuG';



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

  const options: SelectProps['options'] = [];
  
  const { data } = useQuery(GetAllUsersDocument);
  console.log(data);

  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
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
                  placeholder={t('field.email_address')}
                  onChange={handleChange}
                  options={options}
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
