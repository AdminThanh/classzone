import "./Register.scss";
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { StudenIcon, TeacherIcon } from "utils/drawer";
import { useState } from "react";
import clsx from "clsx";

function Register() {
    const [form] = Form.useForm();

    const [roleSelect, setRoleSelect] = useState<1 | 2>(1);

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const handleRoleSelect = (role: any) => {
        setRoleSelect(role);
    }

    return (
        <div className="register-tab">
            <div className="top-tab">
                <h2>ĐĂNG KÝ MIỄN PHÍ NGAY</h2>
                <p>Vui lòng điền các thông tin bên dưới</p>
            </div>
            <div className="role-option">
                <h4 className="role-title">Đăng ký dành cho: </h4>
                <div className="role-select">
                    <div className={clsx("role-item", { active: roleSelect === 1 })} onClick={() => handleRoleSelect(1)}>
                        <StudenIcon />
                        <h4>Học sinh</h4>
                    </div>
                    <div className={clsx("role-item", { active: roleSelect === 2 })} onClick={() => handleRoleSelect(2)}>
                        <TeacherIcon />
                        <h4>Giáo viên</h4>
                    </div>
                </div>
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
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Mời bạn nhập username!' }]}
                >
                    <Input placeholder="Nhập tên đăng nhập của bạn" prefix={<UserOutlined />} />
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
                    <Input.Password placeholder="Nhập mật khẩu" prefix={<LockOutlined />} />
                </Form.Item>
                <Form.Item
                    label="RePassword"
                    name="repassword"
                    rules={[{ required: true, message: 'Mời bạn nhập lại password!' }]}
                >
                    <Input.Password placeholder="Nhập lại mật khẩu" prefix={<LockOutlined />} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="primary-btn">
                        <p>Đăng ký</p>
                    </Button>
                    <div className="or"><p>Hoặc đăng ký bằng tài khoản</p></div>
                    <Button type="primary" htmlType="submit" className="submit-btn">
                        <img className="google-icon" src={require("assets/images/google-icon.png")} alt="" />

                        <p>Đăng nhập với Google</p>
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Register;