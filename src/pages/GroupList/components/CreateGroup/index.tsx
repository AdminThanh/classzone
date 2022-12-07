import './CreateGroup.scss';
import {
  message,
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  SelectProps,
  notification,
  Checkbox,
  Row,
  Col,
  Avatar,
  Spin,
} from 'antd';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import {
  CreateGroupDocument,
  DeleteGroupDocument,
  UpdateGroupDocument,
} from 'gql/graphql';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useForm } from 'antd/es/form/Form';
import Item from 'antd/lib/list/Item';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const validateMessages = {
  required: 'Vui lòng nhập ${label}',
};

const CreateGroup = (props: any) => {
  const {
    setShowCreateGroup,
    dataListStudent,
    handleRefetchGoup,
    classId,
    groupDetailInfo,
  } = props;
  const [loadingOK, setLoadingOK] = useState(false);
  const { t } = useTranslation();
  const [fireCreateGroup] = useMutation(CreateGroupDocument);
  const [fireUpdateGroup, data] = useMutation(UpdateGroupDocument);
  const [form] = useForm();

  const [fireDeleteGroup] = useMutation(DeleteGroupDocument);

  if (groupDetailInfo) {
    const membersId = groupDetailInfo.members.map((item: any) => item.id);
    form.setFieldsValue({
      name: groupDetailInfo.name,
      members: membersId,
    });
  }

  const handleCancel = () => {
    setShowCreateGroup(false);
  };

  const handleDeleteGroup = async (id: string) => {
    notification.open({
      message: (
        <>
          <Spin /> &nbsp; Đang xoá
        </>
      ),
    });
    try {
      await fireDeleteGroup({
        variables: {
          id,
        },
      });
      setTimeout(() => {
        notification.destroy();
        notification.success({
          message: t('action.delete_success'),
        });
        handleCancel();
        handleRefetchGoup();
      }, 1500);
    } catch (err) {
      notification.destroy();
      notification.error({
        message: t('action.delete_error'),
      });
    }
  };

  const onFinish = async (values: any) => {
    if (groupDetailInfo) {
      console.log(groupDetailInfo.id);
      try {
        await fireUpdateGroup({
          variables: {
            updateGroupInput: {
              classRoom: classId,
              students: values.members,
              name: values.name,
            },
            id: groupDetailInfo.id,
          },
        });
        setLoadingOK(true);
        setTimeout(() => {
          setLoadingOK(false);
          setShowCreateGroup(false);
          handleRefetchGoup();
          message.success(t('action.edit_success') as string);
        }, 2000);
      } catch (error) {
        message.success(t('action.edit_error') as string);
      }
    } else {
      try {
        await fireCreateGroup({
          variables: {
            createGroupInput: {
              classRoom: classId,
              students: values.members,
              name: values.name,
            },
          },
        });
        setLoadingOK(true);
        setTimeout(() => {
          setLoadingOK(false);
          setShowCreateGroup(false);
          handleRefetchGoup();
          message.success(t('action.create_success') as string);
        }, 2000);
      } catch (error) {
        message.success(t('action.create_error') as string);
      }
    }
  };

  return (
    <Modal
      open={true}
      onCancel={handleCancel}
      title={t('my_group.create')}
      footer={null}
      className="create_group"
      width={1000}
    >
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        form={form}
      >
        <Form.Item
          name={'name'}
          label={t('my_group.name_group')}
          rules={[{ required: true }]}
        >
          <Input placeholder={t('my_group.name_group')} />
        </Form.Item>

        <Form.Item
          name={'members'}
          label={t('my_group.members')}
          rules={[{ required: true }]}
        >
          <Checkbox.Group style={{ width: '100%' }}>
            <Row className="groups_list" gutter={[20, 20]}>
              {dataListStudent.map((item: any) => (
                <Col
                  key={item.id}
                  className="StudentGroup StudentGroup_Item"
                  xs={6}
                  sm={6}
                  md={4}
                  lg={4}
                  xl={4}
                  xxl={4}
                >
                  <Checkbox value={item.id}>
                    <div className="student-item">
                      <Avatar src={item.avatar}>
                        {item.firstName?.charAt(0).toUpperCase()}
                      </Avatar>
                      <div className="name">
                        <a>{item.firstName + ' ' + item.lastName}</a>
                      </div>
                    </div>
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
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
          {groupDetailInfo && (
            <Button
              style={{ float: 'right' }}
              onClick={() => handleDeleteGroup(groupDetailInfo.id)}
              key="back"
            >
              {t('action.delete')}
            </Button>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CreateGroup;
