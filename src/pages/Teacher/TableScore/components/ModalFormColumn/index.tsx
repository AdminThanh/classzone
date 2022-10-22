import { Button, Form, Input, InputNumber, Radio, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { AnyMxRecord } from 'dns';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ModalFormColumn.scss';

const { Option } = Select;

interface ModalFromColumn {
  type: string;
  data: any;
}

interface ISelectTest {
  value: string;
  isOpen: boolean;
  type?: 'minus' | 'plus';
}

const ModalFormColumn = (props: ModalFromColumn) => {
  const { type, data } = props;
  const [selectTest, setSelecteTest] = useState<ISelectTest>({
    value: '',
    isOpen: false,
    type: undefined,
  });
  const [form] = useForm();
  const { t } = useTranslation();

  const handleFinish = (value: any) => {
    console.log(value, form.isFieldsTouched());
  };

  useEffect(() => {
    form.setFieldsValue(data);
  }, []);

  return (
    <div className="ModalFormColumn">
      <Form
        onFinish={handleFinish}
        layout="vertical"
        colon={true}
        initialValues={{
          name: '',
          type: 'normal',
          multiplier: 1,
        }}
        form={form}
      >
        <Form.Item
          name="name"
          rules={[{ required: true }]}
          label={t('table_score.score_column_name')}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="multiplier"
          rules={[{ required: true }]}
          label={t('table_score.multiplier')}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          name="type"
          rules={[{ required: true }]}
          label={t('table_score.score_column_type')}
        >
          <Radio.Group
            onChange={(e) => {
              const type = e.target.value;
              if (type === 'minus' || type === 'plus') {
                setSelecteTest({
                  ...selectTest,
                  isOpen: true,
                  type,
                });
              } else {
                setSelecteTest({
                  value: '',
                  isOpen: false,
                  type: undefined,
                });
              }
            }}
          >
            <Radio value="normal">{t('table_score.test_score')}</Radio>
            <Radio value="plus">{t('table_score.plus_score')}</Radio>
            <Radio value="minus">{t('table_score.minus_score')}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="test" label={t('table_score.automatic_score_entry')}>
          <Select
            placeholder={t(
              'table_score.message_choose_test_for_auto_score_column'
            )}
            allowClear
          >
            <Option value="15">Bài kiểm tra 15'</Option>
            <Option value="45">Bài kiểm tra 45'</Option>
            <Option value="ielts">Bài kiểm tra IELTS</Option>
          </Select>
        </Form.Item>
        {selectTest.isOpen && (
          <Form.Item name="test" label={t('table_score.test')}>
            <Select
              placeholder={`Chọn bài kiểm tra để ${t(
                'table_score.' + selectTest.type + '_lowercase'
              )} điểm`}
              allowClear
            >
              <Option value="15">Bài kiểm tra 15'</Option>
              <Option value="45">Bài kiểm tra 45'</Option>
              <Option value="ielts">Bài kiểm tra IELTS</Option>
            </Select>
          </Form.Item>
        )}
        <Button htmlType="submit">{t(`table_score.${type}_action`)}</Button>
      </Form>
    </div>
  );
};

export default ModalFormColumn;
