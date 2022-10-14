import './InviteStudents.scss';
import copy from 'copy-to-clipboard';
import { Input, message, Modal, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
const { Option } = Select;

const InviteStudents = (props: any) => {
  const { setShowInviteStudents } = props;
  const [loadingOK, setLoadingOK] = useState(false);
  const [emailInvite, setEmailInvite] = useState('');

  const { t } = useTranslation();
  const link = 'https://www.figma.com/file/ZD6Kk4DPwMSHkiuAau0HuG';

  const copyToClipboard = () => {
    if (copy(link)) {
      message.success('Sao chép thành công!');
    } else {
      message.error('Sao chép thất bại!');
    }
  };

  const handleCancel = () => {
    setShowInviteStudents(false);
  };

  const handleOk = () => {
    setLoadingOK(true);
    setTimeout(() => {
      setLoadingOK(false);
      setShowInviteStudents(false);
      console.log(emailInvite);
      message.success("Mời thành công");
    }, 2000);
  };

  return (
    <Modal
      open={true}
      onOk={handleOk}
      onCancel={handleCancel}
      title={t('my_class.invite_member')}
      confirmLoading={loadingOK}
    >
      <div className="student">
        <div className="student-box">
          <label htmlFor="" className="student-link">
            {t('my_class.class_link')}
          </label>
          <div className="student-form">
            <Input defaultValue={link} />
            <div className="coppy btn ouline" onClick={copyToClipboard}>
              {t('action.coppy')}
            </div>
          </div>
        </div>
        <div className="student-box border-top">
          <label htmlFor="" className="student-link">
            {t('field.email_address')}
          </label>
          <div className="student-form">
            <Select
              mode="tags"
              style={{ width: '100%' }}
              onChange={(value) => {
                setEmailInvite(value);
              }}
              tokenSeparators={[',']}
              placeholder={t('field.email_address')}
            ></Select>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default InviteStudents;
