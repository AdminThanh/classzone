import { Button, Form, Input, Radio, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { t } from 'i18next';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './ModalFormColumn.scss';

const { Option } = Select;

interface ModalFromColumn {
  type: string;
}

const ModalFormColumn = (props: ModalFromColumn) => {
  const { type } = props;
  const [form] = useForm();
  const { t } = useTranslation();
  const handleFinish = (value: any) => {
    console.log(form.isFieldsTouched())
  };

  useEffect(() => {
    console.log('Re-render');
  }, []);

  return (
    <div className="ModalFormColumn">
      <Form
        onFinish={handleFinish}
        layout="vertical"
        colon={true}
        initialValues={{
          name: '',
          type: 'test',
        }}
        form={form}
      >
        <Form.Item
          name="name"
          rules={[{ required: true }]}
          label="Tên cột điểm"
        >
          <Input />
        </Form.Item>
        <Form.Item name="type" rules={[{ required: true }]} label="Radio">
          <Radio.Group>
            <Radio value="test">Điểm kiểm tra</Radio>
            <Radio value="plus">Điểm cộng</Radio>
            <Radio value="subtract">Điểm trừ</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="test" label="Tự động nhập điểm">
          <Select
            placeholder="Chọn bài kiểm tra cho cột điểm tự động"
            allowClear
          >
            <Option value="15">Bài kiểm tra 15'</Option>
            <Option value="45">Bài kiểm tra 45'</Option>
            <Option value="ielts">Bài kiểm tra IELTS</Option>
          </Select>
        </Form.Item>
        <Button htmlType="submit">{t(`table_score.${type}_action`)}</Button>
      </Form>
    </div>
  );
};

export default ModalFormColumn;
