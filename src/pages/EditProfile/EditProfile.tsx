import "./EditProfile.scss";
import { Button, Col, Form, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { CancelIcon, EditIcon, SaveIcon } from "utils/drawer";
import { useTranslation } from "react-i18next";

function EditProfile() {
    const [form] = Form.useForm();
    const { t } = useTranslation();

    const [avatar, setAvatar] = useState<any>();
    const [showbtnEdit, setShowBtnEdit] = useState<boolean>(false);
    const [isChangePassword, setIsChangePassword] = useState<boolean>(false);

    useEffect(() => {

        return () => {
            avatar && URL.revokeObjectURL(avatar.preview)
        }
    }, [avatar])


    const handleChangeFile = (e: any): void => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);

        setAvatar(file);
        console.log(avatar);
    }

    const handleChangeEdit = (): void => {
        setIsChangePassword(false);
        setShowBtnEdit(!showbtnEdit);
    }

    const handleShowChangePassword = (): void => {
        setShowBtnEdit(true);
        setIsChangePassword(true);
    }

    const onFinish = (values: any) => {
        console.log("Success:", values)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="edit-profile-page">
            <div className="input-profile-form">
                <div className="form-profile">
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
                        <Row justify="center">
                            <Col span={48}>
                                <Form.Item
                                    name="upload"
                                    rules={[{ required: true, message: 'Mời bạn chọn ảnh' }]}
                                >
                                    <label
                                        className="upload-avatar"
                                        htmlFor="upload"
                                    >
                                        <input
                                            type="file"
                                            accept="image/jpg, image/jpeg, image/png"
                                            id="upload"
                                            onChange={handleChangeFile}
                                        />
                                        {
                                            avatar ? (
                                                <img className="avatar-img" src={avatar.preview} alt="" />

                                            ) : (
                                                <img className="avatar-img" src={require("assets/images/avatar.png")} alt="" />

                                            )
                                        }
                                        <img className="icon-upload" src={require("assets/images/icon-upload.png")} alt="" />
                                    </label>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={48}>
                            <Col span={12} xs={24} xl={12}>
                                <Row>
                                    <Form.Item
                                        label="Họ"
                                        name="lastname"
                                        rules={[{ required: true, message: 'Mời bạn nhập họ của bạn' }]}
                                        className='input-profile'
                                    >
                                        <Row>
                                            <Input
                                                className='input-profile'
                                                placeholder="Nhập họ của bạn"
                                            />
                                        </Row>
                                    </Form.Item>
                                </Row>
                            </Col>
                            <Col span={12} xs={24} xl={12}> <Form.Item
                                className='input-profile'
                                label="Tên"
                                name="firstname"
                                rules={[{ required: true, message: 'Mời bạn nhập tên của bạn' }]}
                            >
                                <Input
                                    className='input-profile'
                                    placeholder="Nhập tên của bạn" />
                            </Form.Item></Col>
                        </Row>
                        <Row gutter={48}>
                            <Col span={12} xs={24} xl={12}>         <Form.Item
                                className='input-profile'
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Mời bạn nhập email của bạn' }]}
                            >
                                <Input
                                    className='input-profile'
                                    placeholder="Nhập email của bạn" />
                            </Form.Item></Col>
                            <Col span={12} xs={24} xl={12}> <Form.Item
                                className='input-profile'
                                label="SĐT"
                                name="phone"
                                rules={[{ required: true, message: 'Mời bạn nhập số điện thoại' }]}
                            >
                                <Input
                                    className='input-profile'
                                    placeholder="Nhập số điện thoại của bạn" />
                            </Form.Item></Col>
                        </Row>

                        <Form.Item
                            className='input-profile'
                            label="Địa chỉ"
                            name="address"

                            rules={[{ required: true, message: 'Mời bạn nhập địa chỉ của bạn' }]}
                        >
                            <Input
                                className='input-profile'
                                placeholder="Nhập địa chỉ của bạn" />
                        </Form.Item>
                        {
                            !isChangePassword ? (
                                <Form.Item
                                    label="Mật khẩu"
                                    name="firstpass"

                                    rules={[{ required: true, message: 'Mời bạn nhập mật khẩu' }]}

                                >
                                    <Input
                                        className='input-password-first' value="*******************"
                                        placeholder="Nhập mật khẩu" suffix={(<button type="button" className="btn-show" onClick={handleShowChangePassword}>Change password</button>)} />
                                </Form.Item>
                            ) : (
                                <>
                                    <Form.Item
                                        label="Mật khẩu"
                                        name="firstpassword"

                                        rules={[{ required: true, message: 'Mời bạn nhập mật khẩu' }]}

                                    >
                                        <Input.Password
                                            className='input-profile'
                                            placeholder="Nhập mật khẩu" value="*******************" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Mật khẩu Mới"
                                        name="inputpassword"

                                        rules={[{ required: true, message: 'Mời bạn nhập mật khẩu mới' }]}
                                    >
                                        <Input.Password
                                            className='input-profile'
                                            placeholder="Nhập mật khẩu" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Nhập lại mật khẩu"
                                        name="repassword"

                                        rules={[{ required: true, message: 'Mời bạn nhập lại mật khẩu' }]}
                                    >
                                        <Input.Password
                                            className='input-profile'
                                            placeholder="Nhập lại mật khẩu" />
                                    </Form.Item>
                                </>
                            )
                        }

                        <Form.Item className="submit-btn">
                            {
                                !showbtnEdit ? (
                                    <Button type="primary" htmlType="button" className="primary-btn" onClick={handleChangeEdit}>
                                        <EditIcon />
                                        <p>Chỉnh sửa profile</p>
                                    </Button>
                                ) : (
                                    <div className="edit-btn">
                                        <Button type="primary" htmlType="button" className="cancel-btn" onClick={handleChangeEdit}>
                                            <CancelIcon />
                                            <p>Hủy</p>
                                        </Button>
                                        <Button type="primary" htmlType="submit" className="primary-btn">
                                            <SaveIcon />
                                            <p>Lưu profile</p>
                                        </Button>
                                    </div>
                                )
                            }
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;