import "./Login.scss";
import { Button, Form, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import Register from "pages/Register/Register";


function Login() {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login-page">
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
                    autoComplete="off"
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
                        <Input.Password placeholder="Nhập mật khẩu" prefix={<LockOutlined />} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="primary-btn">
                            <p>Đăng Nhập</p>
                        </Button>
                        <div className="or"><p>Hoặc đăng ký bằng tài khoản</p></div>
                        <Button type="primary" htmlType="submit" className="submit-btn">
                            <img className="google-icon" src={require("assets/images/google-icon.png")} alt="" />
                            <p>Đăng nhập với Google</p>
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <img className="bg-right" src={require("assets/images/background/right-bg.png")} alt="" />
        </div>
    );
}

export default Login;