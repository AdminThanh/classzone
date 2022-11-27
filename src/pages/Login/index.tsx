import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification, Spin } from 'antd';
import { useAuth } from 'contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import JWTManager from 'utils/jwt';
import './Login.scss';

export interface ILoginForm {
  email: string;
  password: string;
}

function Login() {
  const { setIsAuthenticated, login } = useAuth();
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onFinish = async ({ email, password }: ILoginForm) => {
    notification.open({
      message: (
        <span>
          <Spin /> Đang đăng nhập.....
        </span>
      ),
    });

    try {
      const { data } = await login({
        email,
        password,
      });

      notification.destroy();

      if (data?.login) {
        JWTManager.setToken(data.login.accessToken as string);
        JWTManager.setIsHaveRefreshToken(true);
        setIsAuthenticated(true);

        notification.success({
          message: t('auth.login_success') as string,
        });

        setTimeout(() => {
          navigate('/');
        }, 500);
      } else {
        JWTManager.setIsHaveRefreshToken(false);
        notification.error({
          message: t('error.have_error'),
        });
      }
    } catch (err) {
      notification.destroy();
      notification.error({
        message: t('error.have_error'),
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-tab">
      <div className="top-tab">
        <h2>CHÀO MỪNG BẠN QUAY TRỞ LẠI</h2>
        <p>Đăng nhập để trải nghiệm ngay</p>
      </div>
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        form={form}
      >
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

        <Form.Item>
          <Button type="primary" htmlType="submit" className="primary-btn">
            <p>Đăng Nhập</p>
          </Button>
          {/* <div className="or">
            <p>Hoặc đăng ký bằng tài khoản</p>
          </div>
          <Button type="primary" htmlType="submit" className="submit-btn">
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

export default Login;
