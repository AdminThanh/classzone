import './EditProfile.scss';
import { Button, Col, Form, Input, Row } from 'antd';
import { useEffect, useState } from 'react';
import { CancelIcon, EditIcon, SaveIcon } from 'utils/drawer';
import { useTranslation } from 'react-i18next';
import BreadCrumb from 'components/BreadCrumb';
import clsx from 'clsx';



const data =
{
  lastname: 'Đào',
  firstname: 'Khôi',
  email: 'daokhoi123@gmail.com',
  phone: '0981287123123',
  address: 'hóc môn city',
  password: '12394712834983',
  img: 'assets/images/avatar.png',
}

function EditProfile() {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [avatar, setAvatar] = useState<any>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);

  const handleChangeFile = (e: any): void => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setAvatar(file);
    }
  };

  const handleChangeEdit = (): void => {
    setIsEdit(!isEdit);
  };

  const handleShowChangePassword = (): void => {
    if (isEdit) {
      setIsChangePassword(!isChangePassword);
    }
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="edit-profile-page">
      <BreadCrumb
        routes={[
          {
            name: t('bread_crumb.home'),
            path: '/',
          },
          {
            name: t('bread_crumb.edit_profile'),
            path: '/profile',
          },
        ]}
      />
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
                  <Form.Item name="upload">
                    <label className="upload-avatar" htmlFor="upload">
                      <input
                        type="file"
                        accept="image/jpg, image/jpeg, image/png"
                        id="upload"
                        onChange={handleChangeFile}
                        disabled={!isEdit}
                      />
                      {avatar ? (
                        <img
                          className="avatar-img"
                          src={avatar.preview}
                          alt=""
                        />
                      ) : (
                        <img
                          className="avatar-img"
                          src={require('assets/images/avatar.png')}
                          alt=""
                        />
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
                        { required: true, message: t('edit_profile.val_lastname') },
                      ]}
                      className="input-profile"
                    >
                      <Row>
                        <Input
                          className="input-profile"
                          placeholder={t('edit_profile.ph_lastname')}
                          disabled={!isEdit}
                          defaultValue={data.lastname}
                        />
                      </Row>
                    </Form.Item>
                  </Row>
                </Col>
                <Col span={24} xs={24} xl={11}>
                  <Form.Item
                    className="input-profile"
                    label={t('edit_profile.firstname')}
                    name="firstname"
                    rules={[
                      { required: true, message: t('edit_profile.val_firstname') },
                    ]}
                  >
                    <Input
                      className="input-profile"
                      placeholder={t('edit_profile.ph_firstname')}
                      disabled={!isEdit}
                      defaultValue={data.firstname}
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
                    rules={[{ required: true, message: t('edit_profile.val_email') }]}
                  >
                    <Input
                      disabled
                      className="input-profile"
                      placeholder={t('edit_profile.ph_email')}
                      value={data.email}
                    />
                  </Form.Item>
                </Col>
                <Col span={24} xs={24} xl={11}>
                  <Form.Item
                    className="input-profile"
                    label={t('edit_profile.phone')}
                    name="phone"
                    rules={[
                      { required: true, message: t('edit_profile.val_phone') },
                    ]}
                  >
                    <Input
                      disabled={!isEdit}
                      className="input-profile"
                      placeholder={t('edit_profile.ph_phone')}
                      value={data.phone}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                className="input-profile"
                label={t('edit_profile.address')}
                name="address"
                rules={[
                  { required: true, message: t('edit_profile.val_address') },
                ]}
              >
                <Input
                  disabled={!isEdit}
                  className="input-profile"
                  placeholder={t('edit_profile.ph_address')}
                  value={data.address}
                />
              </Form.Item>

              <Form.Item
                label={t('edit_profile.password')}
                name="firstpassword"
                rules={[
                  { required: true, message: t('edit_profile.val_password') },
                  { min: 6, message: t('edit_profile.val_countpass') },
                ]}
              >
                <Input
                  disabled={!isEdit}
                  className="input-password-first"
                  placeholder={t('edit_profile.ph_password')}
                  value={data.password}
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
                      { required: true, message: t('edit_profile.val_newpassword') },
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
                      { required: true, message: t('edit_profile.val_repassword') },
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
      </div >
    </div >
  );
}

export default EditProfile;
