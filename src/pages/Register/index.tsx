import './Register.scss';
import { Button, Form, Input, notification, Radio } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { StudenIcon, TeacherIcon } from 'utils/drawer';
import { useState } from 'react';
import clsx from 'clsx';
import { FetchResult, useMutation } from '@apollo/client';
import { RegisterDocument, RegisterMutation } from 'gql/graphql';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface IFormRegister {
  username: string;
  email: string;
  password: string;
  repassword: string;
}

function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [roleSelect, setRoleSelect] = useState<1 | 2>(1);
  const [fireRegister] = useMutation(RegisterDocument);
  const { t } = useTranslation();

  const onFinish = async ({
    username,
    email,
    password,
    ...rest
  }: IFormRegister) => {
    const roleEnum = {
      1: 'STUDENT',
      2: 'TEACHER',
    };
    const { data }: FetchResult<RegisterMutation> = await fireRegister({
      variables: {
        registerInput: {
          username,
          email,
          password,
          role: roleEnum[roleSelect || 1] as any,
        },
      },
    });

    if (data) {
      notification.success({
        message: t('register.register_success') as string,
      });

      navigate('/login');
    } else {
      notification.error({
        message: t('auth.register_error'),
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
                </div>
              </Radio>
              <Radio value="teacher">
                <div
                  className={clsx('role-item', { active: roleSelect === 2 })}
                  onClick={() => handleRoleSelect(2)}
                >
                  <TeacherIcon />
                  <h4>Giáo viên</h4>
                </div>
              </Radio>
            </Radio.Group>
          </div>
        </Form.Item>
        <Form.Item
          label="Họ và tên"
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
          label="Mật khẩu"
          name="password"
          rules={[
            { required: true, message: t('edit_profile.val_password') },
            { min: 6, message: t('edit_profile.val_countpass') },
          ]}
        >
          <Input.Password
            placeholder="Nhập mật khẩu"
            prefix={<LockOutlined />}
          />
        </Form.Item>
        <Form.Item
          label="Nhập lại mật khẩu"
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
          {/* <div className="or">
            <p>Hoặc đăng ký bằng tài khoản</p>
          </div> */}
          {/* <Button type="primary" htmlType="submit" className="submit-btn">
            <img
              className="google-icon"
              src={require('assets/images/google-icon.png')}
              alt=""
            />

            <p>Đăng nhập với Google</p>
          </Button> */}
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
