import './Register.scss';
import { Button, Form, Input, notification, Radio } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { StudenIcon, TeacherIcon } from 'utils/drawer';
import { useState } from 'react';
import clsx from 'clsx';
import { FetchResult, useMutation } from '@apollo/client';
import { RegisterDocument, RegisterMutation } from 'gql/graphql';
import { useTranslation } from 'react-i18next';

interface IFormRegister {
  username: string;
  email: string;
  password: string;
  repassword: string;
}

function Register() {
  const [form] = Form.useForm();

  const [roleSelect, setRoleSelect] = useState<1 | 2>(1);
  const [fireRegister] = useMutation(RegisterDocument);
  const { t } = useTranslation();

  const onFinish = async ({
    username,
    email,
    password,
    ...rest
  }: IFormRegister) => {
    const { data }: FetchResult<RegisterMutation> = await fireRegister({
      variables: {
        registerInput: {
          email,
          password,
        },
      },
    });

    if (data) {
      notification.success({
        message: t('register.register_success') as string,
      });
    } else {
      notification.error({
        message: t('error.have_error'),
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleRoleSelect = (role: any) => {
    setRoleSelect(role);
  };

  return (
    <div className="register-tab">
      <div className="top-tab">
        <h2>ĐĂNG KÝ MIỄN PHÍ NGAY</h2>
        <p>Vui lòng điền các thông tin bên dưới</p>
      </div>

      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item name="role">
          <div className="role-option">
            <h4 className="role-title">Đăng ký dành cho: </h4>
            <Radio.Group className="role-select">
              <Radio value="student">
                <div
                  className={clsx('role-item', { active: roleSelect === 1 })}
                  onClick={() => handleRoleSelect(1)}
                >
                  <StudenIcon />
                  <h4>Học sinh</h4>
                </div>{' '}
              </Radio>
              <Radio value="teacher">
                {' '}
                <div
                  className={clsx('role-item', { active: roleSelect === 2 })}
                  onClick={() => handleRoleSelect(2)}
                >
                  <TeacherIcon />
                  <h4>Giáo viên</h4>
                </div>{' '}
              </Radio>
            </Radio.Group>
          </div>
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Mời bạn nhập username!' }]}
        >
          <Input
            placeholder="Nhập tên đăng nhập của bạn"
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Mời bạn nhập email!' }]}
        >
          <Input placeholder="Nhập email của bạn" prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Mời bạn nhập password!' }]}
        >
          <Input.Password
            placeholder="Nhập mật khẩu"
            prefix={<LockOutlined />}
          />
        </Form.Item>
        <Form.Item
          label="RePassword"
          name="repassword"
          rules={[{ required: true, message: 'Mời bạn nhập lại password!' }]}
        >
          <Input.Password
            placeholder="Nhập lại mật khẩu"
            prefix={<LockOutlined />}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="primary-btn">
            <p>Đăng ký</p>
          </Button>
          <div className="or">
            <p>Hoặc đăng ký bằng tài khoản</p>
          </div>
          <Button type="primary" htmlType="submit" className="submit-btn">
            <img
              className="google-icon"
              src={require('assets/images/google-icon.png')}
              alt=""
            />

            <p>Đăng nhập với Google</p>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
