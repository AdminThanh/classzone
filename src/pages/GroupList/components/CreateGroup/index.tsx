import { message, Modal, Button, Form, Input, InputNumber, Select } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const validateMessages = {
  required: 'Vui lòng nhập ${label}',
};

const CreateGroup = (props: any) => {
  const { setShowCreateGroup } = props;
  const [loadingOK, setLoadingOK] = useState(false);
  const { t } = useTranslation();

  const handleCancel = () => {
    setShowCreateGroup(false);
  };

  const onFinish = (values: any) => {
    console.log(values);
    setLoadingOK(true);
    setTimeout(() => {
      setLoadingOK(false);
      setShowCreateGroup(false);
      message.success(t('action.create_success') as string);
    }, 2000);
  };

  return (
    <Modal
      open={true}
      onCancel={handleCancel}
      title={t('my_group.create')}
      footer={null}
    >
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['group', 'name']}
          label={t('my_group.name_group')}
          rules={[{ required: true }]}
        >
          <Input placeholder={t('my_group.name_group')} />
        </Form.Item>

        <Form.Item
          name={['group', 'members']}
          label={t('my_group.members')}
          rules={[{ required: true }]}
        >
          <Select
            mode="tags"
            style={{ width: '100%' }}
            tokenSeparators={[',']}
            placeholder={t('my_group.members')}
          ></Select>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
          <Button loading={loadingOK} type="primary" htmlType="submit">
            {t('my_group.create')}
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
    </Modal>
  );
};
export default CreateGroup;
