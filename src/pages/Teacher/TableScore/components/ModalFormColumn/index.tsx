import { useMutation, useQuery } from '@apollo/client';
import {
  Button,
  Form,
  Input,
  InputNumber,
  notification,
  Radio,
  Select,
  Spin,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import {
  ColumnScoreType,
  CreateColumnScoreDocument,
  GetAllExamClassDocument,
  ScoreType,
  UpdateColumnScoreDocument,
} from 'gql/graphql';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ModalFormColumn.scss';

const { Option } = Select;

interface ModalFromColumn {
  type: 'add' | 'update';
  data: any;
  class_id?: string;
  listColumnScore: [ColumnScoreType];
  handleRefetchTableScore: () => void;
  onCancel: () => void;
}

interface ISelectTest {
  value: string;
  isOpen: boolean;
  type?: ScoreType.Minus | ScoreType.Plus;
}

const ModalFormColumn = (props: ModalFromColumn) => {
  const {
    type,
    data,
    class_id = '',
    listColumnScore,
    handleRefetchTableScore,
    onCancel,
  } = props;

  const [selectTest, setSelecteTest] = useState<ISelectTest>({
    value: '',
    isOpen: false,
    type: undefined,
  });

  const { data: dataExamClass } = useQuery(GetAllExamClassDocument);
  const [fireCreateColumnScore] = useMutation(CreateColumnScoreDocument);

  const [fireUpdateColumnScore] = useMutation(UpdateColumnScoreDocument);
  const [form] = useForm();
  const { t } = useTranslation();

  const handleFinish = async (value: any) => {
    try {
      notification.open({
        message: (
          <>
            <Spin /> &nbsp; Đang xoá
          </>
        ),
      });

      if (type === 'add') {
        const res = await fireCreateColumnScore({
          variables: {
            inputCreateColumnScore: {
              class_id,
              multiplier: value.multiplier,
              name: value.name,
              type: value.type,
              note: value.note,
              examOfClass_id: value.examOfClass_id,
              reference_col: value.reference_col,
            },
          },
        });

        notification.destroy();
        notification.success({
          message: 'Tạo cột điểm thành công',
        });

        if (onCancel && onCancel instanceof Function) {
          onCancel();
        }
      }

      if (type === 'update') {
        const res = await fireUpdateColumnScore({
          variables: {
            updateColumnScore: {
              multiplier: value.multiplier,
              name: value.name,
              note: value.note,
              type: value.type,
              reference_col: value.reference_col,
            },
            id: data.id,
          },
        });

        notification.destroy();
        notification.success({
          message: 'Cập nhật cột điểm thành công',
        });

        if (onCancel && onCancel instanceof Function) {
          onCancel();
        }
      }

      handleRefetchTableScore();
    } catch (err) {
      notification.destroy();
      notification.error({
        message: 'Có lỗi xảy ra',
      });
    }
  };

  useEffect(() => {
    form.setFieldsValue(data);
    setSelecteTest({
      value: data.reference_col,
      type: data.type,
      isOpen: data.type === ScoreType.Minus || data.type === ScoreType.Plus,
    });
  }, []);

  return (
    <div className="ModalFormColumn">
      <Form
        onFinish={handleFinish}
        layout="vertical"
        colon={true}
        // initialValues={{
        //   id: 'ascasaa',
        //   name: '',
        //   type: ScoreType.Normal,
        //   multiplier: 1,
        // }}
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
              if (type === ScoreType.Minus || type === ScoreType.Plus) {
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
            <Radio value={ScoreType.Normal}>
              {t('table_score.test_score')}
            </Radio>
            <Radio value={ScoreType.Plus}>{t('table_score.plus_score')}</Radio>
            <Radio value={ScoreType.Minus}>
              {t('table_score.minus_score')}
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="examOfClass_id"
          label={t('table_score.automatic_score_entry')}
        >
          <Select
            placeholder={t(
              'table_score.message_choose_test_for_auto_score_column'
            )}
            allowClear
          >
            {dataExamClass?.getAllExamClass?.map((examClass) => (
              <Option key={examClass.id} value={examClass.id}>
                {examClass.exam.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {selectTest.isOpen && (
          <Form.Item name="reference_col" label={'Tham chiếu đến cột điểm'}>
            <Select
              placeholder={`Chọn bài kiểm tra để ${t(
                'table_score.' + selectTest.type + '_lowercase'
              )} điểm`}
              allowClear
            >
              {listColumnScore?.map((test) => (
                <Option value={test.id}>{test.name}</Option>
              ))}
            </Select>
          </Form.Item>
        )}
        <Button htmlType="submit">{t(`table_score.${type}_action`)}</Button>
      </Form>
    </div>
  );
};

export default ModalFormColumn;
