import { message, Modal, Button, Form, Input, InputNumber } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const CreateGroup = (props: any) => {
  const { setShowCreateGroup } = props;
  const [loadingOK, setLoadingOK] = useState(false);
  const { t } = useTranslation();

  const handleCancel = () => {
    setShowCreateGroup(false);
  };

  const handleOk = () => {
    setLoadingOK(true);
    setTimeout(() => {
      setLoadingOK(false);
      setShowCreateGroup(false);
      message.success('Tạo thành công');
    }, 2000);
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Modal
      open={true}
      onOk={handleOk}
      onCancel={handleCancel}
      title={t('my_group.create')}
      confirmLoading={loadingOK}
    >
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['user', 'name']}
          label="Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'email']}
          label="Email"
          rules={[{ type: 'email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'age']}
          label="Age"
          rules={[{ type: 'number', min: 0, max: 99 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name={['user', 'website']} label="Website">
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'introduction']} label="Introduction">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CreateGroup;
