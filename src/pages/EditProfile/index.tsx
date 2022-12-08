import { LoadingOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  notification,
  Row,
  Spin,
} from 'antd';
import clsx from 'clsx';
import BreadCrumb from 'components/BreadCrumb';
import { useAuth } from 'contexts/AuthContext';
import { UpdateprofileDocument } from 'gql/graphql';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CancelIcon, EditIcon, SaveIcon } from 'utils/drawer';
import './EditProfile.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function EditProfile() {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { auth } = useAuth();
  const [fireUpdateProfile] = useMutation(UpdateprofileDocument);

  const [avatar, setAvatar] = useState<any>(null);
  const [avatarBase64, setAvatarBase64] = useState<any>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);

  const handleChangeFile = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      const base64 = await getBase64(file);
      setAvatar(file);
      setAvatarBase64(base64);
    }
  };

  const getBase64 = (file: File) => {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        res(reader.result);
        setAvatarBase64(reader.result);
      };

      reader.onerror = (error) => {
        rej(error);
      };
    });
  };

  const handleChangeEdit = (): void => {
    setIsEdit(!isEdit);
  };

  const handleShowChangePassword = (): void => {
    if (isEdit) {
      setIsChangePassword(!isChangePassword);
    }
  };

  const onFinish = async (values: any) => {
    console.log('Success:', values);

    notification.open({
      key: 'spin',
      message: (
        <>
          <Spin indicator={antIcon} /> &nbsp; Đang cập nhật
        </>
      ),
    });

    try {
      const res = await fireUpdateProfile({
        variables: {
          updateProfileInput: {
            firstName: values.firstname,
            lastName: values.lastname,
            address: values.address,
            phoneNumber: values.phone,
            oldPassword: values.firstpassword,
            newPassword: values.inputpassword,
            avatar: avatarBase64,
          },
        },
      });
      notification.destroy();
      notification.success({
        key: 'success',
        message: 'Cập nhật thành công!',
      });
    } catch (error) {
      notification.destroy();

      notification.error({
        key: 'error',
        message: (
          <div>
            <p>Cập nhật thất bại!</p>
          </div>
        ),
      });
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="edit-profile-page">
      <BreadCrumb
        routes={[
          {
            name: t('bread_crumb.edit_profile'),
            path: '/profile',
          },
        ]}
      />
      {auth && (
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
            <div className="input-skin">
              <div className="input-content">
                <Row justify="center">
                  <Col span={48}>
                    <Form.Item name="avatar">
                      <label className="upload-avatar" htmlFor="upload">
                        <input
                          type="file"
                          accept="image/jpg, image/jpeg, image/png"
                          id="upload"
                          onChange={handleChangeFile}
                          disabled={!isEdit}
                        />

                        {auth.avatar || avatar?.preview ? (
                          <img
                            className="navbar__avatar"
                            src={avatar?.preview || auth?.avatar}
                          />
                        ) : (
                          <Avatar className="navbar__avatar">
                            {auth.firstName.charAt(0).toUpperCase()}
                          </Avatar>
                        )}

                        <img
                          className="icon-upload"
                          src={require('assets/images/icon-upload.png')}
                          alt=""
                        />
                      </label>
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col span={24} xs={24} xl={11}>
                    <Row>
                      <Form.Item
                        label={t('edit_profile.lastname')}
                        name="lastname"
                        rules={[
                          {
                            required: true,
                            message: t('edit_profile.val_lastname'),
                          },
                        ]}
                        className="input-profile"
                        initialValue={auth?.lastName}
                      >
                        <Input
                          className="input-profile"
                          placeholder={t('edit_profile.ph_lastname')}
                          disabled={!isEdit}
                        />
                      </Form.Item>
                    </Row>
                  </Col>
                  <Col span={24} xs={24} xl={11}>
                    <Form.Item
                      className="input-profile"
                      label={t('edit_profile.firstname')}
                      name="firstname"
                      rules={[
                        {
                          required: true,
                          message: t('edit_profile.val_firstname'),
                        },
                      ]}
                      initialValue={auth?.firstName}
                    >
                      <Input
                        className="input-profile"
                        placeholder={t('edit_profile.ph_firstname')}
                        disabled={!isEdit}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col span={24} xs={24} xl={11}>
                    <Form.Item
                      className="input-profile"
                      label="Email"
                      name="email"
                      // rules={[{ required: true, message: t('edit_profile.val_email') }]}
                      initialValue={auth?.email}
                    >
                      <Input
                        disabled
                        className="input-profile"
                        placeholder={t('edit_profile.ph_email')}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} xs={24} xl={11}>
                    <Form.Item
                      className="input-profile"
                      label={t('edit_profile.phone')}
                      name="phone"
                      initialValue={auth?.phoneNumber}
                    >
                      <InputNumber
                        disabled={!isEdit}
                        className="input-profile"
                        placeholder={t('edit_profile.ph_phone')}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  className="input-profile"
                  label={t('edit_profile.address')}
                  name="address"
                  // rules={[
                  //   { required: true, message: t('edit_profile.val_address') },
                  // ]}
                  initialValue={auth.address}
                >
                  <Input
                    disabled={!isEdit}
                    className="input-profile"
                    placeholder={t('edit_profile.ph_address')}
                  />
                </Form.Item>

                <Form.Item
                  label={t('edit_profile.password')}
                  name="firstpassword"
                  rules={[
                    // { required: true, message: t('edit_profile.val_password') },
                    { min: 6, message: t('edit_profile.val_countpass') },
                  ]}
                >
                  <Input
                    disabled={!isEdit}
                    className="input-password-first"
                    placeholder={t('edit_profile.ph_password')}
                    type="password"
                    suffix={
                      <button
                        type="button"
                        className="btn-show"
                        onClick={handleShowChangePassword}
                      >
                        {t('edit_profile.btn_change')}
                      </button>
                    }
                  />
                </Form.Item>

                {isEdit && isChangePassword && (
                  <div
                    className={clsx('show-repassword', {
                      show: isChangePassword === true,
                    })}
                  >
                    <Form.Item
                      label={t('edit_profile.newpassword')}
                      name="inputpassword"
                      rules={[
                        {
                          required: true,
                          message: t('edit_profile.val_newpassword'),
                        },
                        { min: 6, message: t('edit_profile.val_countpass') },
                      ]}
                    >
                      <Input.Password
                        className="input-profile"
                        placeholder={t('edit_profile.ph_newpassword')}
                      />
                    </Form.Item>
                    <Form.Item
                      label={t('edit_profile.repassword')}
                      name="repassword"
                      rules={[
                        {
                          required: true,
                          message: t('edit_profile.val_repassword'),
                        },
                        { min: 6, message: t('edit_profile.val_countpass') },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue('inputpassword') === value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(t('edit_profile.val_samepass'))
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        className="input-profile"
                        placeholder={t('edit_profile.ph_repassword')}
                      />
                    </Form.Item>
                  </div>
                )}
              </div>
            </div>

            <Form.Item className="submit-btn">
              {!isEdit ? (
                <Button
                  type="primary"
                  htmlType="button"
                  className="primary-btn"
                  onClick={handleChangeEdit}
                >
                  <EditIcon />
                  <p>{t('edit_profile.btn_edit')}</p>
                </Button>
              ) : (
                <div className="edit-btn">
                  <Button
                    type="primary"
                    htmlType="button"
                    className="cancel-btn"
                    onClick={handleChangeEdit}
                  >
                    <CancelIcon />
                    <p>{t('edit_profile.btn_cancel')}</p>
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="primary-btn"
                  >
                    <SaveIcon />
                    <p>{t('edit_profile.btn_save')}</p>
                  </Button>
                </div>
              )}
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
